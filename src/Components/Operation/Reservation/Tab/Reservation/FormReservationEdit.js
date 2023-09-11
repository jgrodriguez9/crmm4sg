import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';
import { SELECT_OPTION } from '../../../../constants/messages';
import { incomeOpt, maritalStatusOpt } from '../../../../constants/utils';
import DatePicker from '../../../../Common/DatePicker';

const FormReservationEdit = ({ toggleDialog }) => {
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

	return (
		<Form className="fs-7">
			<h5 className="mt-3 text-primary">Detalle del titular</h5>
			<hr />
			<Row className="mb-md-3 mb-2">
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="firstName">
							Nombre
						</Label>
						<Input
							type="text"
							className="form-control"
							id="firstName"
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="lastName">
							Apellidos
						</Label>
						<Input
							type="text"
							className="form-control"
							id="lastName"
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
							htmlFor="estadoCivil"
						>
							Estado civil
						</Label>
						<Select
							id="estadoCivil"
							className="mb-0"
							value={null}
							onChange={() => {}}
							options={maritalStatusOpt}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="ingreso">
							Ingreso
						</Label>
						<Select
							id="ingreso"
							className="mb-0"
							value={null}
							onChange={() => {}}
							options={incomeOpt}
							placeholder="Seleccionar opción"
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
										checked={true}
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
										id="masterCard"
									/>
									<Label
										className="form-check-label"
										htmlFor="masterCard"
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
										id="otras"
									/>
									<Label
										className="form-check-label"
										htmlFor="otras"
									>
										Otras
									</Label>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs="12" md="8">
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
							value={{
								value: 'Ocean Spa Hotel',
								label: 'Ocean Spa Hotel',
							}}
							onChange={() => {}}
							options={[
								{
									value: 'Ocean Spa Hotel',
									label: 'Ocean Spa Hotel',
								},
							]}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="plan">
							Plan
						</Label>
						<Select
							id="plan"
							className="mb-0"
							value={{
								value: 'All Inclusive Multiple',
								label: 'All Inclusive Multiple',
							}}
							onChange={() => {}}
							options={[
								{
									value: 'All Inclusive Multiple',
									label: 'All Inclusive Multiple',
								},
							]}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="fechaLlegada">
							Fecha llegada
						</Label>
						<DatePicker
							id="fechaLlegada"
							date="29/06/2023"
							onChangeDate={(date) => console.log(date)}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="fechaSalida">
							Fecha salida
						</Label>
						<DatePicker
							id="fechaSalida"
							date="29/06/2023"
							onChangeDate={(date) => console.log(date)}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="noches">
							Noches
						</Label>
						<Input
							type="text"
							className="form-control"
							id="noches"
							defaultValue="4"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="adultos">
							Adultos
						</Label>
						<Input
							type="text"
							className="form-control"
							id="adultos"
							defaultValue="2"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="juniors">
							Menores
						</Label>
						<Input
							type="text"
							className="form-control"
							id="juniors"
							defaultValue="0"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-3">
						<Label className="form-label" htmlFor="infantes">
							Infantes
						</Label>
						<Input
							type="text"
							className="form-control"
							id="infantes"
							defaultValue="0"
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
