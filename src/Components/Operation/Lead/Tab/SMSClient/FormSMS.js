import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { sendExternalSms } from '../../../../../helpers/external/sms';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import { useTranslation } from 'react-i18next';
import { languageOpt } from '../../../../constants/utils';
import { getTemplateSmsByUser } from '../../../../../helpers/configuration/templateSms';

const FormSMS = ({ phonesOpt, customerId, closeModal }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formSms',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const { t: tMConstant } = useTranslation('translation', {
		keyPrefix: 'constants.language',
	});
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const user = useUser();
	const [smsPredefined, setSmsPredefined] = useState(null);
	const [language, setLanguage] = useState('');
	console.log(user?.usuario);
	//getting all sms templates
	const { data: templatesSms } = useQuery(
		['getTemplateSmsByUser'],
		() => getTemplateSmsByUser(user.usuario),
		{
			enabled: user?.usuario !== undefined,
			select: (result) => result.data.list,
		}
	);
	//console.log(templatesSms);

	//send sms
	const { mutate: sendSms, isLoading: isSendingSms } = useMutation(
		sendExternalSms,
		{
			onSuccess: () => {
				queryClient.refetchQueries({
					queryKey: ['getSmsListByCustomer'],
				});
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(SMS_SUCCESS),
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
			customer: customerId,
			message: '',
			user: user?.usuario ?? '',
			phone: '',
		},
		validationSchema: Yup.object({
			customer: Yup.string().required(tMessage(FIELD_REQUIRED)),
			message: Yup.string()
				.max(160, `${tMessage(FIELD_MAX_LENGTH)} 160`)
				.required(tMessage(FIELD_REQUIRED)),
			user: Yup.string().required(tMessage(FIELD_REQUIRED)),
		}),
		onSubmit: async (values) => {
			sendSms(values);
		},
	});
	const templatesOpt = useMemo(() => {
		if (language === '') return [];
		const messages = templatesSms
			.filter((it) => it.language === language)
			.map((it) => ({
				value: it.id,
				label: it.name,
				template: it.template,
			}));
		return messages;
	}, [language, templatesSms]);
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
							{t('number')}
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
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label mb-0" htmlFor="language">
							{t('language')}
						</Label>
						<Select
							id="language"
							className="mb-0"
							value={
								language
									? {
											value: language,
											label: tMConstant(
												languageOpt.find(
													(it) =>
														it.value === language
												)?.label ?? ''
											),
									  }
									: null
							}
							onChange={(value) => {
								setLanguage(value?.value ?? '');
							}}
							options={languageOpt.map((it) => ({
								...it,
								label: tMConstant(it.label),
							}))}
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="smsPredefined"
						>
							{t('message')}
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
										value.template
									);
								else formik.setFieldValue('message', '');
							}}
							isClearable
							options={templatesOpt}
							placeholder={tMessage(SELECT_OPTION)}
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
					<Button type="submit" color="primary" className="me-2">
						{t('send')}
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={() => {}}
					>
						{t('cancel')}
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormSMS;
