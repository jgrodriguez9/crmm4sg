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
	SAVE_SUCCESS,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';
import removetEmptyObject from '../../../util/removetEmptyObject';
import ButtonsLoader from '../../Loader/ButtonsLoader';
import { getDepartamentList } from '../../../helpers/configuration/departament';
import { useTranslation } from 'react-i18next';

const FormArticle = ({ item = null, toggleModal, refetch }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.formArticle',
	});
	const dispatch = useDispatch();

	const { data: categoryArticleOpt } = useQuery(
		['getCategoryArticlePaginate'],
		async () => {
			const response = await getCategoryArticlePaginate(`page=1&max=100`);
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

	//create note
	const {
		mutate: createItem,
		isLoading: isCreating,
		isError: isErrorCreate,
		error: errorCreate,
		isSuccess: isCreated,
	} = useMutation(createArticle);

	//update note
	const {
		mutate: updateItem,
		isLoading: isUpdating,
		isError: isErrorUpdate,
		error: errorUpdate,
		isSuccess: isUpdated,
	} = useMutation(updateArticle);

	useEffect(() => {
		if (isCreated || isUpdated) {
			dispatch(
				addMessage({
					type: 'success',
					message: isCreated ? SAVE_SUCCESS : UPDATE_SUCCESS,
				})
			);
			toggleModal();
			refetch();
		} else if (isErrorCreate || isErrorUpdate) {
			let message = ERROR_SERVER;
			let serverError = isErrorCreate ? errorCreate : errorUpdate;
			message = extractMeaningfulMessage(serverError, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [
		isCreated,
		isUpdated,
		dispatch,
		isErrorCreate,
		isErrorUpdate,
		errorCreate,
		errorUpdate,
	]);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			title: item?.title ?? '',
			description: item?.description ?? '',
			url: item?.url ?? '',
			category: item?.category ?? { id: '' },
			departments: item?.departments ?? [],
		},
		validationSchema: Yup.object({
			title: Yup.string().required(FIELD_REQUIRED),
			url: Yup.string().required(FIELD_REQUIRED),
			description: Yup.string().max(250, `${FIELD_MAX_LENGTH} 250`),
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
					articleId: item?.id,
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
				<Col lg={8}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="title">
							{t('title')}
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.title ? 'is-invalid' : ''
							}`}
							id="title"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
						/>
						{formik.errors.title && (
							<FormFeedback type="invalid d-block">
								{formik.errors.title}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="category">
							{t('category')}
						</Label>
						<Select
							id="category"
							className="mb-0"
							value={
								formik.values.category?.id
									? {
											value: formik.values.category.id,
											label: formik.values.category.name,
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'category.id',
									value?.value ?? ''
								);
								formik.setFieldValue(
									'category.name',
									value?.label ?? ''
								);
							}}
							options={categoryArticleOpt}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="url">
							Url
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.url ? 'is-invalid' : ''
							}`}
							id="url"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.url}
						/>
						{formik.errors.url && (
							<FormFeedback type="invalid d-block">
								{formik.errors.url}
							</FormFeedback>
						)}
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
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="description">
							{t('description')}
						</Label>
						<textarea
							id="description"
							name="description"
							className={`form-control ${
								formik.errors.description ? 'is-invalid' : ''
							}`}
							value={formik.values.description}
							onChange={(e) =>
								formik.setFieldValue(
									'description',
									e.target.value
								)
							}
							rows={5}
						/>
						{formik.errors.description && (
							<FormFeedback type="invalid d-block">
								{formik.errors.description}
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

export default FormArticle;
