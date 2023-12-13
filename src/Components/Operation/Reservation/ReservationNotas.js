import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { deleteNote, getNotesByReservation } from '../../../helpers/notes';
import { Col, Row } from 'reactstrap';
import TableNotas from '../Lead/Tab/NotasCliente/TableNotas';
import BasicModal from '../../Common/BasicModal';
import FormNotaCliente from '../Lead/Tab/NotasCliente/FormNotaCliente';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import DeleteModal from '../../Common/DeleteModal';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/messages/reducer';
import { DELETE_SUCCESS, ERROR_SERVER } from '../../constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';

const ReservationNotas = ({ ReservationId, customerId }) => {
	const dispatch = useDispatch();
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [note, setNote] = useState(null);
	const { data, error, isLoading, isSuccess, refetch } = useQuery(
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
		setNote(original);
		setShowAddModal(true);
	};
	const showDialogDelete = (row) => {
		const { original } = row;
		setNote(original);
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
	//delete item
	const {
		mutate: deleteItem,
		isLoading: isDeleting,
		isError: isErrorDelete,
		error: errorDelete,
		isSuccess: isDeleted,
	} = useMutation(deleteNote);
	const handleDelete = async () => {
		const dataToDelete = {
			customerId: customerId,
			noteId: note.noteId,
		};
		deleteItem(dataToDelete);
	};
	useEffect(() => {
		if (isDeleted) {
			refetch();
			setShowDeleteDialog(false);
			dispatch(
				addMessage({
					message: DELETE_SUCCESS,
					type: 'success',
				})
			);
		} else if (isErrorDelete) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(errorDelete, message);
			dispatch(
				addMessage({
					message: message,
					type: 'error',
				})
			);
		}
	}, [dispatch, errorDelete, isDeleted, isErrorDelete, refetch]);
	const toggleModalFormNote = () => setShowAddModal(!showAddModal);
	return (
		<>
			<Row>
				<Col>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={() => {
								setNote(null);
								setShowAddModal(true);
							}}
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
				title={note ? 'Editar nota' : 'Crear nota'}
				size="lg"
				children={
					<FormNotaCliente
						note={note}
						customerId={customerId}
						toggleModal={toggleModalFormNote}
						refetch={refetch}
					/>
				}
			/>
			<DeleteModal
				handleDelete={handleDelete}
				show={showDeleteDialog}
				setShow={setShowDeleteDialog}
				isDeleting={isDeleting}
			/>
		</>
	);
};

export default ReservationNotas;
