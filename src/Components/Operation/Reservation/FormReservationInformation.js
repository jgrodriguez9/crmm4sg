import { Button, Form } from 'reactstrap';
import {
	CORREO_VALID,
	ERROR_SERVER,
	FIELD_GREATER_THAN_CERO,
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
} from '../../constants/messages';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../util/removetEmptyObject';
import moment from 'moment';
import FormReservationClient from './FormReservation/FormReservationClient';
import FormReservationCero from './FormReservation/FormReservationCero';
import FormReservationPaxes from './FormReservation/FormReservationPaxes';
import useUser from '../../../hooks/useUser';
import { useMutation } from 'react-query';
import { createReservation } from '../../../helpers/reservation';
import ButtonsLoader from '../../Loader/ButtonsLoader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';

const FormReservationInformation = ({ toggleDialog }) => {
	const dispatch = useDispatch();
	const user = useUser();

	//create reservation
	const {
		mutate: createItem,
		isLoading: isCreating,
		isSuccess: isCreated,
		isError: isErrorCreate,
		error: errorCreate,
	} = useMutation(createReservation);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			firstName: '',
			lastName: '',
			// fechaNacimiento: customer?.fechaNacimiento ?? '',
			address: '',
			postalCode: '',
			country: '',
			state: '',
			city: '',
			phone1: '',
			phone2: '',
			movil: '',
			email: '',
			srcIncome: '',
			//reservation
			adult: 2,
			amex: 0,
			callCenter: { id: '' },
			cards: '',
			child: 0,
			comment: '',
			finalDate: '',
			hotel: { id: '' },
			hotelUnit: 'UH',
			infant: 0,
			initialDate: '',
			intPlan: '',
			mc: 0,
			other: 0,
			pickup: 'NP',
			unit: 'UH',
			userName: user?.username ?? '',
			visa: 0,
			//paxes
			paxes: [],
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required(FIELD_REQUIRED),
			lastName: Yup.string().required(FIELD_REQUIRED),
			email: Yup.string().email(CORREO_VALID),
			adult: Yup.number()
				.min(1, FIELD_GREATER_THAN_CERO)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			child: Yup.number()
				.min(0, FIELD_POSITIVE)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			infant: Yup.number()
				.min(0, FIELD_POSITIVE)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'initialDate') {
					data[key] = moment(values.initialDate).format('YYYY-MM-DD');
				} else if (key === 'finalDate') {
					data[key] = moment(values.finalDate).format('YYYY-MM-DD');
				} else {
					data[key] = value;
				}
			});
			console.log(data);
			createItem(data);
			// create reservation
		},
	});

	console.log(formik.values);
	console.log(formik.errors);

	useEffect(() => {
		if (isCreated) {
			dispatch(
				addMessage({
					type: 'success',
					message: SAVE_SUCCESS,
				})
			);
			// refetch();
		} else if (isErrorCreate) {
			let message = ERROR_SERVER;
			let serverError = errorCreate;
			message = extractMeaningfulMessage(serverError, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [isCreated, dispatch, isErrorCreate, errorCreate]);

	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
			<h5 className="mt-3 text-primary">Detalle del titular</h5>
			<hr />
			<FormReservationClient formik={formik} />
			<h5 className="text-primary">Detalle de la reservación</h5>
			<hr />
			<FormReservationCero formik={formik} />
			<FormReservationPaxes formik={formik} />
			{!isCreating && (
				<div className="d-flex my-3">
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

			{isCreating && (
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
			)}
		</Form>
	);
};

export default FormReservationInformation;
