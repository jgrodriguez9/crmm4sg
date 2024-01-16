import moment from 'moment';
import { useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import TableContainer from '../../Common/TableContainer';
import { useState } from 'react';
import BasicModal from '../../Common/BasicModal';
import CellActions from '../../Common/CellActions';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import { useDispatch } from 'react-redux';
import FormTransportacion from './Tab/Transportation/FormTransportacion';
import { useTranslation } from 'react-i18next';

const ReservationTransportation = ({ reservationId }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.reservationTransportation',
	});
	const [showModal, setShowModal] = useState(false);
	const [item, setItem] = useState(null);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const dispatch = useDispatch();
	// const { data, error, isLoading, isSuccess, refetch } = useQuery(
	// 	['getPaxesByReservation', reservationId],
	// 	() => fecthPaxesByReservation(reservationId),
	// 	{
	// 		keepPreviousData: true,
	// 	}
	// );
	//delete pax
	// const {
	// 	mutate: deletePaxMutation,
	// 	isLoading: isDeleting,
	// 	isError,
	// 	error: errorDel,
	// 	isSuccess: isSuccessDel,
	// } = useMutation(deletePaxService);

	const editPax = (row) => {
		const { original } = row;
		setItem({
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
		setItem({ id: original.id });
	};

	// useEffect(() => {
	// 	if (isSuccessDel) {
	// 		refetch();
	// 		setShowDeleteDialog(false);
	// 		dispatch(
	// 			addMessage({
	// 				message: DELETE_SUCCESS,
	// 				type: 'success',
	// 			})
	// 		);
	// 	} else if (isError) {
	// 		let message = ERROR_SERVER;
	// 		message = extractMeaningfulMessage(errorDel, message);
	// 		dispatch(
	// 			addMessage({
	// 				message: message,
	// 				type: 'error',
	// 			})
	// 		);
	// 	}
	// }, [isSuccessDel, isError, dispatch, errorDel, refetch]);

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editPax,
			labelTooltip: t('edit'),
		},
		{
			iconClass: `${deleteIconClass} fs-5 text-danger`,
			click: showDialogDelete,
			labelTooltip: t('delete'),
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: t('name'),
				accessor: 'firstName',
				filterable: false,
				width: '40%',
				Cell: ({ row, value }) =>
					`${value.toUpperCase()} ${row.original.lastName.toUpperCase()}`,
			},
			{
				Header: t('relationship'),
				accessor: 'relation',
				filterable: false,
				width: '20%',
			},
			{
				Header: t('occupation'),
				accessor: 'occupation',
				filterable: false,
				width: '15%',
			},
			{
				Header: t('birthDay'),
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
		[]
	);

	const toggleDialog = () => setShowModal(!showModal);

	// const handleDelete = async () => {
	// 	const dataToDelete = {
	// 		idPax: pax.id,
	// 		idReservation: reservationId,
	// 	};
	// 	deletePaxMutation(dataToDelete);
	// };

	return (
		<>
			{/* {error && !isLoading && (
				<Row>
					<Col xs="12" md={{ size: 4, offset: 4 }}>
						<Alert color="danger" className="mb-0">
							{showFriendlyMessafe(error?.code)}
						</Alert>
					</Col>
				</Row>
			)} */}
			<Row>
				<Col xxl={12}>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={() => {
								toggleDialog();
								setItem(null);
							}}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							{t('newTransportation')}
						</button>
					</div>
				</Col>
				<Col xxl={12}>
					<div>
						<TableContainer
							columns={columns}
							data={[]}
							className="custom-header-css"
							divClass="mb-3"
							tableClass="align-middle table-wrap"
						/>
						{/* {!isLoading ? (
							<>
								<TableContainer
									columns={columns}
									data={[]}
									className="custom-header-css"
									divClass="mb-3"
									tableClass="align-middle table-wrap"
								/>
							</>
						) : (
							<Loader />
						)} */}
					</div>
				</Col>
			</Row>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title={`${
					item ? t('editTransportation') : t('addTransportation')
				}`}
				size="lg"
				children={
					<FormTransportacion
						toggleDialog={toggleDialog}
						reservationId={reservationId}
						refetch={() => {}}
						item={item}
					/>
				}
			/>
			{/* <DeleteModal
				handleDelete={handleDelete}
				show={showDeleteDialog}
				setShow={setShowDeleteDialog}
				isDeleting={isDeleting}
			/> */}
		</>
	);
};

export default ReservationTransportation;
