import { useMutation, useQuery } from 'react-query';
import { fecthPaymentByReservation } from '../../../pages/Operation/Reservation/Util/services';
import { useCallback, useMemo, useState } from 'react';
import jsFormatNumber from '../../../util/jsFormatNumber';
import moment from 'moment';
import { Alert, Col, Row } from 'reactstrap';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';
import BasicModal from '../../Common/BasicModal';
import FormPaymentClient from './Tab/Payment/FormPaymentClient';
import { useTranslation } from 'react-i18next';
import parseObjectToQueryUrl from '../../../util/parseObjectToQueryUrl';
import PaginationManual from '../../Common/PaginationManual';
import {
	deletePayment,
	getPaymentsByReservation,
} from '../../../helpers/payments';
import CellActions from '../../Common/CellActions';
import { deleteIconClass, editIconClass } from '../../constants/icons';
import DeleteModal from '../../Common/DeleteModal';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/messages/reducer';
import { DELETE_SUCCESS, ERROR_SERVER } from '../../constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';

const ReservationPayment = ({ ReservationId, reservation }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.reservationPayment',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	const [itemSelected, setItemSelected] = useState(null);
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		idReservation: ReservationId,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { data, error, isLoading, isSuccess, refetch, isFetching } = useQuery(
		['getPaymentsByReservation', queryFilter],
		() => getPaymentsByReservation(queryFilter),
		{
			keepPreviousData: true,
		}
	);
	console.log(data);

	const editRow = useCallback((row) => {
		console.log(row);
	}, []);
	const showDialogDelete = useCallback((row) => {
		const { original } = row;
		console.log(original);
		setItemSelected(original);
		setShowDeleteDialog(true);
	}, []);

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editRow,
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
				Header: t('id'),
				accessor: 'idPayment',
				filterable: false,
				width: '7%',
			},
			{
				Header: t('authorization'),
				accessor: 'authorization',
				filterable: false,
				width: '10%',
			},
			{
				Header: t('bank'),
				accessor: 'bank.name',
				filterable: false,
				width: '10%',
			},
			{
				Header: t('paymentType'),
				accessor: 'type',
				filterable: false,
				width: '8%',
			},
			{
				Header: t('amount'),
				accessor: 'amount',
				filterable: false,
				width: '8%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: t('currency'),
				accessor: 'currency.currency',
				filterable: false,
				width: '8%',
			},
			{
				Header: t('exchange'),
				accessor: 'exchangeRate',
				filterable: false,
				width: '6%',
			},
			{
				Header: `${t('amount')} (MXN)`,
				accessor: 'amountMXN',
				filterable: false,
				width: '8%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: t('user'),
				accessor: 'user',
				filterable: false,
				width: '10%',
			},
			{
				Header: t('department'),
				accessor: 'department.name',
				filterable: false,
				width: '10%',
			},
			{
				Header: t('creationDate'),
				accessor: 'paymentDate',
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
		[t]
	);

	const toggleDialog = () => setShowModal(!showModal);

	//delete item
	const { mutate: deleteItem, isLoading: isDeleting } = useMutation(
		deletePayment,
		{
			onSuccess: () => {
				refetch();
				setShowDeleteDialog(false);
				dispatch(
					addMessage({
						message: tMessage(DELETE_SUCCESS),
						type: 'success',
					})
				);
			},
			onError: (error) => {
				let message = tMessage(ERROR_SERVER);
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						message: message,
						type: 'error',
					})
				);
			},
		}
	);

	const handleDelete = async () => {
		const dataToDelete = {
			idReservation: ReservationId,
			idPayment: itemSelected.idPayment,
		};
		deleteItem(dataToDelete);
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
								setItemSelected(null);
								toggleDialog();
							}}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							{t('newPayment')}
						</button>
					</div>
				</Col>
				<Col xxl={12}>
					<div>
						{!isLoading ? (
							<>
								<TableContainer
									columns={columns}
									data={
										isSuccess ? data?.data?.list ?? [] : []
									}
									className="custom-header-css"
									divClass="mb-3"
									tableClass="align-middle table-wrap"
								/>
								<PaginationManual
									query={query}
									setQuery={setQuery}
									setQueryFilter={setQueryFilter}
									totalPages={
										data?.data?.pagination?.totalPages ?? 1
									}
									showTotal={true}
									totalCount={
										data?.data?.pagination?.totalCount ?? 0
									}
									isLoading={isFetching}
								/>
							</>
						) : (
							<Loader />
						)}
					</div>
				</Col>
				<BasicModal
					open={showModal}
					setOpen={setShowModal}
					title={t('addPayment')}
					size="lg"
					children={
						<FormPaymentClient
							toggleDialog={toggleDialog}
							reservation={reservation}
							payment={itemSelected}
						/>
					}
				/>
			</Row>
			<DeleteModal
				handleDelete={handleDelete}
				show={showDeleteDialog}
				setShow={setShowDeleteDialog}
				isDeleting={isDeleting}
			/>
		</>
	);
};

export default ReservationPayment;
