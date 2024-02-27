import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';
import {
	ERROR_SERVER,
	FIELD_REQUIRED,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useMutation, useQuery } from 'react-query';
import { fetchMaritalStatus } from '../../../../../services/maritalStatus';
import DisabledInput from '../../../../Controller/DisabledInput';
import { fecthItem } from '../../../../../pages/Operation/Lead/Util/services';
import { updateClientService } from '../../../../../services/client';
import { useEffect } from 'react';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import { addMessage } from '../../../../../slices/messages/reducer';
import StateInput from '../../../../Controller/StateInput';
import CityInput from '../../../../Controller/CityInput';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { incomeOpt } from '../../../../constants/utils';
import { useTranslation } from 'react-i18next';

const FormReservationClient = ({
	reservation = null,
	setEditClient,
	editClient,
	setOpenClient,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formReservationClient',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	//service to get the client
	const {
		data: customer,
		error: errrorItem,
		isFetching: isFetchingItem,
		refetch,
	} = useQuery(
		['getCustomer', reservation.customer.id],
		() => fecthItem(reservation.customer.id),
		{
			enabled: reservation?.customer?.id !== null,
			refetchOnWindowFocus: false,
			select: (response) => response.data,
		}
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

	useEffect(() => {
		setCountryDefault(
			customer?.country
				? {
						label: customer?.country?.name,
						value: customer?.country?.iso_code,
				  }
				: null
		);
		setStatesDefault(
			customer?.state
				? { label: customer?.state, value: customer?.state }
				: null
		);
		setCitiesDefault(
			customer?.city
				? { label: customer?.city, value: customer?.city }
				: null
		);
	}, [customer]);

	const [phone1, setPhone1] = useState('');
	const [phone2, setPhone2] = useState('');
	const [mobile, setMobile] = useState('');
	const [email, setEmail] = useState('');
	const [email2, setEmail2] = useState('');

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

	//update client
	const {
		mutate: updateCient,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useMutation(updateClientService);

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				addMessage({
					type: 'success',
					message: tMessage(UPDATE_SUCCESS),
				})
			);
			setEditClient(false);
			setOpenClient(false);
			setEditCorreo(false);
			setEditCorreo2(false);
			setEditPhone1(false);
			setEditPhone2(false);
			setEditMobile(false);
			refetch();
		}
		if (isError) {
			let message = tMessage(ERROR_SERVER);
			message = extractMeaningfulMessage(error, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [isError, dispatch, error, isSuccess]);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: customer?.id,
			firstName: customer?.firstName ?? '',
			lastName: customer?.lastName ?? '',
			address: customer?.address ?? '',
			postalCode: customer?.postalCode ?? '',
			country: customer?.country ?? '',
			state: customer?.state ?? '',
			city: customer?.city ?? '',
			phone1: customer?.phone1 ?? '',
			phone2: customer?.phone2 ?? '',
			movil: customer?.movil ?? '',
			email: customer?.email ?? '',
			email2: customer?.email2 ?? '',
			maritalStatusKey:
				maritalStatusOpt?.find(
					(it) => it.label === customer?.maritalStatus
				)?.value ?? '',
			srcIncome: customer?.srcIncome ?? '',
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
				if (
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
			if (mobile) data['movil'] = values.mobile;
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
	const togglePhone2 = () => setEditPhone2(!editPhone1);
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
			<Row className="mb-md-3 mb-2">
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="customer.firstName"
						>
							{t('name')}
						</Label>
						{!editClient && (
							<DisabledInput value={formik.values.firstName} />
						)}
						{editClient && (
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
						)}
						{formik.errors.firstName && (
							<FormFeedback type="invalid d-block">
								{formik.errors.firstName}
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
						{!editClient && (
							<DisabledInput value={formik.values.lastName} />
						)}
						{editClient && (
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
						)}

						{formik.errors.lastName && (
							<FormFeedback type="invalid d-block">
								{formik.errors.lastName}
							</FormFeedback>
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
						<Label className="form-label mb-0" htmlFor="address">
							{t('address')}
						</Label>
						{!editClient && (
							<DisabledInput value={formik.values.address} />
						)}
						{editClient && (
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
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="postalCode">
							{t('zip')}
						</Label>
						{!editClient && (
							<DisabledInput value={formik.values.postalCode} />
						)}
						{editClient && (
							<Input
								type="text"
								className="form-control"
								id="postalCode"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.postalCode}
							/>
						)}
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
						{!editClient && (
							<DisabledInput value={formik.values.srcIncome} />
						)}
						{editClient && (
							<Select
								id="customer.srcIncome"
								className="mb-0"
								value={
									formik.values.srcIncome
										? {
												value: formik.values.srcIncome,
												label:
													incomeOpt.find(
														(it) =>
															it.value ===
															formik.values
																.srcIncome
													)?.label ?? '',
										  }
										: null
								}
								onChange={(value) => {
									formik.setFieldValue(
										'srcIncome',
										value.value
									);
								}}
								options={incomeOpt}
								placeholder="Seleccionar opción"
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('country')}
						</Label>
						{!editClient && (
							<DisabledInput
								value={countryDefault?.label ?? ''}
							/>
						)}
						{editClient && (
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
								options={Country.getAllCountries().map(
									(it) => ({
										label: it.name,
										value: it.isoCode,
									})
								)}
								classNamePrefix="select2-selection"
								placeholder={tMessage(SELECT_OPTION)}
							/>
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('state')}
						</Label>
						{!editClient && (
							<StateInput
								value={statesDefault}
								handleChange={(value) => {}}
								country={countryDefault}
								isReadOnly={true}
							/>
						)}
						{editClient && (
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
						)}
					</div>
				</Col>
				<Col xs="12" md="4">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('city')}
						</Label>
						{!editClient && (
							<DisabledInput value={citiesDefault?.value ?? ''} />
						)}
						{editClient && (
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
						)}
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
								country={
									!phone2
										? formik.values?.country?.toLowerCase() ??
										  ''
										: ''
								}
								enableSearch={true}
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
						<Label className="form-label mb-0" htmlFor="phone1">
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
								country={
									!mobile
										? formik.values?.country?.toLowerCase() ??
										  ''
										: ''
								}
								enableSearch={true}
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
				{/* <Col xs="12" md="4">
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="maritalStatus"
						>
							Estado civil
						</Label>
						{!editClient && (
							<DisabledInput
								value={
									maritalStatusOpt?.find(
										(it) =>
											it.value ===
											formik.values.maritalStatusKey
									)?.label ?? ' '
								}
							/>
						)}
						{editClient && (
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
						)}
					</div>
				</Col> */}
			</Row>

			{!isLoading && editClient && (
				<div className="d-flex my-3">
					<Button type="submit" color="primary" className="me-2">
						{t('accept')}
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={() => {
							setEditClient(false);
							setOpenClient(false);
						}}
					>
						{t('cancel')}
					</Button>
				</div>
			)}

			{isLoading && (
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

export default FormReservationClient;
