import {
	Accordion,
	AccordionItem,
	Button,
	Col,
	Collapse,
	Form,
	FormFeedback,
	Label,
	Row,
} from 'reactstrap';
import Select from 'react-select';
import {
	ERROR_SERVER,
	FIELD_GREATER_THAN_CERO,
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import { Field, FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useMutation, useQuery } from 'react-query';
import DatePicker from '../../../../Common/DatePicker';
import { getSubServices } from '../../../../../helpers/subService';
import {
	createContractService,
	updateService,
} from '../../../../../helpers/contractService';
import { useEffect, useState } from 'react';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import useUser from '../../../../../hooks/useUser';
import moment from 'moment';
import classNames from 'classnames';
import { addIconClass } from '../../../../constants/icons';
import { useTranslation } from 'react-i18next';

const FormService = ({
	toggleDialog,
	service = null,
	ReservationId,
	reservation,
	refetchServices,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formService',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const user = useUser();
	const dispatch = useDispatch();
	const [openAccordion, setOpenAccordion] = useState('-1');
	const [activation, setActivation] = useState(
		service?.activation
			? moment(service?.activation, 'YYYY-MM-DD').toDate()
			: null
	);
	const { data } = useQuery(
		['getSubServices', ReservationId],
		async () => {
			const response = await getSubServices('?max=1000');
			return response;
		},
		{
			keepPreviousData: true,
			select: (response) => response.data.list,
		}
	);
	const {
		mutate: createService,
		isLoading: isCreating,
		isError: isErrorCreating,
		error: errorCreating,
		isSuccess: isSuccessCreating,
	} = useMutation(createContractService);

	const {
		mutate: updateItem,
		isLoading: isUpdating,
		isError: isErrorUpdating,
		error: errorUpdating,
		isSuccess: isSuccessUpdating,
	} = useMutation(updateService);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: service?.idService
			? {
					services: [
						{
							// idService: service?.idService ?? '',
							subService: service?.subService?.id ?? '',
							idBooking: reservation?.booking ?? '',
							// quantity: service?.quantity ?? '',
							pax: service?.pax ?? 0,
							amount: service?.amount ?? 0,
							description: service?.description ?? '',
							childs: service?.childs ?? 0,
							user: service?.user ?? user?.usuario,
							// activation: service?.activation ?? null,
							nights: service?.quantity ?? '',
							// certificateNumber: reservation?.confirm ?? '',
							// commission: 0,
							// "userComission": "",
							confirmation: reservation.confirm,
							// "location": "Isla Mujeres",
							// folioDolphin: service?.folioDolphin,
							// "idPromotion": 123,
							reservation: reservation.id,
							services: [],
						},
					],
			  }
			: {
					services: [],
			  },
		validationSchema: Yup.object({
			services: Yup.array()
				.of(
					Yup.object().shape({
						subService: Yup.string().required(
							tMessage(FIELD_REQUIRED)
						),
						pax: Yup.number()
							.min(1, tMessage(FIELD_GREATER_THAN_CERO))
							.integer(tMessage(FIELD_INTEGER))
							.typeError(tMessage(FIELD_NUMERIC))
							.required(tMessage(FIELD_REQUIRED)),
						// quantity: Yup.number()
						// 	.min(1, tMessage(FIELD_GREATER_THAN_CERO))
						// 	.integer(tMessage(FIELD_INTEGER))
						// 	.typeError(tMessage(FIELD_NUMERIC))
						// 	.required(tMessage(FIELD_REQUIRED)),
						childs: Yup.number()
							.min(0, tMessage(FIELD_POSITIVE))
							.integer(tMessage(FIELD_INTEGER))
							.typeError(tMessage(FIELD_NUMERIC))
							.required(tMessage(FIELD_REQUIRED)),
						amount: Yup.number()
							.min(0, tMessage(FIELD_POSITIVE))
							.integer(tMessage(FIELD_INTEGER))
							.typeError(tMessage(FIELD_NUMERIC))
							.required(tMessage(FIELD_REQUIRED)),
					})
				)
				.min(1, 'Al menos debes crear 1 servicio'),
		}),
		onSubmit: async (values) => {
			//submit request
			const parsedServices = [];
			values.services.forEach((it) => {
				const data = {};
				Object.entries(removetEmptyObject(it)).forEach((entry) => {
					const [key, value] = entry;
					if (key === 'activation') {
						data[key] = moment(values.activation).format(
							'YYYY-MM-DD'
						);
					} else {
						data[key] = value;
					}
				});
				parsedServices.push(data);
			});

			if (values.idService) {
				//updating existing one
				updateItem({
					idBooking: reservation.booking,
					isService: values.idService,
					body: data,
				});
			} else {
				//creating one
				createService({ services: parsedServices });
			}
		},
	});
	useEffect(() => {
		if (isSuccessCreating || isSuccessUpdating) {
			dispatch(
				addMessage({
					type: 'success',
					message: isSuccessCreating
						? tMessage(SAVE_SUCCESS)
						: tMessage(UPDATE_SUCCESS),
				})
			);
			toggleDialog();
			refetchServices();
		} else if (isErrorCreating || isErrorUpdating) {
			let message = tMessage(ERROR_SERVER);
			let serverError = isErrorCreating ? errorCreating : errorUpdating;
			message = extractMeaningfulMessage(serverError, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [
		isSuccessCreating,
		isErrorCreating,
		dispatch,
		errorCreating,
		isUpdating,
		isErrorUpdating,
		errorUpdating,
		isSuccessUpdating,
	]);

	const populateValues = (value, index) => {
		const selectedValue = data.find((it) => it.id === value.value);
		console.log(selectedValue);
		formik.setFieldValue(
			`services.${index}.pax`,
			selectedValue?.adults ?? 0
		);
		formik.setFieldValue(
			`services.${index}.childs`,
			selectedValue?.children ?? 0
		);
		formik.setFieldValue(
			`services.${index}.amount`,
			selectedValue?.price ?? 0
		);
		formik.setFieldValue(
			`services.${index}.nights`,
			selectedValue?.nights ?? 0
		);
	};
	const addService = () => {
		const newService = {
			idService: '',
			subService: '',
			idBooking: reservation?.booking ?? '',
			quantity: '',
			pax: '',
			amount: 0,
			description: '',
			childs: '',
			user: user?.usuario,
			activation: null,
			nights: '',
			// certificateNumber: reservation?.confirm ?? '',
			// commission: 0,
			// "userComission": "",
			confirmation: reservation.confirm,
			// "location": "Isla Mujeres",
			folioDolphin: '',
			// "idPromotion": 123,
			reservation: reservation.id,
		};
		const copyServices = [];
		copyServices.push(newService);
		formik.setFieldValue('services', copyServices);
		setOpenAccordion('1');
	};

	useEffect(() => {
		setOpenAccordion(`${formik.values.services.length}`);
	}, [formik.values.services.length]);

	if (formik.values.services.length === 0) {
		return (
			<Row>
				<Col xs="12">
					<div className="d-flex justify-content-center align-items-center bg-light p-5 mb-2">
						<Button
							type="button"
							color="secondary"
							className="d-flex align-items-center"
							onClick={addService}
						>
							<i className={`fs-5 ${addIconClass}`} /> {t('add')}
						</Button>
					</div>
				</Col>
			</Row>
		);
	}

	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<Accordion id="default-accordion-example" flush>
				<FormikProvider value={formik}>
					<FieldArray
						name="services"
						render={(arrayHelper) => (
							<>
								{formik.values.services.map((it, idx) => (
									<AccordionItem>
										<h2
											className="accordion-header"
											id={`heading-${idx}`}
										>
											<button
												className={
													`ps-0 ` +
													classNames(
														'accordion-button',
														{
															collapsed:
																openAccordion ===
																`${idx + 1}`,
														}
													)
												}
												type="button"
												onClick={() => {
													if (
														openAccordion ===
														`${idx + 1}`
													) {
														setOpenAccordion('-1');
													} else {
														setOpenAccordion(
															`${idx + 1}`
														);
													}
												}}
												style={{ cursor: 'pointer' }}
											>
												<div className="d-flex flex-grow-1">
													<div className="d-flex flex-column me-auto">
														{openAccordion !==
															`${idx + 1}` && (
															<>
																<h5 className="text-primary m-0">
																	Tipo
																</h5>
																<p className="m-0">
																	{data?.find(
																		(
																			item
																		) =>
																			item.id ===
																			formik
																				.values
																				.services[
																				idx
																			]
																				.subService
																	)?.name ??
																		'No disponible'}
																</p>
															</>
														)}
													</div>
													{!service?.idService && (
														<Button
															size="sm"
															color="danger"
															type="button"
															className="me-2"
															onClick={(e) => {
																e.stopPropagation();
																e.preventDefault();
																arrayHelper.remove(
																	idx
																);
															}}
														>
															Eliminar
														</Button>
													)}
												</div>
											</button>
										</h2>
										<Collapse
											isOpen={
												openAccordion === `${idx + 1}`
											}
											className="accordion-collapse "
											id={`collapse-${idx}`}
										>
											<div className="accordion-body px-0">
												<Row>
													<Col lg={12}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="service"
															>
																{t('type')}
															</Label>
															<Select
																value={
																	formik
																		.values
																		.services[
																		idx
																	].subService
																		? {
																				value: formik
																					.values
																					.services[
																					idx
																				]
																					.subService,
																				label:
																					data?.find(
																						(
																							item
																						) =>
																							item.id ===
																							formik
																								.values
																								.services[
																								idx
																							]
																								.subService
																					)
																						?.name ??
																					'',
																		  }
																		: null
																}
																onChange={(
																	value
																) => {
																	formik.setFieldValue(
																		`services.${idx}.subService`,
																		value.value,
																		true
																	);
																	populateValues(
																		value,
																		idx
																	);
																}}
																options={data?.map(
																	(it) => ({
																		value: it.id,
																		label: it.name,
																		description:
																			it.description,
																	})
																)}
																classNamePrefix="select2-selection"
																placeholder={tMessage(
																	SELECT_OPTION
																)}
															/>
															{formik.errors
																.services &&
																formik.errors
																	.services[
																	idx
																]
																	?.subService && (
																	<FormFeedback
																		type="invalid"
																		className="d-block"
																	>
																		{
																			formik
																				.errors
																				.services[
																				idx
																			]
																				.subService
																		}
																	</FormFeedback>
																)}
														</div>
													</Col>
													<Col lg={3}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nights"
															>
																{t('days')}
															</Label>
															<Field
																className={`form-control ${
																	formik
																		.errors
																		.services &&
																	formik
																		.errors
																		.services[
																		idx
																	]?.nights
																		? 'is-invalid'
																		: ''
																}`}
																name={`services.${idx}.nights`}
															/>
															{formik.errors
																.services &&
																formik.errors
																	.services[
																	idx
																]?.nights && (
																	<FormFeedback
																		type="invalid"
																		className="d-block"
																	>
																		{
																			formik
																				.errors
																				.services[
																				idx
																			]
																				.nights
																		}
																	</FormFeedback>
																)}
														</div>
													</Col>
													<Col lg={3}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nombre"
															>
																{t('adults')}
															</Label>
															<Field
																className={`form-control ${
																	formik
																		.errors
																		.services &&
																	formik
																		.errors
																		.services[
																		idx
																	]?.pax
																		? 'is-invalid'
																		: ''
																}`}
																name={`services.${idx}.pax`}
															/>
															{formik.errors
																.services &&
																formik.errors
																	.services[
																	idx
																]?.pax && (
																	<FormFeedback
																		type="invalid"
																		className="d-block"
																	>
																		{
																			formik
																				.errors
																				.services[
																				idx
																			]
																				.pax
																		}
																	</FormFeedback>
																)}
														</div>
													</Col>
													<Col lg={3}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nombre"
															>
																{t('children')}
															</Label>
															<Field
																className={`form-control ${
																	formik
																		.errors
																		.services &&
																	formik
																		.errors
																		.services[
																		idx
																	]?.childs
																		? 'is-invalid'
																		: ''
																}`}
																name={`services.${idx}.childs`}
															/>
															{formik.errors
																.services &&
																formik.errors
																	.services[
																	idx
																]?.childs && (
																	<FormFeedback
																		type="invalid"
																		className="d-block"
																	>
																		{
																			formik
																				.errors
																				.services[
																				idx
																			]
																				.childs
																		}
																	</FormFeedback>
																)}
														</div>
													</Col>
													<Col lg={3}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nombre"
															>
																{t('amount')}
															</Label>
															<Field
																className={`form-control ${
																	formik
																		.errors
																		.services &&
																	formik
																		.errors
																		.services[
																		idx
																	]?.amount
																		? 'is-invalid'
																		: ''
																}`}
																name={`services.${idx}.amount`}
															/>
															{formik.errors
																.services &&
																formik.errors
																	.services[
																	idx
																]?.amount && (
																	<FormFeedback
																		type="invalid"
																		className="d-block"
																	>
																		{
																			formik
																				.errors
																				.services[
																				idx
																			]
																				.amount
																		}
																	</FormFeedback>
																)}
														</div>
													</Col>
													<Col lg={6}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nombre"
															>
																{t('promotion')}
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
													<Col lg={6}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="activation"
															>
																{t('useDate')}
															</Label>
															<DatePicker
																id="activation"
																date={
																	formik
																		.values
																		.services[
																		idx
																	].activation
																}
																onChangeDate={(
																	value
																) => {
																	setActivation(
																		value[0]
																	);
																	if (
																		value.length >
																		0
																	) {
																		formik.setFieldValue(
																			`services.${idx}.activation`,
																			value[0]
																		);
																	} else {
																		formik.setFieldValue(
																			`services.${idx}.activation`,
																			null
																		);
																	}
																}}
															/>
														</div>
													</Col>
													<Col lg={12}>
														<div className="mb-2">
															<Label
																className="form-label mb-0"
																htmlFor="nombre"
															>
																{t('note')}
															</Label>
															<textarea
																id="description"
																name="description"
																className={`form-control`}
																onChange={(e) =>
																	formik.setFieldValue(
																		`services.${idx}.description`,
																		e.target
																			.value
																	)
																}
																value={
																	formik
																		.values
																		.services[
																		idx
																	]
																		.description
																}
																rows={5}
															/>
														</div>
													</Col>
												</Row>
											</div>
										</Collapse>
									</AccordionItem>
								))}
								{isCreating || isUpdating ? (
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
													className:
														'btn-soft-danger',
													loader: false,
												},
											]}
										/>
									</div>
								) : (
									<div className="d-flex mt-3">
										<Button
											type="submit"
											color="primary"
											className="me-2"
										>
											{t('accept')}
										</Button>
										{!service?.idService && (
											<Button
												type="button"
												color="outline-primary"
												className="me-2"
												onClick={(e) => {
													arrayHelper.push({
														idService: '',
														subService: '',
														idBooking:
															reservation?.booking ??
															'',
														quantity: '',
														pax: '',
														amount: 0,
														description: '',
														childs: '',
														user: user?.usuario,
														activation: null,
														nights: '',
														confirmation:
															reservation.confirm,
														folioDolphin: '',
														reservation:
															reservation.id,
													});
												}}
											>
												{t('addAnother')}
											</Button>
										)}
										<Button
											type="button"
											color="danger"
											className="btn-soft-danger"
											onClick={
												toggleDialog
													? toggleDialog
													: () => {}
											}
										>
											{t('cancel')}
										</Button>
									</div>
								)}
							</>
						)}
					/>
				</FormikProvider>
			</Accordion>
		</Form>
	);
};

export default FormService;
