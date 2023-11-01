import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import DatePicker from '../../../../Common/DatePicker';
import Select from 'react-select';
import { FIELD_REQUIRED, SELECT_OPTION } from '../../../../constants/messages';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';

const FormService = ({ toggleDialog, service = null }) => {
	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: service?.id ?? '',
			subService: service?.subService ?? '',
			idBooking: service?.idBooking ?? '',
			quantity: service?.quantity ?? '',
			pax: service?.pax ?? 2,
			amount: service?.amount ?? 0,
			description: service?.description ?? 0,
			childs: service?.childs ?? 0,
			certificateNumber: service?.certificateNumber ?? '',
			// commission: 0,
			// "userComission": "",
			// "confirmation": "123456",
			// "location": "Isla Mujeres",
			folioDolphin: service?.folioDolphin,
			// "idPromotion": 123,
			subService: service?.subService,
			// "reservation": 5469
		},
		validationSchema: Yup.object({
			subService: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				data[key] = value;
			});
			console.log(data);
			// if (values.id) {
			// 	//updating existing one
			// 	updateItem({
			// 		idPax: values.id,
			// 		reservationId: reservationId,
			// 		body: data,
			// 	});
			// } else {
			// 	//creating one
			// 	createItem({ body: data });
			// }
		},
	});
	return (
		<Form className="fs-7">
			<Row>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="service">
							Servicio
						</Label>
						<Select
							value={null}
							onChange={(value) => {}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Adultos
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Menores
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Folio dolphin
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Total
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
			</Row>

			<div className="d-flex mt-3">
				<Button type="submit" color="primary" className="me-2">
					Pagar
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

export default FormService;
