import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import {
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SELECT_OPTION,
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

const FormReservationEdit = ({ reservation = null, toggleDialog }) => {
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
	const {
		mutate: updateItem,
		isLoading,
		isError,
		error,
	} = useMutation(updateReservationService);

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
			intPlan: reservation?.intPlan ?? '',
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
		},
		validationSchema: Yup.object({
			dateRequest: Yup.string().required(FIELD_REQUIRED),
			adult: Yup.number()
				.min(0, FIELD_POSITIVE)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			child: Yup.number()
				.min(0, FIELD_POSITIVE)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			cards: Yup.string().required(FIELD_REQUIRED),
			callCenter: Yup.object().shape({
				id: Yup.string().required(FIELD_REQUIRED),
			}),
			status: Yup.object().shape({
				id: Yup.string().required(FIELD_REQUIRED),
			}),
			customer: Yup.object().shape({
				id: Yup.string().required(FIELD_REQUIRED),
			}),
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
			console.log(data);
			if (values.id) {
				//updating existing one
				updateItem({
					id: values.id,
					body: data,
				});
			} else {
				//creating one
				// createService(data);
			}
		},
	});
	console.log(formik.errors);
	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<h5 className="text-primary">Detalle de la reservación</h5>
			<hr />
			<Row className="mb-md-3 mb-2">
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
										Otras
									</Label>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="comentario">
							Tarjetas
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
							Comentario
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
			<Row>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotel">
							Hotel
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
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="plan">
							Plan
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
														it.label ===
														formik.values.intPlan
												)?.value ?? '',
											label:
												mealPlanOpt?.find(
													(it) =>
														it.label ===
														formik.values.intPlan
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
							options={mealPlanOpt}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="fechaLlegada">
							Fecha llegada
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
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="finalDate">
							Fecha salida
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
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="noches">
							Noches
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
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="adult">
							Adultos
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
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="child">
							Menores
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
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="infant">
							Infantes
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

			<div className="d-flex my-3">
				<Button type="submit" color="primary" className="me-2">
					Aceptar
				</Button>
				<Button
					type="button"
					color="danger"
					className="btn-soft-danger"
					onClick={toggleDialog ? toggleDialog : () => {}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default FormReservationEdit;
