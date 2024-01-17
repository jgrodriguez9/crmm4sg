import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import DatePicker from '../../../../Common/DatePicker';
import { SELECT_OPTION } from '../../../../constants/messages';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import moment from 'moment';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import calcAge from '../../../../../util/calcAge';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const FormTransportacion = ({
	toggleDialog,
	item = null,
	reservationId,
	refetch,
}) => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();

	//create transportation

	//update transportation

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: item?.id ?? '',
		},
		validationSchema: Yup.object(),
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
			console.log(data);
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
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Origen
						</Label>
						<Select
							value={null}
							onChange={(value) => {
								formik.setFieldValue(
									'relation.id',
									value.value
								);
							}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Destino
						</Label>
						<Select
							value={null}
							onChange={(value) => {
								formik.setFieldValue(
									'relation.id',
									value.value
								);
							}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Fecha de recogida
						</Label>
						<DatePicker
							id="fechaLlegada"
							date={null}
							onChangeDate={(value) => {
								// setFechaNacimiento(value[0]);
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
				<Col xs="6" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Hora
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
					</div>
				</Col>
				<Col xs="6" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Minutos
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
					</div>
				</Col>
				<Col xs="12" md="6">
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
				<Col xs="12" md="6">
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
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Tipo
						</Label>
						<Select
							value={null}
							onChange={(value) => {
								formik.setFieldValue(
									'relation.id',
									value.value
								);
							}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="4" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Adultos
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
				<Col xs="4" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Menores
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
				<Col xs="4" md="2">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Infantes
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
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Aerolínea
						</Label>
						<Select
							value={null}
							onChange={(value) => {
								formik.setFieldValue(
									'relation.id',
									value.value
								);
							}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Número de vuelo
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
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="relation">
							Categoría
						</Label>
						<Select
							value={null}
							onChange={(value) => {
								formik.setFieldValue(
									'relation.id',
									value.value
								);
							}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="6">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Punto de encuentro
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
				<Col xs="12" md="12">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="occupation">
							Observación
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

			<hr className="text-muted" />

			<div className="d-flex flex-row align-items-center">
				<label className="me-2 mb-0">Total</label>
				<span className="text-primary fs-4">$0.00</span>
			</div>

			{false ? (
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

export default FormTransportacion;
