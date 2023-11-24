import { useState } from 'react';
import { useQuery } from 'react-query';
import { getNotesByReservation } from '../../../helpers/notes';
import { Col, Row } from 'reactstrap';
import TableNotas from '../Lead/Tab/NotasCliente/TableNotas';
import BasicModal from '../../Common/BasicModal';
import FormNotaCliente from '../Lead/Tab/NotasCliente/FormNotaCliente';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import DeleteModal from '../../Common/DeleteModal';

const ReservationNotas = ({ ReservationId }) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { data, error, isLoading, isSuccess } = useQuery(
		['getNotesByClient', ReservationId],
		async () => {
			const response = await getNotesByReservation(ReservationId);
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
	const handleDelete = async () => {
		// const dataToDelete = {
		// 	idPax: pax.id,
		// 	idReservation: reservationId,
		// };
		// deletePaxMutation(dataToDelete);
	};
	return (
		<>
			<Row>
				<Col>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={() => setShowAddModal(true)}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Nueva nota
						</button>
					</div>
				</Col>
			</Row>
			<TableNotas
				isLoading={isLoading}
				isSuccess={isSuccess}
				data={data}
				error={error}
				actions={actions}
			/>
			<BasicModal
				open={showAddModal}
				setOpen={setShowAddModal}
				title="Agregar nota"
				size="lg"
				children={<FormNotaCliente />}
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

export default ReservationNotas;
