import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
	createArticle,
	updateArticle,
} from '../../../helpers/configuration/article';
import { getCategoryArticlePaginate } from '../../../helpers/configuration/categoryArticle';
import { addMessage } from '../../../slices/messages/reducer';
import {
	ERROR_SERVER,
	FIELD_MAX_LENGTH,
	FIELD_REQUIRED,
	ONE_OPTION_REQUIRED,
	SAVE_SUCCESS,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';
import removetEmptyObject from '../../../util/removetEmptyObject';
import ButtonsLoader from '../../Loader/ButtonsLoader';
import { getDepartamentList } from '../../../helpers/configuration/departament';
import { useTranslation } from 'react-i18next';
import {
	createTemplateSms,
	updateTemplateSms,
} from '../../../helpers/configuration/templateSms';
import { languageOpt } from '../../constants/utils';

const FormTemplateSms = ({ item = null, toggleModal, refetch }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.formTemplateSMS',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const { t: tMConstant } = useTranslation('translation', {
		keyPrefix: 'constants.language',
	});
	const dispatch = useDispatch();

	const { data: departmentsOpt } = useQuery(
		['getDepartamentList'],
		async () => {
			const response = await getDepartamentList();
			return response;
		},
		{
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: it.name,
				})),
		}
	);

	//create item
	const { mutate: createItem, isLoading: isCreating } = useMutation(
		createTemplateSms,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(SAVE_SUCCESS),
					})
				);
				toggleModal();
				refetch();
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

	//update item
	const { mutate: updateItem, isLoading: isUpdating } = useMutation(
		updateTemplateSms,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(UPDATE_SUCCESS),
					})
				);
				toggleModal();
				refetch();
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
			id: item?.id ?? '',
			name: item?.name ?? '',
			language: item?.language ?? '',
			active: item?.active ?? true,
			template: item?.template ?? '',
			departments: item?.departments ?? [],
		},
		validationSchema: Yup.object({
			name: Yup.string().required(tMessage(FIELD_REQUIRED)),
			language: Yup.string().required(tMessage(FIELD_REQUIRED)),
			template: Yup.string()
				.required(tMessage(FIELD_REQUIRED))
				.max(160, `${tMessage(FIELD_MAX_LENGTH)} 160`),
			departments: Yup.array().min(1, tMessage(ONE_OPTION_REQUIRED)),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				data[key] = value;
			});
			if (item?.id) {
				updateItem({
					id: item?.id,
					body: data,
				});
			} else {
				createItem(data);
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
				<Col lg={7}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="name">
							{t('title')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.name ? 'is-invalid' : ''
							}`}
							id="name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
						/>
						{formik.errors.name && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.name}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="language">
							{t('language')}
						</Label>
						<Select
							id="language"
							className="mb-0"
							value={
								formik.values.language
									? {
											value: formik.values.language,
											label: tMConstant(
												languageOpt.find(
													(it) =>
														it.value ===
														formik.values.language
												)?.label ?? ''
											),
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'language',
									value?.value ?? ''
								);
							}}
							options={languageOpt.map((it) => ({
								...it,
								label: tMConstant(it.label),
							}))}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.language && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.language}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={2}>
					<div className="form-check mt-3">
						<Input
							className="form-check-input"
							type="checkbox"
							id="active"
							checked={formik.values.active}
							onChange={(evt) =>
								formik.setFieldValue(
									'active',
									evt.target.checked
								)
							}
						/>
						<Label className="form-check-label" htmlFor="active">
							{t('active')}
						</Label>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="departments"
						>
							{t('departments')}
						</Label>
						<Select
							id="category"
							className="mb-0"
							value={formik.values.departments.map((it) => ({
								label: it.name,
								value: it.id,
							}))}
							onChange={(value) => {
								formik.setFieldValue(
									'departments',
									value.map((it) => ({
										name: it.label,
										id: it.value,
									}))
								);
							}}
							options={departmentsOpt}
							isMulti={true}
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.departments && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.departments}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="template">
							{t('message')}
						</Label>
						<textarea
							id="template"
							name="template"
							className={`form-control ${
								formik.errors.template ? 'is-invalid' : ''
							}`}
							value={formik.values.template}
							onChange={(e) =>
								formik.setFieldValue('template', e.target.value)
							}
							rows={5}
						/>
						{formik.errors.template && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.template}
							</FormFeedback>
						)}
					</div>
				</Col>
			</Row>
			{isUpdating || isCreating ? (
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
			) : (
				<div className="d-flex my-3">
					<Button type="submit" color="primary" className="me-2">
						{t('accept')}
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={toggleModal ? toggleModal : () => {}}
					>
						{t('cancel')}
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormTemplateSms;
