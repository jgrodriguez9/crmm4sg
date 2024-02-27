import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useEffect, useState } from 'react';
import {
	ERROR_SERVER,
	FIELD_REQUIRED,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import DatePicker from '../../../../Common/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import StateInput from '../../../../Controller/StateInput';
import CityInput from '../../../../Controller/CityInput';
import DisabledInput from '../../../../Controller/DisabledInput';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useMutation, useQuery } from 'react-query';
import { fetchMaritalStatus } from '../../../../../services/maritalStatus';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import { updateClientService } from '../../../../../services/client';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { useTranslation } from 'react-i18next';
import useUser from '../../../../../hooks/useUser';

const FormClient = ({
	toggleDialog,
	textBtnSubmit = 'Aceptar',
	customer,
	refetchClient,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formClient',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const user = useUser();
	const dispatch = useDispatch();
	const [fechaNacimiento, setFechaNacimiento] = useState(
		customer?.fechaNacimiento
			? moment(customer?.fechaNacimiento, 'YYYY-MM-DD').toDate()
			: null
	);
	const [countryDefault, setCountryDefault] = useState(
		customer?.country
			? {
					label: customer?.country?.name,
					value: customer?.country?.iso_code,
			  }
			: null
	);
	const [statesDefault, setStatesDefault] = useState(
		customer?.state
			? { label: customer?.state, value: customer?.state }
			: null
	);
	const [citiesDefault, setCitiesDefault] = useState(
		customer?.city ? { label: customer?.city, value: customer?.city } : null
	);
	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const [email2, setEmail2] = useState('');

	//getStatus
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

	//update client
	const {
		mutate: updateCient,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useMutation(updateClientService);

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				addMessage({
					type: 'success',
					message: tMessage(UPDATE_SUCCESS),
				})
			);
			toggleDialog();
			refetchClient();
		} else if (isError) {
			let message = tMessage(ERROR_SERVER);
			message = extractMeaningfulMessage(error, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [isSuccess, isError, dispatch, error]);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: customer?.id ?? '',
			firstName: customer?.firstName ?? '',
			lastName: customer?.lastName ?? '',
			fechaNacimiento: customer?.fechaNacimiento ?? '',
			address: customer?.address ?? '',
			postalCode: customer?.postalCode ?? '',
			country: customer?.country?.iso_code ?? '',
			state: customer?.state ?? '',
			city: customer?.city ?? '',
			phone1: customer?.phone1 ?? '',
			phone2: customer?.phone2 ?? '',
			movil: customer?.movil ?? '',
			email: customer?.email ?? '',
			email2: customer?.email2 ?? '',
			userName: customer?.userName ?? user.usuario,
			maritalStatusKey:
				maritalStatusOpt?.find(
					(it) => it.label === customer?.maritalStatus
				)?.value ?? '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required(tMessage(FIELD_REQUIRED)),
			lastName: Yup.string().required(tMessage(FIELD_REQUIRED)),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'fechaNacimiento') {
					data[key] = moment(values.fechaNacimiento).format(
						'YYYY-MM-DD'
					);
				} else if (
					key !== 'phone1' &&
					key !== 'phone2' &&
					key !== 'movil' &&
					key !== 'email' &&
					key !== 'email2'
				) {
					data[key] = value;
				}
			});
			if (phone1) data['phone1'] = values.phone1;
			if (phone2) data['phone2'] = values.phone2;
			if (mobile) data['movil'] = values.movil;
			if (email) data['email'] = email;
			if (email2) data['email2'] = email2;

			updateCient({
				id: values.id,
				body: data,
			});
		},
	});

	const [editPhone1, setEditPhone1] = useState(false);
	const togglePhone1 = () => setEditPhone1(!editPhone1);
	const [editPhone2, setEditPhone2] = useState(false);
	const togglePhone2 = () => setEditPhone2(!editPhone2);
	const [editMobile, setEditMobile] = useState(false);
	const toggleMobile = () => setEditMobile(!editMobile);

	const [editCorreo, setEditCorreo] = useState(false);
	const toggleCorreo = () => {
		setEditCorreo(!editCorreo);
		formik.setFieldValue('email', '');
	};
	const [editCorreo2, setEditCorreo2] = useState(false);
	const toggleCorreo2 = () => {
		setEditCorreo2(!editCorreo2);
		formik.setFieldValue('email2', '');
	};
	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<Row>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="firstName">
							{t('name')}
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
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="lastName">
							{t('lastName')}
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
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="fechaLlegada"
						>
							{t('birthDay')}
						</Label>
						<DatePicker
							id="fechaLlegada"
							date={fechaNacimiento}
							onChangeDate={(value) => {
								setFechaNacimiento(value[0]);
								if (value.length > 0) {
									formik.setFieldValue(
										`fechaNacimiento`,
										value[0]
									);
								} else {
									formik.setFieldValue(
										`fechaNacimiento`,
										null
									);
								}
							}}
						/>
					</div>
				</Col>
				<Col xs="12" md="8">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="address">
							{t('address')}
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
							{t('zip')}
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
							{t('country')}
						</Label>
						<Select
							value={countryDefault}
							onChange={(value) => {
								setCountryDefault(value);
								formik.setFieldValue(
									'country',
									value?.value ?? ''
								);
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
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('state')}
						</Label>
						<StateInput
							value={statesDefault}
							handleChange={(value) => {
								setStatesDefault(value);
								formik.setFieldValue(
									'state',
									value?.value ?? ''
								);
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
							{t('city')}
						</Label>
						<CityInput
							value={citiesDefault}
							handleChange={(value) => {
								setCitiesDefault(value);
								formik.setFieldValue(
									'city',
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
						{!editPhone1 ? (
							<DisabledInput
								endIcon={
									<i
										className="bx bxs-pencil text-primary"
										onClick={togglePhone1}
									/>
								}
								value={formik.values.phone1}
							/>
						) : (
							<PhoneInput
								inputClass={`form-control w-100`}
								countryCodeEditable={false}
								enableSearch={true}
								country={
									!phone1
										? formik.values?.country?.toLowerCase() ??
										  ''
										: ''
								}
								preferredCountries={['mx', 'us']}
								disableSearchIcon={true}
								localization={es}
								value={phone1}
								onChange={(
									phone,
									country,
									e,
									formattedValue
								) => {
									setPhone1(phone);
									formik.setFieldValue(
										'phone1',
										phone.slice(country.dialCode.length)
									);
								}}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="phone1">
							{t('workPhone')}
						</Label>
						{!editPhone2 ? (
							<DisabledInput
								endIcon={
									<i
										className="bx bxs-pencil text-primary"
										onClick={togglePhone2}
									/>
								}
								value={formik.values.phone2}
							/>
						) : (
							<PhoneInput
								inputClass={`form-control w-100`}
								countryCodeEditable={false}
								enableSearch={true}
								country={
									!phone2
										? formik.values?.country?.toLowerCase() ??
										  ''
										: ''
								}
								preferredCountries={['mx', 'us']}
								disableSearchIcon={true}
								localization={es}
								value={phone2}
								onChange={(
									phone,
									country,
									e,
									formattedValue
								) => {
									setPhone2(phone);
									formik.setFieldValue(
										'phone2',
										phone.slice(country.dialCode.length)
									);
								}}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="movil">
							{t('mobile')}
						</Label>
						{!editMobile ? (
							<DisabledInput
								endIcon={
									<i
										className="bx bxs-pencil text-primary"
										onClick={toggleMobile}
									/>
								}
								value={formik.values.movil}
							/>
						) : (
							<PhoneInput
								inputClass={`form-control w-100`}
								countryCodeEditable={false}
								enableSearch={true}
								country={
									!mobile
										? formik.values?.country?.toLowerCase() ??
										  ''
										: ''
								}
								preferredCountries={['mx', 'us']}
								disableSearchIcon={true}
								localization={es}
								value={mobile}
								onChange={(
									phone,
									country,
									e,
									formattedValue
								) => {
									setMobile(phone);
									formik.setFieldValue(
										'movil',
										phone.slice(country.dialCode.length)
									);
								}}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="email">
							{t('email')}
						</Label>
						{!editCorreo ? (
							<DisabledInput
								endIcon={
									<i
										className="bx bxs-pencil text-primary"
										onClick={toggleCorreo}
									/>
								}
								value={formik.values.email}
							/>
						) : (
							<Input
								type="text"
								className={`form-control`}
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="email2">
							{t('email')} 2
						</Label>
						{!editCorreo2 ? (
							<DisabledInput
								endIcon={
									<i
										className="bx bxs-pencil text-primary"
										onClick={toggleCorreo2}
									/>
								}
								value={formik.values.email2}
							/>
						) : (
							<Input
								type="text"
								className={`form-control`}
								id="email2"
								onChange={(e) => setEmail2(e.target.value)}
								value={email2}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="estadoCivil"
						>
							{t('maritalStatus')}
						</Label>
						<Select
							id="estadoCivil"
							className="mb-0"
							value={
								formik.values.maritalStatusKey
									? {
											value: formik.values
												.maritalStatusKey,
											label:
												maritalStatusOpt?.find(
													(it) =>
														it.value ===
														formik.values
															.maritalStatusKey
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'maritalStatusKey',
									value?.value ?? ''
								);
							}}
							options={maritalStatusOpt}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="income+">
							{t('income')}
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
			</Row>

			{isLoading ? (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: textBtnSubmit,
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
			) : (
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
						{t('cancel')}
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormClient;
