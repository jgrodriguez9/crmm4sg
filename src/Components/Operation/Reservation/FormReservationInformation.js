import { Button, Form } from 'reactstrap';
import { FIELD_REQUIRED } from '../../constants/messages';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../util/removetEmptyObject';
import moment from 'moment';
import FormReservationClient from './FormReservation/FormReservationClient';
import FormReservationCero from './FormReservation/FormReservationCero';
import FormReservationPaxes from './FormReservation/FormReservationPaxes';
import useUser from '../../../hooks/useUser';

const FormReservationInformation = ({ toggleDialog }) => {
	const user = useUser();

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
			hotelUnit: '',
			infant: 0,
			initialDate: '',
			intPlan: '',
			mc: 0,
			other: 0,
			pickup: '',
			unit: '',
			userName: user?.username ?? '',
			visa: 0,
			//paxes
			paxes: [],
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required(FIELD_REQUIRED),
			lastName: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'fechaNacimiento') {
					data[key] = moment(values.fechaNacimiento).format(
						'YYYY-MM-DD'
					);
				} else {
					data[key] = value;
				}
			});

			// create reservation
		},
	});

	console.log(formik.values);
	console.log(formik.errors);

	return (
		<Form className="fs-7">
			<h5 className="mt-3 text-primary">Detalle del titular</h5>
			<hr />
			<FormReservationClient formik={formik} />
			<h5 className="text-primary">Detalle de la reservación</h5>
			<hr />
			<FormReservationCero formik={formik} />
			<FormReservationPaxes formik={formik} />
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
		</Form>
	);
};

export default FormReservationInformation;
