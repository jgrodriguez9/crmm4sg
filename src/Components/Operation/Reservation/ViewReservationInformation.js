import moment from 'moment';
import { Col, Label, Row } from 'reactstrap';
import diffDates from '../../../util/diffDates';
import { useState } from 'react';
import BasicModal from '../../Common/BasicModal';
import FormReservation from './Tab/Reservation/FormReservation';
import { useQuery } from 'react-query';
import { fetchMaritalStatus } from '../../../services/maritalStatus';
import HotelAvailability from '../../Common/HotelAvailability';
import { editIconClass } from '../../constants/icons';

const ViewReservationInformation = ({
	editMode = false,
	setEditMode = () => {},
	data,
	refetchReservation,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [showModalAvailability, setShowModalAvailability] = useState(false);

	const toggleDialog = () => setShowModal(!showModal);

	//getStatus
	const { data: maritalStatusOpt } = useQuery(
		['getMaritalStatus'],
		() => fetchMaritalStatus(),
		{
			select: (data) =>
				data.data.maritaStatusList.map((item) => ({
					value: item.key,
					label: item.value,
				})),
		}
	);

	return (
		<>
			<Row>
				<Col xxl={12}>
					<div className="d-flex flex-row align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm me-2"
							onClick={() => setShowModal(true)}
						>
							<i
								className={`${editIconClass} mb-1 align-bottom`}
							></i>{' '}
							Editar reservación
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={() => setShowModalAvailability(true)}
						>
							<i className="ri-calendar-2-line align-bottom"></i>{' '}
							Ver disponibilidad
						</button>
					</div>
				</Col>
			</Row>
			<Row className="fs-7">
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="confirmacion"
						>
							No. confirmación
						</Label>
						<div className="form-control" id="confirmacion">
							{data?.confirm ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="booking">
							Id booking
						</Label>
						<div className="form-control" id="booking">
							{data?.booking ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="hotel">
							Hotel
						</Label>
						<div className="form-control" id="hotel">
							{data?.hotel?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="tipoHabitacion"
						>
							Unidad hotelera
						</Label>
						<div className="form-control" id="tipoHabitacion">
							{data?.hotelUnit ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="plan">
							Plan
						</Label>
						<div className="form-control" id="plan">
							{data?.intPlan?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="fechaLlegada"
						>
							Fecha llegada
						</Label>
						<div className="form-control" id="fechaLlegada">
							{moment(data.initialDate, 'YYYY-MM-DD').format(
								'DD/MM/YYYY'
							)}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="fechaSalida"
						>
							Fecha salida
						</Label>
						<div className="form-control" id="fechaSalida">
							{moment(data.finalDate, 'YYYY-MM-DD').format(
								'DD/MM/YYYY'
							)}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="noches">
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
				<Col lg={1}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="adultos">
							Adultos
						</Label>
						<div className="form-control" id="adultos">
							{data?.adult ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="menoresPagan"
						>
							Menores
						</Label>
						<div className="form-control" id="menoresPagan">
							{data?.child ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="infantes">
							Infantes
						</Label>
						<div className="form-control" id="infantes">
							{data?.infant ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.pickup === 'P' ? 'checked' : ''
							}`}
							type="checkbox"
							id="pickup"
						/>
						<Label className="form-check-label" htmlFor="pickup">
							Pickup
						</Label>
					</div>
				</Col>
			</Row>
			<Row className="fs-7">
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
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
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
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
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
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
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.other > 0 ? 'checked' : ''
							}`}
							type="checkbox"
							id="otras"
						/>
						<Label className="form-check-label" htmlFor="otras">
							Otras
						</Label>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="cual">
							Cual
						</Label>
						<div className="form-control" id="cual">
							{data?.cotra ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="tarjetas">
							Tarjetas
						</Label>
						<div className="form-control" id="tarjetas">
							{data?.cards ?? '-'}
						</div>
					</div>
				</Col>
			</Row>
			<h6 className="mt-3 text-primary">Detalle del titular</h6>
			<hr />
			<Row className="fs-7">
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="estadoCivil"
						>
							Nombre
						</Label>
						<div className="form-control" id="estadoCivil">
							{data?.customer?.firstName ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="estadoCivil"
						>
							Apellidos
						</Label>
						<div className="form-control" id="estadoCivil">
							{data?.customer?.lastName ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="estadoCivil"
						>
							Estado civil
						</Label>
						<div className="form-control" id="estadoCivil">
							{maritalStatusOpt?.find(
								(it) => it.value === data?.maritalStatus
							)?.label ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={2}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="ingreso">
							Ingreso
						</Label>
						<div className="form-control" id="ingreso">
							{data?.income ?? '-'}
						</div>
					</div>
				</Col>
			</Row>
			<h6 className="mt-3 text-primary">Detalle de la operación</h6>
			<hr />
			<Row className="fs-7">
				<Col lg={3}>
					<div className="mb-2">
						<Label
							className="form-label mb-0"
							htmlFor="representante"
						>
							Call center
						</Label>
						<div className="form-control" id="representante">
							{data?.callcenter?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="proveedor">
							Segmento
						</Label>
						<div className="form-control" id="proveedor">
							{data?.segment?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="precall">
							Programa
						</Label>
						<div className="form-control" id="precall">
							{data?.program?.name ?? '-'}
						</div>
					</div>
				</Col>
				<Col lg={1}>
					<div className="form-check">
						<Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block mb-0">
							S
						</Label>
						<div
							className={`form-check-input ${
								data?.hooked > 0 ? 'checked' : ''
							}`}
							type="checkbox"
							id="otras"
						/>
						<Label className="form-check-label" htmlFor="otras">
							Hooked
						</Label>
					</div>
				</Col>
			</Row>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Editar reservación"
				size="xl"
				classBody="py-1 px-3"
				children={
					<FormReservation
						reservation={data}
						toggleDialog={toggleDialog}
						refetchReservation={refetchReservation}
					/>
				}
			/>
			<BasicModal
				open={showModalAvailability}
				setOpen={setShowModalAvailability}
				title="Disponibilidad"
				size="lg"
				classBody="py-1 px-3"
				children={
					<HotelAvailability
						initialDate={moment(
							data?.initialDate,
							'YYYY-MM-DD'
						).toDate()}
						finalDate={moment(
							data?.finalDate,
							'YYYY-MM-DD'
						).toDate()}
						hotel={data?.hotel?.id ?? null}
					/>
				}
			/>
		</>
	);
};

export default ViewReservationInformation;
