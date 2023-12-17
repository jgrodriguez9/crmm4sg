import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useMutation, useQuery } from 'react-query';
import DatePicker from '../../../../Common/DatePicker';
import { getSubServices } from '../../../../../helpers/subService';
import {
	createContractService,
	updateService,
} from '../../../../../helpers/contractService';
import { useEffect } from 'react';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';

const FormService = ({
	toggleDialog,
	service = null,
	ReservationId,
	reservation,
	refetchServices,
}) => {
	const dispatch = useDispatch();
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
		initialValues: {
			idService: service?.idService ?? '',
			subService: service?.subService?.id ?? '',
			idBooking: reservation?.booking ?? '',
			quantity: service?.quantity ?? '',
			pax: service?.pax ?? 2,
			amount: service?.amount ?? 0,
			description: service?.description ?? '',
			childs: service?.childs ?? 0,
			// certificateNumber: reservation?.confirm ?? '',
			// commission: 0,
			// "userComission": "",
			confirmation: reservation.confirm,
			// "location": "Isla Mujeres",
			folioDolphin: service?.folioDolphin,
			// "idPromotion": 123,
			reservation: reservation.id,
		},
		validationSchema: Yup.object({
			subService: Yup.string().required(FIELD_REQUIRED),
			pax: Yup.number()
				.min(1, FIELD_GREATER_THAN_CERO)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			childs: Yup.number()
				.min(0, FIELD_POSITIVE)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
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
				updateItem({
					idBooking: reservation.booking,
					isService: values.idService,
					body: data,
				});
			} else {
				//creating one
				createService(data);
			}
		},
	});
	useEffect(() => {
		if (isSuccessCreating || isSuccessUpdating) {
			dispatch(
				addMessage({
					type: 'success',
					message: isSuccessCreating ? SAVE_SUCCESS : UPDATE_SUCCESS,
				})
			);
			toggleDialog();
			refetchServices();
		} else if (isErrorCreating || isErrorUpdating) {
			let message = ERROR_SERVER;
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

	const populateValues = (value) => {
		const selectedValue = data.find((it) => it.id === value.value);
		formik.setFieldValue('pax', selectedValue?.adults ?? 0);
		formik.setFieldValue('childs', selectedValue?.children ?? 0);
		formik.setFieldValue('amount', selectedValue?.price ?? 0);
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
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="service">
							Tipo
						</Label>
						<Select
							value={
								formik.values.subService
									? {
											value: formik.values.subService,
											label:
												data?.find(
													(item) =>
														item.id ===
														formik.values.subService
												)?.name ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'subService',
									value.value,
									true
								);
								populateValues(value);
							}}
							options={data?.map((it) => ({
								value: it.id,
								label: it.name,
								description: it.description,
							}))}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
						{formik.errors.subService && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.subService}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Días
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.pax ? 'is-invalid' : ''
							}`}
							id="pax"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.pax}
						/>
						{formik.errors.pax && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.pax}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Adultos
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.pax ? 'is-invalid' : ''
							}`}
							id="pax"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.pax}
						/>
						{formik.errors.pax && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.pax}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Menores
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.childs ? 'is-invalid' : ''
							}`}
							id="childs"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.childs}
						/>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Importe
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.amount ? 'is-invalid' : ''
							}`}
							id="amount"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.amount}
						/>
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Promoción
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
						<Label className="form-label mb-0" htmlFor="nombre">
							Fecha de uso
						</Label>
						<DatePicker
							id="fechaLlegada"
							date={null}
							onChangeDate={() => {}}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Nota
						</Label>
						<textarea
							id="description"
							name="description"
							className={`form-control`}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
							rows={5}
						/>
					</div>
				</Col>
			</Row>

			{isCreating || isUpdating ? (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: 'Aceptar',
								color: 'primary',
								className: 'me-2',
								loader: true,
							},
							{
								text: 'Cancelar',
								color: 'danger',
								className: 'btn-soft-danger',
								loader: false,
							},
						]}
					/>
				</div>
			) : (
				<div className="d-flex mt-3">
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
			)}
		</Form>
	);
};

export default FormService;
