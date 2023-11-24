import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Alert, Col, Row } from 'reactstrap';
import { fecthPaxesByReservation } from '../../../pages/Operation/Reservation/Util/services';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import { useState } from 'react';
import BasicModal from '../../Common/BasicModal';
import FormPaxes from './Tab/Paxes/FormPaxes';
import CellActions from '../../Common/CellActions';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import { deletePaxService } from '../../../services/pax';
import DeleteModal from '../../Common/DeleteModal';
import { DELETE_SUCCESS, ERROR_SERVER } from '../../constants/messages';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';
import { getRelationship } from '../../../helpers/pax';

const ReservationPaxes = ({ reservationId }) => {
	const [showModal, setShowModal] = useState(false);
	const [pax, setPax] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const dispatch = useDispatch();
	const { data, error, isLoading, isSuccess, refetch } = useQuery(
		['getPaxesByReservation', reservationId],
		() => fecthPaxesByReservation(reservationId),
		{
			keepPreviousData: true,
		}
	);
	//realtions ships
	//query to get relationship
	const { data: dataRelationships } = useQuery(
		'getRelationship',
		async () => {
			const response = await getRelationship();
			return response;
		},
		{
			select: (response) => {
				return (
					response.data.relationList.map((item) => ({
						value: item.id,
						label: item.spanishDescription,
					})) ?? []
				);
			},
		}
	);
	//delete pax
	const {
		mutate: deletePaxMutation,
		isLoading: isDeleting,
		isError,
		error: errorDel,
		isSuccess: isSuccessDel,
	} = useMutation(deletePaxService);

	const editPax = (row) => {
		const { original } = row;
		setPax({
			id: original.id ?? '',
			firstName: original.firstName ?? '',
			lastName: original.lastName ?? '',
			fechadnacimiento: original.fechadnacimiento ?? '',
			age: original.age ?? '',
			relation: original.relation ?? null,
			occupation: original.occupation ?? '',
		});
		setShowModal(true);
	};
	const showDialogDelete = (row) => {
		setShowDeleteDialog(true);
		const { original } = row;
		setPax({ id: original.id });
	};

	useEffect(() => {
		if (isSuccessDel) {
			refetch();
			setShowDeleteDialog(false);
			dispatch(
				addMessage({
					message: DELETE_SUCCESS,
					type: 'success',
				})
			);
		} else if (isError) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(errorDel, message);
			dispatch(
				addMessage({
					message: message,
					type: 'error',
				})
			);
		}
	}, [isSuccessDel, isError, dispatch, errorDel, refetch]);

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editPax,
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
				Header: 'Nombre',
				accessor: 'firstName',
				filterable: false,
				width: '40%',
				Cell: ({ row, value }) =>
					`${value?.toUpperCase()} ${row.original.lastName?.toUpperCase()}`,
			},
			{
				Header: 'Relación',
				accessor: 'relation',
				filterable: false,
				width: '20%',
				Cell: ({ value }) =>
					dataRelationships?.find((it) => it.value === value)
						?.label ?? value,
			},
			{
				Header: 'Ocupación',
				accessor: 'occupation',
				filterable: false,
				width: '15%',
			},
			{
				Header: 'Fecha nacimiento',
				accessor: 'fechadnacimiento',
				filterable: false,
				width: '15%',
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
			},
			{
				id: 'action',
				width: '10%',
				Cell: ({ row }) => {
					return <CellActions actions={actions} row={row} />;
				},
			},
		],
		[dataRelationships]
	);

	const toggleDialog = () => setShowModal(!showModal);

	const handleDelete = async () => {
		const dataToDelete = {
			idPax: pax.id,
			idReservation: reservationId,
		};
		deletePaxMutation(dataToDelete);
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
							onClick={() => {
								toggleDialog();
								setPax(null);
							}}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Nuevo acompañante
						</button>
					</div>
				</Col>
				<Col xxl={12}>
					<div>
						{!isLoading ? (
							<>
								<TableContainer
									columns={columns}
									data={isSuccess ? data.data.list : []}
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
				title={`${pax ? 'Editar Acompañante' : 'Agregar Acompañante'}`}
				size="md"
				children={
					<FormPaxes
						toggleDialog={toggleDialog}
						reservationId={reservationId}
						refetchPaxs={refetch}
						pax={pax}
						dataRelationships={dataRelationships}
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

export default ReservationPaxes;
