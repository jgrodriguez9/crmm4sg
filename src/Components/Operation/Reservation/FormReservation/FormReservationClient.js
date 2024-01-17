import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import { Col, FormFeedback, Input, Label, Row } from 'reactstrap';
import StateInput from '../../../Controller/StateInput';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { SELECT_OPTION } from '../../../constants/messages';
import CityInput from '../../../Controller/CityInput';
import { incomeOpt } from '../../../constants/utils';
import { useTranslation } from 'react-i18next';

const FormReservationClient = ({ formik }) => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formReservationClient',
	});
	const [countryDefault, setCountryDefault] = useState(null);
	const [statesDefault, setStatesDefault] = useState(null);
	const [citiesDefault, setCitiesDefault] = useState(null);

	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [mobile, setMobile] = useState('');

	return (
		<Row className="mb-md-3 mb-2">
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.firstName"
					>
						{t('name')}
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.customer?.firstName
								? 'is-invalid'
								: ''
						}`}
						id="customer.firstName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.customer.firstName}
					/>
					{formik.errors.customer?.firstName && (
						<FormFeedback type="invalid d-block">
							{formik.errors.customer?.firstName}
						</FormFeedback>
					)}
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.lastName"
					>
						{t('lastName')}
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.customer?.lastName ? 'is-invalid' : ''
						}`}
						id="customer.lastName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.customer.lastName}
					/>
					{formik.errors.customer?.lastName && (
						<FormFeedback type="invalid d-block">
							{formik.errors.customer?.lastName}
						</FormFeedback>
					)}
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="customer.email">
						{t('email')}
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.customer?.email ? 'is-invalid' : ''
						}`}
						id="customer.email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.customer.email}
					/>
					{formik.errors.customer?.email && (
						<FormFeedback type="invalid d-block">
							{formik.errors.customer?.email}
						</FormFeedback>
					)}
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.address"
					>
						{t('address')}
					</Label>
					<Input
						type="text"
						className={`form-control ${
							formik.errors.customer?.address ? 'is-invalid' : ''
						}`}
						id="customer.address"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.customer.address}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.postalCode"
					>
						{t('zip')}
					</Label>
					<Input
						type="text"
						className="form-control"
						id="customer.postalCode"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.customer.postalCode}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.srcIncome"
					>
						{t('income')}
					</Label>
					<Select
						id="customer.srcIncome"
						className="mb-0"
						value={
							formik.values.customer.srcIncome
								? {
										value: formik.values.customer.srcIncome,
										label:
											incomeOpt.find(
												(it) =>
													it.value ===
													formik.values.customer
														.srcIncome
											)?.label ?? '',
								  }
								: null
						}
						onChange={(value) => {
							formik.setFieldValue(
								'customer.srcIncome',
								value.value
							);
						}}
						options={incomeOpt}
						placeholder="Seleccionar opción"
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label
						className="form-label mb-0"
						htmlFor="customer.country"
					>
						{t('country')}
					</Label>
					<Select
						id="customer.country"
						value={countryDefault}
						onChange={(value) => {
							setCountryDefault(value);
							formik.setFieldValue(
								'customer.country',
								value?.value ?? ''
							);
							setStatesDefault(null);
							formik.setFieldValue('customer.state', '');
							setCitiesDefault(null);
							formik.setFieldValue('customer.city', '');
						}}
						options={Country.getAllCountries().map((it) => ({
							label: it.name,
							value: it.isoCode,
						}))}
						classNamePrefix="select2-selection"
						placeholder={tMessage(SELECT_OPTION)}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="customer.state">
						{t('state')}
					</Label>
					<StateInput
						value={statesDefault}
						handleChange={(value) => {
							setStatesDefault(value);
							formik.setFieldValue(
								'customer.state',
								value?.value ?? ''
							);
							setCitiesDefault(null);
							formik.setFieldValue('customer.city', '');
						}}
						country={countryDefault}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="customer.city">
						{t('city')}
					</Label>
					<CityInput
						value={citiesDefault}
						handleChange={(value) => {
							setCitiesDefault(value);
							formik.setFieldValue(
								'customer.city',
								value?.value ?? ''
							);
						}}
						country={countryDefault}
						state={statesDefault}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="phone1">
						{t('housePhone')}
					</Label>
					<PhoneInput
						inputClass={`form-control w-100`}
						countryCodeEditable={false}
						country={
							!formik.values.customer.phone1
								? formik.values?.country?.toLowerCase() ?? ''
								: ''
						}
						enableSearch={true}
						preferredCountries={['mx', 'us']}
						disableSearchIcon={true}
						localization={es}
						value={phone1}
						onChange={(phone, country) => {
							setPhone1(phone);
							formik.setFieldValue(
								'customer.phone1',
								phone.slice(country.dialCode.length)
							);
						}}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="phone2">
						{t('workPhone')}
					</Label>
					<PhoneInput
						inputClass={`form-control w-100`}
						countryCodeEditable={false}
						country={
							!formik.values.customer.phone2
								? formik.values?.country?.toLowerCase() ?? ''
								: ''
						}
						enableSearch={true}
						preferredCountries={['mx', 'us']}
						disableSearchIcon={true}
						localization={es}
						value={phone2}
						onChange={(phone, country) => {
							setPhone2(phone);
							formik.setFieldValue(
								'customer.phone2',
								phone.slice(country.dialCode.length)
							);
						}}
					/>
				</div>
			</Col>
			<Col xs="12" md="4">
				<div className="mb-2">
					<Label className="form-label mb-0" htmlFor="movil">
						{t('mobile')}
					</Label>
					<PhoneInput
						inputClass={`form-control w-100`}
						countryCodeEditable={false}
						country={
							!formik.values.customer.movil
								? formik.values?.country?.toLowerCase() ?? ''
								: ''
						}
						enableSearch={true}
						preferredCountries={['mx', 'us']}
						disableSearchIcon={true}
						localization={es}
						value={mobile}
						onChange={(phone, country) => {
							setMobile(phone);
							formik.setFieldValue(
								'customer.movil',
								phone.slice(country.dialCode.length)
							);
						}}
					/>
				</div>
			</Col>
		</Row>
	);
};

export default FormReservationClient;
