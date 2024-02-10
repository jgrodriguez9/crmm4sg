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
import useRole from '../../../hooks/useRole';

const getUserComission = ({ row }) => {
	const { original } = row;
	if (original.paymentServices.length > 0) {
		return original.paymentServices[0].serviceContract?.userComission ?? '';
	}
	return '';
};

const getParseServices = (value) => {
	return (
		<ul className="m-0 ps-3">
			{value?.map((it) => (
				<li key={it.id}>{it.serviceContract?.subService?.name}</li>
			))}
		</ul>
	);
};

const ReservationPayment = ({ ReservationId, reservation }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.reservationPayment',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const dispatch = useDispatch();
	const { isSupervisor, isManager } = useRole();
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
	const editRow = useCallback((row) => {
		console.log(row);
		const { original } = row;
		setItemSelected(original);
		setShowModal(true);
	}, []);
	const showDialogDelete = useCallback((row) => {
		const { original } = row;
		setItemSelected(original);
		setShowDeleteDialog(true);
	}, []);

	const actions = useMemo(
		() => [
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
		],
		[editRow, showDialogDelete, t]
	);

	const defaultColumns = useMemo(
		() => [
			{
				Header: t('id'),
				accessor: 'idPayment',
				filterable: false,
				width: '6%',
			},
			{
				Header: t('bank'),
				accessor: 'bank.name',
				filterable: false,
				width: '18%',
			},
			{
				Header: t('affiliation'),
				accessor: 'affiliation.name',
				filterable: false,
				width: '15%',
			},
			{
				Header: t('services'),
				accessor: 'paymentServices',
				filterable: false,
				width: '20%',
				Cell: ({ value }) => getParseServices(value),
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
				Cell: ({ row, value }) =>
					`(${row.original.currency.isoCode}) ${value}`,
			},
			{
				Header: t('paymentDate'),
				accessor: 'paymentDate',
				filterable: false,
				width: '8%',
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
			},
			{
				Header: t('user'),
				accessor: 'user',
				filterable: false,
				width: '10%',
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

	const columns = useMemo(() => {
		if (isSupervisor || isManager) {
			defaultColumns.splice(7, 0, {
				Header: t('userComission'),
				id: 'userComission',
				filterable: false,
				style: {
					width: '15%',
				},
				Cell: getUserComission,
			});
			return defaultColumns;
		} else {
			return defaultColumns;
		}
	}, [isSupervisor, defaultColumns, t, isManager]);

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
