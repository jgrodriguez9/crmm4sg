import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import {
	ERROR_SERVER,
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import DatePicker from '../../../../Common/DatePicker';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useMutation, useQuery } from 'react-query';
import { getHotelAll } from '../../../../../helpers/catalogues/hotel';
import { getMealPlanAll } from '../../../../../helpers/catalogues/meal_plan';
import moment from 'moment';
import DisabledInput from '../../../../Controller/DisabledInput';
import diffDates from '../../../../../util/diffDates';
import { updateReservationService } from '../../../../../services/reservation';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { getHotelUnitByHotelPaginate } from '../../../../../helpers/catalogues/hotel_unit';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import { useTranslation } from 'react-i18next';
import { hookedOpt } from '../../../../constants/hooked';

const FormReservationEdit = ({
	reservation = null,
	toggleDialog,
	editClient,
	refetchReservation,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formReservationEdit',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	const [initialDate, setInitialDate] = useState(
		reservation?.initialDate
			? moment(reservation?.initialDate, 'YYYY-MM-DD').toDate()
			: null
	);
	const [finalDate, setFinalDate] = useState(
		reservation?.finalDate
			? moment(reservation?.finalDate, 'YYYY-MM-DD').toDate()
			: null
	);
	//getHotel
	const { data: hotelOpt } = useQuery(['getHotelAll'], () => getHotelAll(), {
		select: (data) =>
			data.data?.list.map((item) => ({
				value: item.id,
				label: item.name,
			})) ?? [],
	});
	//getMealPlan
	const { data: mealPlanOpt } = useQuery(
		['getMealPlanAll'],
		() => getMealPlanAll(),
		{
			select: (data) =>
				data.data?.list.map((item) => ({
					value: item.id,
					label: item.plan,
				})) ?? [],
		}
	);

	//update reservation
	const { mutate: updateItem, isLoading: isUpdating } = useMutation(
		updateReservationService,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(UPDATE_SUCCESS),
					})
				);
				refetchReservation();
			},
			onError: (error) => {
				let message = tMessage(ERROR_SERVER);
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						type: 'error',
						message: message,
					})
				);
			},
		}
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: reservation?.id ?? '',
			dateRequest:
				reservation?.dateRequest ?? moment().format('YYYY-MM-DD'),
			dateChange: reservation?.dateChange ?? '',
			adult: reservation?.adult ?? '',
			child: reservation?.adult ?? '',
			infant: reservation?.infant ?? '',
			booking: reservation?.booking ?? '',
			confirm3: reservation?.confirm3 ?? '',
			hotel: reservation?.hotel ?? { id: '' },
			initialDate: reservation?.initialDate ?? '',
			finalDate: reservation?.finalDate ?? '',
			intPlan: reservation?.intPlan?.id ?? '',
			maritalStatus: reservation?.maritalStatus ?? '',
			income: reservation?.income ?? '',
			cards: reservation?.cards ?? '',
			visa: reservation?.visa ?? 0,
			mc: reservation?.mc ?? 0,
			amex: reservation?.amex ?? 0,
			other: reservation?.other ?? 0,
			callCenter: reservation?.callcenter ?? { id: '' },
			segment: reservation?.segment ?? { id: '' },
			program: reservation?.program ?? { id: '' },
			hooked: reservation?.hooked ?? '',
			status: reservation?.status ?? { id: '' },
			customer: reservation?.customer ?? { id: '' },
			hotelUnit: reservation?.hotelUnit ?? '',
			unit: reservation?.unit ?? '',
		},
		validationSchema: Yup.object({
			dateRequest: Yup.string().required(tMessage(FIELD_REQUIRED)),
			intPlan: Yup.string().required(tMessage(FIELD_REQUIRED)),
			adult: Yup.number()
				.min(0, tMessage(FIELD_POSITIVE))
				.integer(tMessage(FIELD_INTEGER))
				.typeError(tMessage(FIELD_NUMERIC))
				.required(tMessage(FIELD_REQUIRED)),
			child: Yup.number()
				.min(0, tMessage(FIELD_POSITIVE))
				.integer(tMessage(FIELD_INTEGER))
				.typeError(tMessage(FIELD_NUMERIC))
				.required(tMessage(FIELD_REQUIRED)),
			cards: Yup.string().required(tMessage(FIELD_REQUIRED)),
			callCenter: Yup.object().shape({
				id: Yup.string().required(tMessage(FIELD_REQUIRED)),
			}),
			status: Yup.object().shape({
				id: Yup.string().required(tMessage(FIELD_REQUIRED)),
			}),
			customer: Yup.object().shape({
				id: Yup.string().required(tMessage(FIELD_REQUIRED)),
			}),
			hotelUnit: Yup.string().required(tMessage(FIELD_REQUIRED)),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'initialDate') {
					data[key] = moment(values.initialDate).format('YYYY-MM-DD');
				} else if (key === 'finalDate') {
					data[key] = moment(values.finalDate).format('YYYY-MM-DD');
				}
				data[key] = value;
			});
			// data['quantity'] = parseInt(values.pax) + parseInt(values.childs);
			updateItem({
				id: values.id,
				body: data,
			});
		},
	});
	// console.log(formik.values);
	//getHotelUNitAndUnit
	const { data: hotelUnitOpt } = useQuery(
		['getHotelUnitByHotelPaginate', formik.values.hotel.id],
		() =>
			getHotelUnitByHotelPaginate(
				`?page=1&max=1000&hotel=${formik.values.hotel.id}`
			),
		{
			select: (data) =>
				data.data?.list.map((item) => ({
					value: item.hotelUnit,
					label: item.hotelUnit,
					unit: item.unit,
				})) ?? [],
			enabled: formik.values.hotel.id !== '',
		}
	);
	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<h5 className="text-primary">{t('reservationDetail')}</h5>
			<hr />
			<Row>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotel">
							{t('hotel')}
						</Label>
						<Select
							id="hotel"
							className="mb-0"
							value={
								formik.values.hotel?.id
									? {
											value: formik.values.hotel.id,
											label:
												hotelOpt?.find(
													(it) =>
														it.value ===
														formik.values.hotel.id
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'hotel.id',
									value?.value ?? ''
								);
							}}
							options={hotelOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotelUnit">
							{t('hotelUnit')}
						</Label>
						<Select
							id="hotelUnit"
							className="mb-0"
							value={
								formik.values.hotelUnit
									? {
											value: formik.values.hotelUnit,
											label:
												hotelUnitOpt?.find(
													(it) =>
														it.value ===
														formik.values.hotelUnit
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'hotelUnit',
									value?.value ?? ''
								);
								formik.setFieldValue('unit', value?.unit ?? '');
							}}
							options={hotelUnitOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.hotelUnit && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.hotelUnit}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="plan">
							{t('plan')}
						</Label>
						<Select
							id="hotel"
							className="mb-0"
							value={
								formik.values.intPlan
									? {
											value:
												mealPlanOpt?.find(
													(it) =>
														it.value ===
														formik.values.intPlan
												)?.value ?? '',
											label:
												mealPlanOpt?.find(
													(it) =>
														it.value ===
														formik.values.intPlan
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'intPlan',
									value?.value ?? ''
								);
							}}
							options={mealPlanOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="fechaLlegada"
						>
							{t('checkIn')}
						</Label>
						<DatePicker
							id="initialDate"
							date={initialDate}
							onChangeDate={(value) => {
								setInitialDate(value[0]);
								if (value.length > 0) {
									formik.setFieldValue(
										`initialDate`,
										value[0]
									);
								} else {
									formik.setFieldValue(`initialDate`, null);
								}
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="finalDate">
							{t('checkOut')}
						</Label>
						<DatePicker
							id="finalDate"
							date={finalDate}
							onChangeDate={(value) => {
								setFinalDate(value[0]);
								if (value.length > 0) {
									formik.setFieldValue(`finalDate`, value[0]);
								} else {
									formik.setFieldValue(`finalDate`, null);
								}
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="noches">
							{t('nights')}
						</Label>
						<DisabledInput
							value={diffDates(
								formik.values?.initialDate,
								formik.values?.finalDate,
								'days'
							)}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="adult">
							{t('adults')}
						</Label>
						<Input
							type="text"
							className={`form-control`}
							id="adult"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.adult}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="child">
							{t('children')}
						</Label>
						<Input
							type="text"
							className={`form-control`}
							id="child"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.child}
						/>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="infant">
							{t('infants')}
						</Label>
						<Input
							type="text"
							className={`form-control`}
							id="infant"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.infant}
						/>
					</div>
				</Col>
			</Row>
			<Row className="mb-md-3 mb-2">
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hooked">
							Hooked
						</Label>
						<Select
							id="hooked"
							className="mb-0"
							value={
								formik.values.hooked !== '' &&
								formik.values.hooked !== null
									? {
											value: formik.values.hooked,
											label:
												hookedOpt?.find(
													(it) =>
														it.value ===
														formik.values.hooked
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'hooked',
									value?.value ?? ''
								);
							}}
							options={hookedOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.hooked && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.hooked}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Row className="mt-3">
							<Col xs="6">
								<div className="form-check">
									<Input
										className="form-check-input"
										type="checkbox"
										id="visa"
										checked={
											formik.values.visa === 1
												? true
												: false
										}
										onChange={(evt) =>
											formik.setFieldValue(
												'visa',
												evt.target.checked ? 1 : 0
											)
										}
									/>
									<Label
										className="form-check-label"
										htmlFor="visa"
									>
										Visa
									</Label>
								</div>
							</Col>
							<Col xs="6">
								<div className="form-check">
									<Input
										className="form-check-input"
										type="checkbox"
										id="mc"
										checked={
											formik.values.mc === 1
												? true
												: false
										}
										onChange={(evt) =>
											formik.setFieldValue(
												'mc',
												evt.target.checked ? 1 : 0
											)
										}
									/>
									<Label
										className="form-check-label"
										htmlFor="mc"
									>
										Master Card
									</Label>
								</div>
							</Col>
							<Col xs="6">
								<div className="form-check">
									<Input
										className="form-check-input"
										type="checkbox"
										id="amex"
										checked={
											formik.values.amex === 1
												? true
												: false
										}
										onChange={(evt) =>
											formik.setFieldValue(
												'amex',
												evt.target.checked ? 1 : 0
											)
										}
									/>
									<Label
										className="form-check-label"
										htmlFor="amex"
									>
										Amex
									</Label>
								</div>
							</Col>
							<Col xs="6">
								<div className="form-check">
									<Input
										className="form-check-input"
										type="checkbox"
										id="other"
										checked={
											formik.values.other === 1
												? true
												: false
										}
										onChange={(evt) =>
											formik.setFieldValue(
												'other',
												evt.target.checked ? 1 : 0
											)
										}
									/>
									<Label
										className="form-check-label"
										htmlFor="other"
									>
										{t('others')}
									</Label>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="comentario">
							{t('cards')}
						</Label>
						<Input
							type="text"
							className={`form-control`}
							id="cards"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.cards}
						/>
					</div>
				</Col>
				<Col xs="12" md="5">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="comentario">
							{t('comment')}
						</Label>
						<textarea
							id="comentario"
							name="comentario"
							className={`form-control`}
							rows={3}
						/>
					</div>
				</Col>
			</Row>

			{!isUpdating && (
				<div className="d-flex my-3">
					<Button
						type="submit"
						color="primary"
						className="me-2"
						disabled={editClient}
					>
						{t('accept')}
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={toggleDialog ? toggleDialog : () => {}}
						disabled={editClient}
					>
						{t('cancel')}
					</Button>
				</div>
			)}

			{isUpdating && (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: t('accept'),
								color: 'primary',
								className: 'me-2',
								loader: true,
							},
							{
								text: t('cancel'),
								color: 'danger',
								className: 'btn-soft-danger',
								loader: false,
							},
						]}
					/>
				</div>
			)}
		</Form>
	);
};

export default FormReservationEdit;
