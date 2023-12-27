import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
	createCategoryArticles,
	updateCategoryArticles,
} from '../../../../helpers/catalogues/categoryArticles';
import { addMessage } from '../../../../slices/messages/reducer';
import {
	ERROR_SERVER,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
	UPDATE_SUCCESS,
} from '../../../constants/messages';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import removetEmptyObject from '../../../../util/removetEmptyObject';
import ButtonsLoader from '../../../Loader/ButtonsLoader';

const FormCategoriaArticles = ({ item = null, toggleModal, refetch }) => {
	const dispatch = useDispatch();

	//create note
	const {
		mutate: createItem,
		isLoading: isCreating,
		isError: isErrorCreate,
		error: errorCreate,
		isSuccess: isCreated,
	} = useMutation(createCategoryArticles);

	//update note
	const {
		mutate: updateItem,
		isLoading: isUpdating,
		isError: isErrorUpdate,
		error: errorUpdate,
		isSuccess: isUpdated,
	} = useMutation(updateCategoryArticles);

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
			name: item?.name ?? '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required(FIELD_REQUIRED),
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
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="name">
							Nombre
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
							<FormFeedback type="invalid d-block">
								{formik.errors.name}
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
				<div className="d-flex my-3">
					<Button type="submit" color="primary" className="me-2">
						Aceptar
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={toggleModal ? toggleModal : () => {}}
					>
						Cancelar
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormCategoriaArticles;
