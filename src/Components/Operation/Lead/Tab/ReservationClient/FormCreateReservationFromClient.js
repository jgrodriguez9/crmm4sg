import { Button, Col, Form, Row } from 'reactstrap';
import FormReservationCero from '../../../Reservation/FormReservation/FormReservationCero';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import useUser from '../../../../../hooks/useUser';
import * as Yup from 'yup';
import {
	ERROR_SERVER,
	FIELD_GREATER_THAN_CERO,
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
} from '../../../../constants/messages';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import moment from 'moment';
import { createReservationFromSale } from '../../../../../helpers/reservation';
import { useMutation, useQueryClient } from 'react-query';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';

const FormCreateReservationFromClient = ({
	reservation = null,
	toggleDialog,
	refetch,
}) => {
	const dispatch = useDispatch();
	const user = useUser();
	const client = useQueryClient();

	//create reservation
	const { mutate: createItem, isLoading: isCreating } = useMutation(
		createReservationFromSale,
		{
			onSuccess: () => {
				dispatch(
					addMessage({
						type: 'success',
						message: SAVE_SUCCESS,
					})
				);
				toggleDialog();
				client.refetchQueries({ queryKey: ['getReservationPaginate'] });
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
		enableReinitialize: true,
		initialValues: {
			//reservation
			...reservation,
			adult: 2,
			amex: 0,
			callCenter: { id: '' },
			cards: '',
			child: 0,
			comment: '',
			finalDate: '',
			hotel: { id: '' },
			hotelUnit: '',
			infant: 0,
			initialDate: '',
			intPlan: '',
			mc: 0,
			other: 0,
			pickup: 'NP',
			unit: '',
			userName: user?.username ?? '',
			visa: 0,
		},
		validationSchema: Yup.object({
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
			hotel: Yup.object().shape({
				id: Yup.string().required(FIELD_REQUIRED),
			}),
			hotelUnit: Yup.string().required(FIELD_REQUIRED),
			callCenter: Yup.object().shape({
				id: Yup.string().required(FIELD_REQUIRED),
			}),
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
				<Col xs={12} md={12}>
					<FormReservationCero
						formik={formik}
						createFromSale={true}
					/>
				</Col>
			</Row>
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

export default FormCreateReservationFromClient;
