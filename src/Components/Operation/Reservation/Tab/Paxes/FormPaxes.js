import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import DatePicker from '../../../../Common/DatePicker';
import {
	ERROR_SERVER,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import moment from 'moment';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import {
	createPaxService,
	updatePaxService,
} from '../../../../../services/pax';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import calcAge from '../../../../../util/calcAge';
import DisabledInput from '../../../../Controller/DisabledInput';
import Select from 'react-select';

const FormPaxes = ({
	toggleDialog,
	pax = null,
	reservationId,
	refetchPaxs,
	dataRelationships,
}) => {
	const dispatch = useDispatch();
	const [fechaNacimiento, setFechaNacimiento] = useState(
		pax?.fechadnacimiento
			? moment(pax?.fechadnacimiento, 'YYYY-MM-DD').toDate()
			: null
	);

	//create pax
	const {
		mutate: createItem,
		isLoading: isCreating,
		isError: isErrorCreating,
		error: errorCreating,
		isSuccess: isSuccessCreating,
	} = useMutation(createPaxService);

	useEffect(() => {
		if (isSuccessCreating) {
			dispatch(
				addMessage({
					type: 'success',
					message: SAVE_SUCCESS,
				})
			);
			toggleDialog();
			refetchPaxs();
		} else if (isErrorCreating) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(errorCreating, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [isSuccessCreating, isErrorCreating, dispatch, errorCreating]);

	//update pax
	const {
		mutate: updateItem,
		isLoading: isUpdating,
		isError: isErrorUpdating,
		error: errorUpdating,
		isSuccess: isSuccessUpdating,
	} = useMutation(updatePaxService);

	useEffect(() => {
		if (isSuccessUpdating) {
			dispatch(
				addMessage({
					type: 'success',
					message: UPDATE_SUCCESS,
				})
			);
			toggleDialog();
			refetchPaxs();
		} else if (isErrorUpdating) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(errorUpdating, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [isSuccessUpdating, isErrorUpdating, dispatch, errorUpdating]);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: pax?.id ?? '',
			firstName: pax?.firstName ?? '',
			lastName: pax?.lastName ?? '',
			fechadnacimiento: pax?.fechadnacimiento ?? '',
			age:
				pax?.age ?? pax?.fechadnacimiento
					? calcAge(moment(pax?.fechadnacimiento))
					: '',
			relation: pax?.relation,
			occupation: pax?.occupation ?? '',
			reservation: reservationId,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required(FIELD_REQUIRED),
			lastName: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'fechadnacimiento') {
					data[key] = moment(values.fechadnacimiento).format(
						'YYYY-MM-DD'
					);
				} else {
					data[key] = value;
				}
			});
			if (values.id) {
				//updating existing one
				updateItem({
					idPax: values.id,
					reservationId: reservationId,
					body: data,
				});
			} else {
				//creating one
				createItem({ body: data });
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
			<Row>
				<Col lg={12}>
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
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Apellidos
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
				<Col lg={8}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Fecha nacimiento
						</Label>
						<DatePicker
							id="fechaLlegada"
							date={fechaNacimiento}
							onChangeDate={(value) => {
								setFechaNacimiento(value[0]);
								if (value.length > 0) {
									formik.setFieldValue(
										`fechadnacimiento`,
										value[0]
									);
									const fecha = moment(value[0]).format(
										'YYYY/MM/DD'
									);
									formik.setFieldValue('age', calcAge(fecha));
								} else {
									formik.setFieldValue(
										`fechadnacimiento`,
										null
									);
									formik.setFieldValue('age', '');
								}
							}}
						/>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="age">
							Edad
						</Label>
						<DisabledInput value={formik.values.age} />
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Ocupación
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.occupation ? 'is-invalid' : ''
							}`}
							id="occupation"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.occupation}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Relación
						</Label>
						<Select
							value={
								formik.values.relation
									? {
											value: formik.values.relation,
											label:
												dataRelationships.find(
													(item) =>
														item.value ===
														formik.values.relation
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue('relation', value.value);
							}}
							options={dataRelationships}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
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

export default FormPaxes;
