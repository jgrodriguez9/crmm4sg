import { useFormik } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import { Button, Col, Form, FormFeedback, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import {
	ERROR_SERVER,
	FIELD_MAX_LENGTH,
	FIELD_REQUIRED,
	SELECT_OPTION,
	SMS_SUCCESS,
} from '../../../../constants/messages';
import useUser from '../../../../../hooks/useUser';
import { useMutation } from 'react-query';
import { sendExternalSms } from '../../../../../helpers/external/sms';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';

const FormSMS = ({ phonesOpt, customerId, closeModal }) => {
	const dispatch = useDispatch();
	const user = useUser();
	const [smsPredefined, setSmsPredefined] = useState(null);

	//send sms
	const { mutate: sendSms, isLoading: isSendingSms } = useMutation(
		sendExternalSms,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: SMS_SUCCESS,
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
			customer: customerId,
			message: '',
			user: 'AGENTE_RVAS', // user?.username ?? '',
			phone: '',
		},
		validationSchema: Yup.object({
			customer: Yup.string().required(FIELD_REQUIRED),
			message: Yup.string()
				.max(160, `${FIELD_MAX_LENGTH} 160`)
				.required(FIELD_REQUIRED),
			user: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			sendSms(values);
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
						<Label className="form-label mb-0" htmlFor="nota">
							Número
						</Label>
						<Select
							id="phone"
							className="mb-0"
							value={
								formik.values.phone
									? {
											value: formik.values.phone,
											label:
												phonesOpt.find(
													(it) =>
														it.value ===
														formik.values.phone
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) =>
								formik.setFieldValue('phone', value.value)
							}
							options={phonesOpt}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				{/* <Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="motivo">
							Idioma
						</Label>
						<Select
							id="motivo"
							className="mb-0"
							value={{ value: 'ES', label: 'Español' }}
							onChange={() => {}}
							options={[{ value: 'ES', label: 'Español' }]}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col> */}
				<Col lg={12}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="smsPredefined"
						>
							Mensaje
						</Label>
						<Select
							id="smsPredefined"
							className="mb-0"
							value={smsPredefined}
							onChange={(value) => {
								setSmsPredefined(value);
								if (value)
									formik.setFieldValue(
										'message',
										value.message
									);
								else formik.setFieldValue('message', '');
							}}
							isClearable
							options={[
								{
									value: '1',
									label: 'Black Friday',
									message: 'Black Friday message',
								},
								{
									value: '2',
									label: 'Oferta Verano 60%',
									message: 'Oferta Verano 60% message',
								},
							]}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<textarea
						id="message"
						name="message"
						disabled={smsPredefined}
						className={`form-control ${
							formik.errors.message ? 'is-invalid' : ''
						}`}
						value={formik.values.message}
						onChange={(e) =>
							formik.setFieldValue('message', e.target.value)
						}
						rows={5}
					/>
					{formik.errors.message && (
						<FormFeedback type="invalid" className="d-block">
							{formik.errors.message}
						</FormFeedback>
					)}
				</Col>
			</Row>
			{isSendingSms ? (
				<div className="d-flex my-3">
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

export default FormSMS;
