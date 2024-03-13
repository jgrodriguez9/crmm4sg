import Select from 'react-select';
import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	EMAIL_SUCCESS,
	ERROR_SERVER,
	FIELD_REQUIRED,
	SELECT_OPTION,
} from '../../../../constants/messages';
import { useMutation } from 'react-query';
import {
	getPreviewEmailTemplate,
	getTemplateEmailByUser,
	sendExternalEmail,
} from '../../../../../helpers/external/email';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { useTranslation } from 'react-i18next';
import useUser from '../../../../../hooks/useUser';
import { useEffect, useMemo, useState } from 'react';
import { languageOpt } from '../../../../constants/utils';
import Loader from '../../../../Common/Loader';
import AlertMessage from '../../../../Common/AlertMessage';

const FormMaketingMailClient = ({
	customerId,
	closeModal,
	emailTo,
	booking,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formMaketingMailClient',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const { t: tMConstant } = useTranslation('translation', {
		keyPrefix: 'constants.language',
	});
	const dispatch = useDispatch();
	const user = useUser();
	const [templatesOpt, setTemplatesOpt] = useState([]);
	const [lang, setLang] = useState(null);
	const [templateSelected, setTemplateSelected] = useState(null);
	const [previewTemplate, setPreviewTemplate] = useState(null);
	const { mutate: getTemplates } = useMutation(getTemplateEmailByUser, {
		onSuccess: (result) => {
			setTemplatesOpt(result);
		},
		onError: (error) => {
			setTemplatesOpt([]);
		},
	});
	useEffect(() => {
		if (user?.usuario) {
			getTemplates({ user: user.usuario });
		}
	}, [user?.usuario]);

	const templatesFiltered = useMemo(() => {
		if (templatesOpt.length > 0 && lang) {
			return templatesOpt
				.filter((it) => it.lenguaje === lang.value)
				.map((it) => ({
					value: it.plantillaid,
					label: it.plantillaname,
					...it,
				}));
		}
		return [];
	}, [templatesOpt, lang]);

	//preview temlpate
	const {
		mutate: getPreviewTemplate,
		isLoading: isPreviewing,
		isError: isErrorPreview,
	} = useMutation(getPreviewEmailTemplate, {
		onSuccess: (result) => {
			setPreviewTemplate(result);
			formik.setFieldValue('message', result);
		},
		onError: (error) => {
			setPreviewTemplate(null);
		},
	});
	//send sms
	const { mutate: sendEmail, isLoading: isSendingEmail } = useMutation(
		sendExternalEmail,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(EMAIL_SUCCESS),
					})
				);
				closeModal();
			},
			onError: (error) => {
				let message = tMessage(ERROR_SERVER);
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
			customer: customerId,
			subject: '',
			message: '',
			userName: user?.usuario,
		},
		validationSchema: Yup.object({
			to: Yup.string().required(tMessage(FIELD_REQUIRED)),
			subject: Yup.string().required(tMessage(FIELD_REQUIRED)),
			message: Yup.string().required(tMessage(FIELD_REQUIRED)),
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
			{!booking && (
				<AlertMessage
					color="warning"
					textColor="text-warning"
					message={t('missingBooking')}
				/>
			)}
			<Row>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="tipo">
							{t('receiver')}
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
							{t('language')}
						</Label>
						<Select
							id="motivo"
							className="mb-0"
							value={lang}
							onChange={(value) => setLang(value)}
							options={languageOpt.map((it) => ({
								...it,
								label: tMConstant(it.label),
							}))}
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col lg={8}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="motivo">
							{t('template')}
						</Label>
						<Select
							id="motivo"
							className="mb-0"
							value={templateSelected}
							onChange={(value) => {
								setTemplateSelected(value);
								formik.setFieldValue('subject', value.label);
								const body = {
									sale: booking,
									template: value.value,
									customer: customerId,
									user: user.usuario,
								};
								getPreviewTemplate(body);
							}}
							options={templatesFiltered}
							placeholder={tMessage(SELECT_OPTION)}
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
					{isPreviewing && <Loader />}
					{!isPreviewing && previewTemplate && (
						<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
							<div
								dangerouslySetInnerHTML={{
									__html: previewTemplate,
								}}
							></div>
						</div>
					)}
					{!isPreviewing && isErrorPreview && (
						<AlertMessage
							color="danger"
							textColor="text-danger"
							message={t('failLoadTemplate')}
						/>
					)}
					{!isPreviewing && !isErrorPreview && !previewTemplate && (
						<AlertMessage
							color="info"
							textColor="text-info text-center"
							message={t('selectTemplate')}
						/>
					)}
				</Col>
			</Row>
			{isSendingEmail ? (
				<div className="d-flex mt-3">
					<ButtonsLoader
						buttons={[
							{
								text: t('send'),
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
				<div className="d-flex mt-3">
					<Button
						type="submit"
						color="primary"
						className="me-2"
						disabled={!booking}
					>
						{t('send')}
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={closeModal}
					>
						{t('cancel')}
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormMaketingMailClient;
