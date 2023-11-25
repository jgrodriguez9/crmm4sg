import { useQuery } from 'react-query';
import { useMemo } from 'react';
import jsFormatNumber from '../../../util/jsFormatNumber';
import moment from 'moment';
import { Alert, Col, Row } from 'reactstrap';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';
import { useState } from 'react';
import BasicModal from '../../Common/BasicModal';
import FormService from './Tab/Service/FormService';
import { getServicesByReservation } from '../../../helpers/reservation';
import CellActions from '../../Common/CellActions';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import DeleteModal from '../../Common/DeleteModal';

const ReservationService = ({ ReservationId, reservation }) => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { data, error, isLoading, isSuccess } = useQuery(
		['getServiceByReservation', ReservationId],
		async () => {
			const response = await getServicesByReservation(ReservationId);
			return response;
		},
		{
			keepPreviousData: true,
			select: (response) => response.data.list,
		}
	);
	const editRow = (row) => {
		const { original } = row;
		console.log(original);
	};
	const showDialogDelete = (row) => {
		setShowDeleteDialog(true);
	};

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editRow,
			labelTooltip: 'Editar',
		},
		{
			iconClass: `${deleteIconClass} fs-5 text-danger`,
			click: showDialogDelete,
			labelTooltip: 'Eliminar',
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: 'Descripción',
				accessor: 'description',
				filterable: false,
				width: '25%',
			},
			{
				Header: 'Adultos',
				accessor: 'pax',
				filterable: false,
				width: '5%',
			},
			{
				Header: 'Menores',
				accessor: 'childs',
				filterable: false,
				width: '5%',
			},
			{
				Header: 'Monto',
				accessor: 'amount',
				filterable: false,
				width: '10%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Comisión',
				accessor: 'commission',
				filterable: false,
				width: '10%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'User',
				accessor: 'user',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Comisión del usuario',
				accessor: 'userComission',
				filterable: false,
				width: '10%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Folio Dolphin',
				accessor: 'folioDolphin',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Fecha creación',
				accessor: 'insertdate',
				filterable: false,
				width: '10%',
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
			},
			{
				id: 'action',
				width: '5%',
				Cell: ({ row }) => {
					return <CellActions actions={actions} row={row} />;
				},
			},
		],
		[]
	);

	const toggleDialog = () => setShowModal(!showModal);
	const handleDelete = async () => {
		// const dataToDelete = {
		// 	idPax: pax.id,
		// 	idReservation: reservationId,
		// };
		// deletePaxMutation(dataToDelete);
	};
	return (
		<>
			{error && !isLoading && (
				<Row>
					<Col xs="12" md={{ size: 4, offset: 4 }}>
						<Alert color="danger" className="mb-0">
							{showFriendlyMessafe(error?.code)}
						</Alert>
					</Col>
				</Row>
			)}
			<Row>
				<Col xxl={12}>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={toggleDialog}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Nuevo servicio
						</button>
					</div>
				</Col>
				<Col xxl={12}>
					<div>
						{!isLoading ? (
							<>
								<TableContainer
									columns={columns}
									data={isSuccess ? data : []}
									className="custom-header-css"
									divClass="mb-3"
									tableClass="align-middle table-wrap"
								/>
							</>
						) : (
							<Loader />
						)}
					</div>
				</Col>
			</Row>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Agregar Servicio"
				size="lg"
				children={
					<FormService
						toggleDialog={toggleDialog}
						ReservationId={ReservationId}
						reservation={reservation}
					/>
				}
			/>
			<DeleteModal
				handleDelete={handleDelete}
				show={showDeleteDialog}
				setShow={setShowDeleteDialog}
				isDeleting={false}
			/>
		</>
	);
};

export default ReservationService;
