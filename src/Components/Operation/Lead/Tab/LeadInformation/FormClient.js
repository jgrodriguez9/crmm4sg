import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { useMemo, useState } from 'react';
import { SELECT_OPTION } from '../../../../constants/messages';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import { incomeOpt, maritalStatusOpt } from '../../../../constants/utils';
import DatePicker from '../../../../Common/DatePicker';

const FormClient = ({ toggleDialog, textBtnSubmit = 'Aceptar' }) => {
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
		<Form>
			<Row>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0">Nombre</Label>
						<Input
							type="text"
							className="form-control"
							id="nombre"
							defaultValue="Daniel"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0">Apellido</Label>
						<Input
							type="text"
							className="form-control"
							id="nombre"
							defaultValue="Maximiliano"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="fechaLlegada"
						>
							Fecha nacimiento
						</Label>
						<DatePicker
							id="fechaLlegada"
							date="29/06/2023"
							onChangeDate={(date) => console.log(date)}
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

			<div className="d-flex my-3">
				<Button type="submit" color="primary" className="me-2">
					{textBtnSubmit}
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

export default FormClient;
