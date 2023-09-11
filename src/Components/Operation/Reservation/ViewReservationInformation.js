import moment from 'moment';
import { Col, Label, Row } from 'reactstrap';
import diffDates from '../../../util/diffDates';
import Flatpickr from 'react-flatpickr';
import { useState } from 'react';
import BasicModal from '../../Common/BasicModal';
import FormReservationEdit from './Tab/Reservation/FormReservationEdit';

const ViewReservationInformation = ({
	editMode = false,
	setEditMode = () => {},
	data,
}) => {
	const [showModal, setShowModal] = useState(false);

	const toggleDialog = () => setShowModal(!showModal);
	return (
		<>
			<Row>
				<Col xxl={12}>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={() => setShowModal(true)}
						>
							<i className="ri-edit-fill me-1 align-bottom"></i>{' '}
							Editar reservación
						</button>
					</div>
				</Col>
			</Row>
			<Row className="fs-7">
				<Col xs="12" md="6">
					<Row>
						<Col lg={4}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="confirmacion"
								>
									No. confirmación
								</Label>
								<div className="form-control" id="confirmacion">
									-
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="booking">
									Id booking
								</Label>
								<div className="form-control" id="booking">
									{data?.booking ?? '-'}
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="hotel">
									Hotel
								</Label>
								<div className="form-control" id="hotel">
									{data?.hotel?.name ?? '-'}
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="plan">
									Plan
								</Label>
								<div className="form-control" id="plan">
									-
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="tipoHabitacion"
								>
									Tipo de habitación
								</Label>
								<div
									className="form-control"
									id="tipoHabitacion"
								>
									-
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="noches">
									Noches
								</Label>
								<div className="form-control" id="noches">
									{diffDates(
										data?.initialDate,
										data?.finalDate,
										'days'
									)}
								</div>
							</div>
						</Col>
						<Col lg={2}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="adultos">
									Adultos
								</Label>
								<div className="form-control" id="adultos">
									{data?.adult ?? '-'}
								</div>
							</div>
						</Col>
						<Col lg={2}>
							<div className="mb-3">
								<Label className="form-label" htmlFor="juniors">
									Juniors
								</Label>
								<div className="form-control" id="juniors">
									-
								</div>
							</div>
						</Col>
						<Col lg={2}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="menoresPagan"
								>
									Men. pagan
								</Label>
								<div className="form-control" id="menoresPagan">
									{data?.child ?? '-'}
								</div>
							</div>
						</Col>
						<Col lg={2}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="menoresGratis"
								>
									Men. gratis
								</Label>
								<div
									className="form-control"
									id="menoresGratis"
								>
									-
								</div>
							</div>
						</Col>
						<Col lg={2}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="infantes"
								>
									Infantes
								</Label>
								<div className="form-control" id="infantes">
									{data?.infant ?? '-'}
								</div>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs="12" md="6">
					<Row>
						<Col lg={6}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="fechaLlegada"
								>
									Fecha llegada
								</Label>
								<div className="form-control" id="fechaLlegada">
									{moment(
										data.initialDate,
										'YYYY-MM-DD'
									).format('DD/MM/YYYY')}
								</div>
							</div>
						</Col>
						<Col lg={6}>
							<div className="mb-3">
								<Label
									className="form-label"
									htmlFor="fechaSalida"
								>
									Fecha salida
								</Label>
								<div className="form-control" id="fechaSalida">
									{moment(
										data.finalDate,
										'YYYY-MM-DD'
									).format('DD/MM/YYYY')}
								</div>
							</div>
						</Col>
						<Col lg={12}>
							<div className="mt-3">
								<Label className="form-label mb-0">
									Checar disponibilidad
								</Label>
								<Flatpickr
									className="form-control d-none"
									options={{
										inline: true,
										dateFormat: 'Y-m-d',
										locale: 'es',
									}}
								/>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<h6 className="mt-3 text-primary">Detalle del titular</h6>
			<hr />
			<Row className="fs-7">
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="estadoCivil">
							Estado civil
						</Label>
						<div className="form-control" id="estadoCivil">
							{data?.maritalStatus ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="ingreso">
							Ingreso
						</Label>
						<div className="form-control" id="ingreso">
							{data?.income ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="estadoAnimo">
							Estado de ánimo
						</Label>
						<div className="form-control" id="estadoAnimo">
							-
						</div>
					</div>
				</Col>
			</Row>
			<Row className="fs-7">
				<Col lg={2}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="tarjetas">
							Tarjetas
						</Label>
						<div className="form-control" id="tarjetas">
							{data?.visa + data?.amex + data?.mc}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.visa > 0 ? 'checked' : ''
							}`}
							type="checkbox"
							id="visa"
						/>
						<Label className="form-check-label" htmlFor="visa">
							Visa
						</Label>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.mc > 0 ? 'checked' : ''
							}`}
							type="checkbox"
							id="masterCard"
						/>
						<Label
							className="form-check-label"
							htmlFor="masterCard"
						>
							Master Card
						</Label>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.amex > 0 ? 'checked' : ''
							}`}
							type="checkbox"
							id="amex"
						/>
						<Label className="form-check-label" htmlFor="amex">
							Amex
						</Label>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
							S
						</Label>
						<div
							className="form-check-input"
							type="checkbox"
							id="otras"
						/>
						<Label className="form-check-label" htmlFor="otras">
							Otras
						</Label>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="cual">
							Cual
						</Label>
						<div className="form-control" id="cual">
							-
						</div>
					</div>
				</Col>
			</Row>
			<h6 className="mt-3 text-primary">Detalle de la operación</h6>
			<hr />
			<Row className="fs-7">
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="representante">
							Call center
						</Label>
						<div className="form-control" id="representante">
							{data?.callcenter?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="proveedor">
							Segmento
						</Label>
						<div className="form-control" id="proveedor">
							{data?.segment?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="precall">
							Programa
						</Label>
						<div className="form-control" id="precall">
							{data?.program?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="hooked">
							Hooked
						</Label>
						<div className="form-control" id="hooked">
							{data?.hooked?.toString() ?? '-'}
						</div>
					</div>
				</Col>
			</Row>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Editar reservación"
				size="xl"
				classBody="py-1 px-3"
				children={<FormReservationEdit toggleDialog={toggleDialog} />}
			/>
		</>
	);
};

export default ViewReservationInformation;
