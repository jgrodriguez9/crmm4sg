import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import DatePicker from '../../../../Common/DatePicker';
import Select from 'react-select';
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
import { createPax, updatePax } from '../../../../../helpers/pax';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import { useState } from 'react';

const FormPaxes = ({
	toggleDialog,
	pax = null,
	reservationId,
	refetchPaxs,
}) => {
	const dispatch = useDispatch();
	const [fechaNacimiento, setFechaNacimiento] = useState(
		pax?.fechadnacimiento
			? moment(pax?.fechadnacimiento, 'YYYY-MM-DD').toDate()
			: null
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: pax?.id ?? '',
			firstName: pax?.firstName ?? '',
			lastName: pax?.lastName ?? '',
			fechadnacimiento: pax?.fechadnacimiento ?? '',
			age: pax?.age ?? '',
			relation: pax?.relation ?? '',
			occupation: pax?.occupation ?? '',
			reservation: reservationId,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required(FIELD_REQUIRED),
			lastName: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			try {
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
					let response = await updatePax(
						values.id,
						reservationId,
						data
					);
					if (response) {
						dispatch(
							addMessage({
								type: 'success',
								message: UPDATE_SUCCESS,
							})
						);
						toggleDialog();
						refetchPaxs();
					} else {
						dispatch(
							addMessage({
								type: 'error',
								message: ERROR_SERVER,
							})
						);
					}
				} else {
					//creating one
					let response = await createPax(data);
					if (response) {
						dispatch(
							addMessage({
								type: 'success',
								message: SAVE_SUCCESS,
							})
						);
						toggleDialog();
						refetchPaxs();
					} else {
						dispatch(
							addMessage({
								type: 'error',
								message: ERROR_SERVER,
							})
						);
					}
				}
			} catch (error) {
				let message = ERROR_SERVER;
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						type: 'error',
						message: message,
					})
				);
			}
		},
	});
	console.log(formik.values);
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
								} else {
									formik.setFieldValue(
										`fechadnacimiento`,
										null
									);
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
						<Input
							type="text"
							className={`form-control ${
								formik.errors.age ? 'is-invalid' : ''
							}`}
							id="age"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.age}
						/>
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
						<Input
							type="text"
							className={`form-control ${
								formik.errors.relation ? 'is-invalid' : ''
							}`}
							id="relation"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.relation}
						/>
					</div>
				</Col>
			</Row>

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
		</Form>
	);
};

export default FormPaxes;
