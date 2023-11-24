import { Button, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';
import {
	FIELD_GREATER_THAN_CERO,
	FIELD_INTEGER,
	FIELD_NUMERIC,
	FIELD_POSITIVE,
	FIELD_REQUIRED,
	SELECT_OPTION,
} from '../../../../constants/messages';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import { useQuery } from 'react-query';
import { getSubServicesByReservation } from '../../../../../helpers/contractService';
import { useState } from 'react';
import DisabledInput from '../../../../Controller/DisabledInput';
import jsFormatNumber from '../../../../../util/jsFormatNumber';

const FormService = ({
	toggleDialog,
	service = null,
	ReservationId,
	reservation,
}) => {
	const [price, setPrice] = useState(0);
	const { data, error, isLoading, isSuccess } = useQuery(
		['getSubServicesByReservation', ReservationId],
		async () => {
			const response = await getSubServicesByReservation(ReservationId);
			return response;
		},
		{
			keepPreviousData: true,
			select: (response) => response.data.subServiceList,
		}
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			id: service?.id ?? '',
			subService: service?.subService ?? '',
			idBooking: reservation?.booking ?? '',
			quantity: service?.quantity ?? '',
			pax: service?.pax ?? 2,
			amount: service?.amount ?? 0,
			description: service?.description ?? '',
			childs: service?.childs ?? 0,
			// certificateNumber: reservation?.confirm ?? '',
			// commission: 0,
			// "userComission": "",
			confirmation: reservation.confirm,
			// "location": "Isla Mujeres",
			folioDolphin: service?.folioDolphin,
			// "idPromotion": 123,
			reservation: reservation.id,
		},
		validationSchema: Yup.object({
			subService: Yup.string().required(FIELD_REQUIRED),
			pax: Yup.number()
				.min(1, FIELD_GREATER_THAN_CERO)
				.integer(FIELD_INTEGER)
				.typeError(FIELD_NUMERIC)
				.required(FIELD_REQUIRED),
			childs: Yup.number()
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
				data[key] = value;
			});
			data['quantity'] = parseInt(values.pax) + parseInt(values.childs);
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
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="service">
							Subservicio
						</Label>
						<Select
							value={
								formik.values.subService
									? {
											value: formik.values.subService,
											label:
												data.find(
													(item) =>
														item.id ===
														formik.values.subService
												)?.name ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue('subService', value.value);
							}}
							options={data?.map((it) => ({
								value: it.id,
								label: it.name,
								description: it.description,
							}))}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
						{formik.errors.subService && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.subService}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Descripción
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.description ? 'is-invalid' : ''
							}`}
							id="description"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
						/>
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Adultos
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.pax ? 'is-invalid' : ''
							}`}
							id="pax"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.pax}
						/>
						{formik.errors.pax && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.pax}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Menores
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.childs ? 'is-invalid' : ''
							}`}
							id="childs"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.childs}
						/>
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Folio dolphin
						</Label>
						<Input
							type="text"
							className={`form-control ${
								formik.errors.folioDolphin ? 'is-invalid' : ''
							}`}
							id="folioDolphin"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.folioDolphin}
						/>
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Total
						</Label>
						<DisabledInput value={jsFormatNumber(price)} />
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
