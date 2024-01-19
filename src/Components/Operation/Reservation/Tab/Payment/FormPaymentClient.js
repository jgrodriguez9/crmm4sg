import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCardTypesAll } from '../../../../../helpers/catalogues/cardType';
import {
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
	SELECT_OPTION,
} from '../../../../constants/messages';
import { useFormik } from 'formik';
import useUser from '../../../../../hooks/useUser';
import * as Yup from 'yup';
import { useState } from 'react';
import { getServicesByReservation } from '../../../../../helpers/reservation';
import { addIconClass, deleteIconClass } from '../../../../constants/icons';
import jsFormatNumber from '../../../../../util/jsFormatNumber';
import { getCurrencyAll } from '../../../../../helpers/catalogues/currencyType';
import { getAffiliationAll } from '../../../../../helpers/catalogues/affiliation';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import moment from 'moment';
import { createPayment } from '../../../../../helpers/payments';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';

const FormPaymentClient = ({ toggleDialog, reservation, payment }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formPaymentClient',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	const user = useUser();
	const queryClient = useQueryClient();
	const [service, setService] = useState(null);
	const { data: cardTypesOpt } = useQuery(
		['getCardTypesAll'],
		async () => {
			const response = await getCardTypesAll();
			return response;
		},
		{
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: it.card,
					type: it.type,
					alias: it.alias,
				})),
		}
	);
	//services
	const { data: servicesOpt } = useQuery(
		['getServiceByReservation', reservation.id],
		async () => {
			const response = await getServicesByReservation(reservation.id);
			return response;
		},
		{
			keepPreviousData: true,
			select: (response) =>
				response.data.list
					.filter((it) => !it.isPaid)
					.map((it) => ({
						value: it.idService,
						label: it.subService?.name ?? it.description,
						booking: it.idBooking,
						amount: it.amount,
					})),
		}
	);
	//curencies
	const { data: currencyOpt } = useQuery(
		['getCurrencyAll'],
		async () => {
			const response = await getCurrencyAll();
			return response;
		},
		{
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: `(${it.isoCode}) ${it.currency}`,
					exchangeRate: it.exchangeRate,
					isoCode: it.isoCode,
				})),
		}
	);
	//affiliation
	const { data: affiliationOpt } = useQuery(
		['getAffiliationAll'],
		async () => {
			const response = await getAffiliationAll();
			return response;
		},
		{
			select: (response) =>
				response.data.map((it) => ({
					value: it.id,
					label: it.affiliationDescription,
				})),
		}
	);

	//create payment
	const { mutate: create, isLoading: isCreating } = useMutation(
		createPayment,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(SAVE_SUCCESS),
					})
				);
				queryClient.refetchQueries({
					queryKey: ['getPaymentsByReservation'],
				});
			},
		}
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			idReservation: payment?.idReservation ?? reservation.id,
			cardHolderName: payment?.cardHolderName ?? '',
			cardHolderLastName: payment?.cardHolderLastName ?? '',
			bank: payment?.bank?.id ?? '',
			type: payment?.type ?? '',
			amount: payment?.amount ?? '',
			currency: payment?.currency ?? { id: '' },
			creditCard: '',
			cardType: payment?.cardType ?? '',
			expiration: payment?.expiration ?? '',
			autorization: payment?.autorization ?? '',
			user: payment?.user ?? user?.usuario,
			department: payment?.department ?? { id: user?.deptoid },
			multi: payment?.multi ?? '',
			exchangeRateTC: payment?.exchangeRateTC ?? '',
			amountMXN: payment?.amountMXN ?? '',
			exchangeRate: payment?.exchangeRate ?? '',
			paymentDate: payment?.paymentDate ?? '',
			contractedServices: payment?.contractedServices ?? [],
			idInvoice: payment?.idInvoice ?? '',
			affiliation: payment?.affiliation ?? { id: '' },
			//temp
			cvv: '',
		},
		validationSchema: Yup.object({
			cardHolderName: Yup.string().required(tMessage(FIELD_REQUIRED)),
			cardHolderLastName: Yup.string().required(tMessage(FIELD_REQUIRED)),
			creditCard: Yup.string().required(tMessage(FIELD_REQUIRED)),
			expiration: Yup.string().required(tMessage(FIELD_REQUIRED)),
			cardType: Yup.string().required(tMessage(FIELD_REQUIRED)),
			autorization: Yup.string().required(tMessage(FIELD_REQUIRED)),
			paymentDate: Yup.string().required(tMessage(FIELD_REQUIRED)),
			currency: Yup.object().shape({
				id: Yup.number().required(tMessage(FIELD_REQUIRED)),
			}),
			amount: Yup.number()
				.min(0, tMessage(FIELD_POSITIVE))
				.integer(tMessage(FIELD_INTEGER))
				.typeError(tMessage(FIELD_NUMERIC))
				.required(tMessage(FIELD_REQUIRED)),
			amountMXN: Yup.number()
				.min(0, tMessage(FIELD_POSITIVE))
				.integer(tMessage(FIELD_INTEGER))
				.typeError(tMessage(FIELD_NUMERIC))
				.required(tMessage(FIELD_REQUIRED)),
			contractedServices: Yup.array().min(
				1,
				'Al menos debes seleccionar 1 servicio'
			),
		}),
		onSubmit: async (values) => {
			//submit request
			const parsedServices = [];
			console.log(values);
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'paymentDate') {
					data[key] = moment(values.paymentDate).format('YYYY-MM-DD');
				} else {
					data[key] = value;
				}
			});
			console.log(data);
			create(data);
			// if (values.idService) {
			// 	//updating existing one
			// 	updateItem({
			// 		idBooking: reservation.booking,
			// 		isService: values.idService,
			// 		body: data,
			// 	});
			// } else {
			// 	//creating one
			// 	createService(data);
			// }
		},
	});
	console.log(formik.values);

	const addService = () => {
		const copyServices = [...formik.values.contractedServices];
		copyServices.push({
			idBooking: service.booking,
			idService: service.value,
			label: service.label,
			amount: service.amount,
		});
		formik.setFieldValue('contractedServices', copyServices);
		const totalAmount = copyServices.reduce(
			(acc, curr) => acc + curr.amount,
			0
		);
		formik.setFieldValue('amountMXN', totalAmount);
		formik.setFieldValue('amount', totalAmount);
		setService(null);
	};
	const removeService = (index) => {
		const copyServices = [...formik.values.contractedServices];
		copyServices.splice(index, 1);
		formik.setFieldValue('contractedServices', copyServices);
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
			<Row className="align-items-end">
				<Col xs="10">
					<Label className="form-label mb-1" htmlFor="cardType">
						Servicios
					</Label>
					<Select
						value={service}
						onChange={(value) => setService(value)}
						options={servicesOpt}
						name="choices-single-default"
						placeholder={tMessage(SELECT_OPTION)}
						id="cardType"
					/>
				</Col>
				<Col xs="2">
					<Button
						color="info"
						onClick={addService}
						disabled={!service}
						type="button"
					>
						<i className={`${addIconClass} fs-5`} />
					</Button>
				</Col>
				<Col xs="12">
					{formik.errors.contractedServices && (
						<FormFeedback type="invalid" className="d-block">
							{formik.errors.contractedServices}
						</FormFeedback>
					)}
				</Col>
			</Row>
			{formik.values.contractedServices.map((it, idx) => (
				<Row
					key={`service-${idx}`}
					className={`align-items-center ${
						idx === 0 ? 'mt-3' : 'mt-1'
					}`}
				>
					<Col xs="8">{it.label}</Col>
					<Col xs="2">{jsFormatNumber(it.amount)}</Col>
					<Col xs="2">
						<Button
							type="button"
							color="danger"
							size="sm"
							onClick={() => removeService(idx)}
						>
							<i className={`${deleteIconClass} fs-5`} />
						</Button>
					</Col>
				</Row>
			))}
			{formik.values.contractedServices.length > 0 && <hr />}
			<Row>
				<Col lg={6}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cardHolderName"
						>
							{t('name')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.cardHolderName ? 'is-invalid' : ''
							}`}
							id="cardHolderName"
							name="cardHolderName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.cardHolderName}
						/>
						{formik.errors.cardHolderName && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.cardHolderName}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cardHolderLastName"
						>
							{t('lastName')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.cardHolderLastName
									? 'is-invalid'
									: ''
							}`}
							id="cardHolderLastName"
							name="cardHolderLastName"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.cardHolderLastName}
						/>
						{formik.errors.cardHolderLastName && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.cardHolderLastName}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="creditCard">
							{t('card')}
						</Label>
						<InputMask
							id="creditCard"
							className={`form-control ${
								formik.errors.creditCard ? 'is-invalid' : ''
							}`}
							mask="9999 9999 9999 9999"
							maskChar=" "
							placeholder="xxxx xxxx xxxx xxxx"
							value={formik.values.creditCard}
							onChange={(e) => {
								let val = e.target.value.replace(/[^0-9]/g, '');
								formik.setFieldValue('creditCard', val);
							}}
						/>
						{formik.errors.creditCard && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.creditCard}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="expiration">
							{t('expirationDate')}
						</Label>
						<InputMask
							id="expiration"
							className={`form-control ${
								formik.errors.expiration ? 'is-invalid' : ''
							}`}
							mask="99/99"
							maskChar=" "
							placeholder="MM/YY"
							value={formik.values.expiration}
							onChange={(e) => {
								formik.setFieldValue(
									'expiration',
									e.target.value
								);
							}}
						/>
						{formik.errors.expiration && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.expiration}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="cvv">
							CVV
						</Label>
						<InputMask
							id="cvv"
							className={`form-control ${
								formik.errors.cvv ? 'is-invalid' : ''
							}`}
							mask="999"
							maskChar=" "
							placeholder="xxx"
							value={formik.values.cvv}
							onChange={(e) => {
								formik.setFieldValue('cvv', e.target.value);
							}}
						/>
						{formik.errors.cvv && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.cvv}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs={12} md={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="cardType">
							{t('cardType')}
						</Label>
						<Select
							value={
								formik.values.cardType
									? {
											value: formik.values.cardType,
											label:
												cardTypesOpt.find(
													(it) =>
														it.value ===
														formik.values.cardType
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue('cardType', value.value);
							}}
							options={cardTypesOpt}
							name="choices-single-default"
							placeholder={tMessage(SELECT_OPTION)}
							id="cardType"
						/>
						{formik.errors.cardType && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.cardType}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col md={6}></Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							{t('terminalType')}
						</Label>
						<Select
							value={null}
							onChange={() => {}}
							options={[]}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							{t('membership')}
						</Label>
						<Select
							value={
								formik.values.affiliation?.id
									? {
											value: formik.values.affiliation.id,
											label:
												affiliationOpt.find(
													(it) =>
														it.value ===
														formik.values
															.affiliation.id
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'affiliation.id',
									value?.value ?? ''
								);
							}}
							options={affiliationOpt}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="autorization"
						>
							{t('noAuthorization')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.autorization ? 'is-invalid' : ''
							}`}
							id="autorization"
							name="autorization"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.autorization}
						/>
						{formik.errors.autorization && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.autorization}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="paymentDate"
						>
							{t('paymentDate')}
						</Label>
						<DatePicker
							id="paymentDate"
							date={formik.values.paymentDate}
							onChangeDate={(value) => {
								if (value.length > 0) {
									formik.setFieldValue(
										`paymentDate`,
										value[0]
									);
								} else {
									formik.setFieldValue(`paymentDate`, null);
								}
							}}
						/>
						{formik.errors.paymentDate && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.paymentDate}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="currency">
							{t('currency')}
						</Label>
						<Select
							value={
								formik.values.currency?.id
									? {
											value: formik.values.currency.id,
											label:
												currencyOpt.find(
													(it) =>
														it.value ===
														formik.values.currency
															.id
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'currency.id',
									value?.value ?? ''
								);
								formik.setFieldValue(
									'exchangeRate',
									value.exchangeRate
								);
								formik.setFieldValue(
									'exchangeRateTC',
									value.exchangeRate
								);
							}}
							options={currencyOpt}
							name="choices-single-default"
							id="currency"
						/>
						{formik.errors.currency?.id && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.currency.id}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="exchangeRate"
						>
							Tipo de cambio
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.exchangeRate ? 'is-invalid' : ''
							}`}
							id="exchangeRate"
							name="exchangeRate"
							onChange={(e) => {
								formik.setFieldValue(
									'exchangeRate',
									e.target.value
								);
								formik.setFieldValue(
									'exchangeRateTC',
									e.target.value
								);
							}}
							onBlur={formik.handleBlur}
							value={formik.values.exchangeRate}
						/>
						{formik.errors.exchangeRate && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.exchangeRate}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="idInvoice">
							{t('invoice')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.idInvoice ? 'is-invalid' : ''
							}`}
							id="idInvoice"
							name="idInvoice"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.idInvoice}
						/>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="amountMXN">
							{t('amount')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.amountMXN ? 'is-invalid' : ''
							}`}
							id="amountMXN"
							name="amountMXN"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.amountMXN}
						/>
						{formik.errors.amountMXN && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.amountMXN}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="amount">
							{t('amount')} (USD)
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.amount ? 'is-invalid' : ''
							}`}
							id="amount"
							name="amount"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.amount}
						/>
						{formik.errors.amount && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.amount}
							</FormFeedback>
						)}
					</div>
				</Col>
			</Row>

			{isCreating && (
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

			{!isCreating && (
				<div className="d-flex my-3">
					<Button type="submit" color="primary" className="me-2">
						{t('accept')}
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

export default FormPaymentClient;
