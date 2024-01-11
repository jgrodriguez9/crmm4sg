import Select from 'react-select';
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import template from '../../../../../common/data/template';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	EMAIL_SUCCESS,
	ERROR_SERVER,
	FIELD_REQUIRED,
} from '../../../../constants/messages';
import { useMutation } from 'react-query';
import { sendExternalEmail } from '../../../../../helpers/external/email';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';

const FormMaketingMailClient = ({ closeModal, emailTo }) => {
	const dispatch = useDispatch();
	//send sms
	const { mutate: sendEmail, isLoading: isSendingEmail } = useMutation(
		sendExternalEmail,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: EMAIL_SUCCESS,
					})
				);
				closeModal();
			},
			onError: (error) => {
				let message = ERROR_SERVER;
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						type: 'error',
						message: message,
					})
				);
			},
		}
	);
	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			to: emailTo,
			subjectId: '',
			subject: '',
			message: '',
		},
		validationSchema: Yup.object({
			to: Yup.string().required(FIELD_REQUIRED),
			subject: Yup.string().required(FIELD_REQUIRED),
			message: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			sendEmail(values);
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
					<div className="mb-3">
						<Label className="form-label" htmlFor="tipo">
							Receptor
						</Label>
						<Input
							className="form-control"
							type="text"
							id="booking"
							value={formik.values.to}
							onChange={(e) =>
								formik.setFieldValue('to', e.target.value)
							}
						/>
						{formik.errors.to && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.to}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="motivo">
							Idioma
						</Label>
						<Select
							id="motivo"
							className="mb-0"
							value={null}
							onChange={() => {}}
							options={[{ value: 'ES', label: 'Español' }]}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col lg={8}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="motivo">
							Template
						</Label>
						<Select
							id="motivo"
							className="mb-0"
							value={
								formik.values.subjectId
									? {
											value: formik.values.subjectId,
											label: 'Paquete Cancún EP 5/4 ES',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue('subjectId', value.value);
								formik.setFieldValue('subject', value.label);
								formik.setFieldValue('message', value.template);
							}}
							options={[
								{
									value: '1',
									label: 'Paquete Cancún EP 5/4 ES',
									template: template,
								},
							]}
							placeholder="Seleccionar opción"
						/>
						{formik.errors.subject && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.subject}
							</FormFeedback>
						)}
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
						<div
							dangerouslySetInnerHTML={{ __html: template }}
						></div>
					</div>
				</Col>
			</Row>
			{isSendingEmail ? (
				<div className="d-flex mt-3">
					<ButtonsLoader
						buttons={[
							{
								text: 'Enviar',
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
						Enviar
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={() => {}}
					>
						Cancelar
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormMaketingMailClient;
