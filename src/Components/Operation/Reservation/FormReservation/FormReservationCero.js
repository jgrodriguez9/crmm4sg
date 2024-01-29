import { useState } from 'react';
import { useQuery } from 'react-query';
import { getHotelAll } from '../../../../helpers/catalogues/hotel';
import { getMealPlanAll } from '../../../../helpers/catalogues/meal_plan';
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { SELECT_OPTION } from '../../../constants/messages';
import DatePicker from '../../../Common/DatePicker';
import DisabledInput from '../../../Controller/DisabledInput';
import diffDates from '../../../../util/diffDates';
import { getCallCenterByUser } from '../../../../helpers/catalogues/call_center';
import { getHotelUnitByHotelPaginate } from '../../../../helpers/catalogues/hotel_unit';
import { useTranslation } from 'react-i18next';
import useUser from '../../../../hooks/useUser';

const FormReservationCero = ({ formik }) => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formReservationCero',
	});
	const user = useUser();
	const [initialDate, setInitialDate] = useState(null);
	const [finalDate, setFinalDate] = useState(null);
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
	//getCallCenter
	const { data: callCenterOpt } = useQuery(
		['getCallCenterByUser'],
		() => getCallCenterByUser(user?.usuario),
		{
			enabled: user?.usuario !== undefined,
			select: (data) =>
				data.data?.list.map((item) => ({
					value: item.id,
					label: item.name,
				})) ?? [],
		}
	);
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
		<>
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
						{formik.errors.hotel?.id && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.hotel?.id}
							</FormFeedback>
						)}
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
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotel">
							Call center
						</Label>
						<Select
							id="hotel"
							className="mb-0"
							value={
								formik.values.callCenter?.id
									? {
											value: formik.values.callCenter.id,
											label:
												callCenterOpt?.find(
													(it) =>
														it.value ===
														formik.values.callCenter
															.id
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'callCenter.id',
									value?.value ?? ''
								);
							}}
							options={callCenterOpt}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.callCenter?.id && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.callCenter?.id}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs="12" md="2">
					<div className="mb-3">
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
					<div className="mb-3">
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
					<div className="mb-3">
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
					<div className="form-check mt-3">
						<Input
							className="form-check-input"
							type="checkbox"
							id="pickup"
							checked={
								formik.values.pickup === 'P' ? true : false
							}
							onChange={(evt) =>
								formik.setFieldValue(
									'pickup',
									evt.target.checked ? 'P' : 'NP'
								)
							}
						/>
						<Label className="form-check-label" htmlFor="pickup">
							Pickup
						</Label>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label mb-0" htmlFor="adult">
							{t('adults')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.adult ? 'is-invalid' : ''
							}`}
							id="adult"
							name="adult"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.adult}
						/>
						{formik.errors.adult && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.adult}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label mb-0" htmlFor="child">
							{t('children')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.child ? 'is-invalid' : ''
							}`}
							id="child"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.child}
						/>
						{formik.errors.child && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.child}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label mb-0" htmlFor="infant">
							{t('infants')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.infant ? 'is-invalid' : ''
							}`}
							id="infant"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.infant}
						/>
						{formik.errors.infant && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.infant}
							</FormFeedback>
						)}
					</div>
				</Col>
			</Row>
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
										{t('others')}
									</Label>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="cards">
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
						{formik.errors.cards && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.cards}
							</FormFeedback>
						)}
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
		</>
	);
};

export default FormReservationCero;
