import { useState } from 'react';
import { useQuery } from 'react-query';
import { getHotelAll } from '../../../../helpers/catalogues/hotel';
import { getMealPlanAll } from '../../../../helpers/catalogues/meal_plan';
import { Col, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { SELECT_OPTION } from '../../../constants/messages';
import DatePicker from '../../../Common/DatePicker';
import DisabledInput from '../../../Controller/DisabledInput';
import diffDates from '../../../../util/diffDates';

const FormReservationCero = ({ formik }) => {
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

	return (
		<>
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
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotelUnit">
							Hotel Unit
						</Label>
						<Select
							id="hotelUnit"
							className="mb-0"
							value={null}
							onChange={(value) => {
								console.log(value);
							}}
							options={[]}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="unit">
							Unit
						</Label>
						<Select
							id="unit"
							className="mb-0"
							value={null}
							onChange={(value) => {
								console.log(value);
							}}
							options={[]}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="pickup">
							Pickup
						</Label>
						<Select
							id="pickup"
							className="mb-0"
							value={null}
							onChange={(value) => {
								console.log(value);
							}}
							options={[]}
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
		</>
	);
};

export default FormReservationCero;
