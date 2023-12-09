import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
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
import { useQuery } from 'react-query';
import { fetchMaritalStatus } from '../../../../../services/maritalStatus';
import { getHotelAll } from '../../../../../helpers/catalogues/hotel';
import { getMealPlanAll } from '../../../../../helpers/catalogues/meal_plan';
import moment from 'moment';
import DisabledInput from '../../../../Controller/DisabledInput';
import diffDates from '../../../../../util/diffDates';

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
	const [countryDefault, setCountryDefault] = useState(null);
	const [statesDefault, setStatesDefault] = useState(null);
	const [citiesDefault, setCitiesDefault] = useState(null);
	const [phone, setPhone] = useState('');
	const statesOpt = useMemo(() => {
		if (countryDefault) {
			return State.getStatesOfCountry(countryDefault.value);
		} else {
			return [];
		}
	}, [countryDefault]);
	const citiesOpt = useMemo(() => {
		if (countryDefault && statesDefault) {
			return City.getCitiesOfState(
				countryDefault.value,
				statesDefault.value
			);
		} else {
			return [];
		}
	}, [countryDefault, statesDefault]);
	//getMaritalStatus
	const { data: maritalStatusOpt } = useQuery(
		['getMaritalStatus'],
		() => fetchMaritalStatus(),
		{
			select: (data) =>
				data.data.maritaStatusList.map((item) => ({
					value: item.key,
					label: item.value,
				})),
		}
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

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: reservation?.id ?? '',
			dateRequest: reservation?.dateRequest ?? '',
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
			callCenter: reservation?.callCenter ?? { id: '' },
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
				data[key] = value;
			});
			// data['quantity'] = parseInt(values.pax) + parseInt(values.childs);
			console.log(data);
			if (values.idService) {
				//updating existing one
				// updateItem(data);
			} else {
				//creating one
				// createService(data);
			}
		},
	});

	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<h5 className="mt-3 text-primary">Detalle del titular</h5>
			<hr />
			<Row className="mb-md-3 mb-2">
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="customer.firstName"
						>
							Nombre
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.customer?.id ? 'is-invalid' : ''
							}`}
							id="customer.firstName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.customer.firstName}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="customer.lastName"
						>
							Apellidos
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.customer?.id ? 'is-invalid' : ''
							}`}
							id="customer.lastName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.customer.lastName}
						/>
					</div>
				</Col>
				<Col xs="12" md="8">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="address">
							Dirección
						</Label>
						<Input
							type="text"
							className="form-control"
							id="address"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="postalCode">
							CP
						</Label>
						<Input
							type="text"
							className="form-control"
							id="postalCode"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							País
						</Label>
						<Select
							value={countryDefault}
							onChange={(value) => {
								setCountryDefault(value);
								setStatesDefault(null);
								setCitiesDefault(null);
							}}
							options={Country.getAllCountries().map((it) => ({
								label: it.name,
								value: it.isoCode,
							}))}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							Estado
						</Label>
						<Select
							value={statesDefault}
							onChange={(value) => {
								setStatesDefault(value);
								setCitiesDefault(null);
							}}
							options={statesOpt.map((s) => ({
								label: s.name,
								value: s.isoCode,
							}))}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							Ciudad
						</Label>
						<Select
							value={citiesDefault}
							onChange={(value) => {
								setCitiesDefault(value);
							}}
							options={citiesOpt.map((c) => ({
								label: c.name,
								value: c.isoCode,
							}))}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="phone1">
							Teléfono casa
						</Label>
						<PhoneInput
							inputClass={`form-control w-100`}
							countryCodeEditable={false}
							enableSearch={true}
							preferredCountries={['mx', 'us']}
							disableSearchIcon={true}
							localization={es}
							value={phone}
							onChange={(phone, country, e, formattedValue) => {
								setPhone(phone);
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="phone1">
							Teléfono trabajo
						</Label>
						<PhoneInput
							inputClass={`form-control w-100`}
							countryCodeEditable={false}
							enableSearch={true}
							preferredCountries={['mx', 'us']}
							disableSearchIcon={true}
							localization={es}
							value={phone}
							onChange={(phone, country, e, formattedValue) => {
								setPhone(phone);
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="phone1">
							Celular
						</Label>
						<PhoneInput
							inputClass={`form-control w-100`}
							countryCodeEditable={false}
							enableSearch={true}
							preferredCountries={['mx', 'us']}
							disableSearchIcon={true}
							localization={es}
							value={phone}
							onChange={(phone, country, e, formattedValue) => {
								setPhone(phone);
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="email">
							Correo electrónico
						</Label>
						<Input
							type="text"
							className="form-control"
							id="email"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="maritalStatus"
						>
							Estado civil
						</Label>
						<Select
							id="maritalStatus"
							className="mb-0"
							value={
								formik.values.maritalStatus
									? {
											value: formik.values.maritalStatus,
											label:
												maritalStatusOpt?.find(
													(it) =>
														it.value ===
														formik.values
															.maritalStatus
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'maritalStatus',
									value?.value ?? ''
								);
							}}
							options={maritalStatusOpt}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="income">
							Ingreso
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.income ? 'is-invalid' : ''
							}`}
							id="income"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.income}
						/>
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

			<h5 className="text-primary">Detalle de la reservación</h5>
			<hr />
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
