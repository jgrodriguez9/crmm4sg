import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap';
import StateInput from '../../../Controller/StateInput';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { SELECT_OPTION } from '../../../constants/messages';
import CityInput from '../../../Controller/CityInput';

const FormReservationClient = ({ formik }) => {
	const [countryDefault, setCountryDefault] = useState(null);
	const [statesDefault, setStatesDefault] = useState(null);
	const [citiesDefault, setCitiesDefault] = useState(null);

	return (
		<Row className="mb-md-3 mb-2">
			<Col xs="12" md="6">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="firstName">
						Nombre
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.firstName ? 'is-invalid' : ''
						}`}
						id="firstName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.firstName}
					/>
					{formik.errors.firstName && (
						<FormFeedback type="invalid d-block">
							{formik.errors.firstName}
						</FormFeedback>
					)}
				</div>
			</Col>
			<Col xs="12" md="6">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="lastName">
						Apellido
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.lastName ? 'is-invalid' : ''
						}`}
						id="lastName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.lastName}
					/>
					{formik.errors.lastName && (
						<FormFeedback type="invalid d-block">
							{formik.errors.lastName}
						</FormFeedback>
					)}
				</div>
			</Col>
			<Col xs="12" md="8">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="address">
						Dirección
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.address ? 'is-invalid' : ''
						}`}
						id="address"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.address}
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.postalCode}
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
							formik.setFieldValue('country', value?.label ?? '');
							setStatesDefault(null);
							formik.setFieldValue('state', '');
							setCitiesDefault(null);
							formik.setFieldValue('city', '');
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
					<StateInput
						value={statesDefault}
						handleChange={(value) => {
							setStatesDefault(value);
							formik.setFieldValue('state', value?.label ?? '');
							setCitiesDefault(null);
							formik.setFieldValue('city', '');
						}}
						country={countryDefault}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="country">
						Ciudad
					</Label>
					<CityInput
						value={citiesDefault}
						handleChange={(value) => {
							setCitiesDefault(value);
							formik.setFieldValue('city', value?.label ?? '');
						}}
						country={countryDefault}
						state={statesDefault}
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
						value={formik.values.phone1}
						onChange={(phone) => {
							formik.setFieldValue('phone1', phone);
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
						value={formik.values.phone2}
						onChange={(phone) => {
							formik.setFieldValue('phone2', phone);
						}}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="movil">
						Celular
					</Label>
					<PhoneInput
						inputClass={`form-control w-100`}
						countryCodeEditable={false}
						enableSearch={true}
						preferredCountries={['mx', 'us']}
						disableSearchIcon={true}
						localization={es}
						value={formik.values.movil}
						onChange={(phone) => {
							formik.setFieldValue('movil', phone);
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
						className={`form-control ${
							formik.errors.email ? 'is-invalid' : ''
						}`}
						id="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="srcIncome">
						Ingreso
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.srcIncome ? 'is-invalid' : ''
						}`}
						id="srcIncome"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.srcIncome}
					/>
				</div>
			</Col>
		</Row>
	);
};

export default FormReservationClient;
