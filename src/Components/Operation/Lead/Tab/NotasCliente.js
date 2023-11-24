import { Col, Row } from 'reactstrap';
import TableNotas from './NotasCliente/TableNotas';
import { useState } from 'react';
import BasicModal from '../../../Common/BasicModal';
import FormNotaCliente from './NotasCliente/FormNotaCliente';
import { useQuery } from 'react-query';
import { getNotesByClient } from '../../../../helpers/notes';
import { deleteIconClass, editIconClass } from '../../../constants/icons';
import DeleteModal from '../../../Common/DeleteModal';

const NotasCliente = ({ customerId }) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const { data, error, isLoading, isSuccess } = useQuery(
		['getNotesByClient', customerId],
		async () => {
			const response = await getNotesByClient(customerId);
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
							className="btn btn-info"
							onClick={() => setShowAddModal(true)}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Agregar
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

export default NotasCliente;
