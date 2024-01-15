import { useMemo } from 'react';
import TableContainer from '../../../../Common/TableContainer';
import Loader from '../../../../Common/Loader';
import moment from 'moment';
import {
	Alert,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from 'reactstrap';
import showFriendlyMessafe from '../../../../../util/showFriendlyMessafe';
import TableReservation from '../ReservationClient/TableReservation';
import jsFormatNumber from '../../../../../util/jsFormatNumber';
import { useTranslation } from 'react-i18next';

const TablePaquete = ({
	tableTitle = null,
	itemData = [],
	errorItem = null,
	isFetchingItem = true,
	isSuccess,
	onHandleCreateReservation,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.tablePaquete',
	});
	const columns = useMemo(
		() => [
			{
				id: 'expander', // Make sure it has an ID
				style: {
					width: '3%',
				},
				Cell: ({ row }) => (
					<div className="d-flex">
						<div>
							{row.isExpanded ? (
								<i
									className="mdi mdi-chevron-up-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
									title={t('hideReservation')}
								/>
							) : (
								<i
									className="mdi mdi-chevron-down-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
									title={t('viewReservation')}
								/>
							)}
						</div>
					</div>
				),
			},
			{
				Header: 'Booking',
				accessor: 'idBooking',
				style: {
					width: '10%',
				},
			},
			{
				Header: t('package'),
				accessor: 'campaign.name',
				style: {
					width: '26%',
				},
			},
			{
				Header: t('shortSaleDate'),
				accessor: 'saleDate',
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
				style: {
					width: '10%',
				},
			},
			{
				Header: t('supervisor'),
				accessor: 'supervisor',
				style: {
					width: '10%',
				},
			},
			{
				Header: t('noPayments'),
				accessor: 'numberOfPayments',
				style: {
					width: '6%',
				},
			},
			{
				Header: t('balance'),
				accessor: 'balance',
				style: {
					width: '8%',
				},
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: t('agent'),
				accessor: 'user',
				style: {
					width: '10%',
				},
			},
			{
				Header: t('status'),
				accessor: 'reservationStatus.status',
				style: {
					width: '10%',
				},
			},
			{
				id: 'dropdown', // Make sure it has an ID
				style: {
					width: '7%',
				},
				Cell: ({ row }) => (
					<div className="d-flex">
						<div className="me-1">
							<i
								className="mdi mdi-database-plus fs-4 cursor-pointer text-success"
								title={t('createReservation')}
								onClick={() => onHandleCreateReservation(row)}
							/>
						</div>
						<div className="me-1">
							<i
								className="mdi mdi-calendar-cursor fs-4 cursor-pointer text-info"
								title={t('accessReservationModule')}
							/>
						</div>
						<div>
							<UncontrolledDropdown>
								<DropdownToggle
									className="text-dark dropdown-btn p-0"
									tag="a"
									role="button"
								>
									<i className="mdi mdi-dots-horizontal fs-4 cursor-pointer" />
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-end">
									<DropdownItem onClick={() => {}}>
										{t('promotionSend')}
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										{t('survey')}
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										{t('transferBookingToClient')}
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										{t('recording')}
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										{t('digitalFile')}
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</div>
					</div>
				),
			},
		],
		[t]
	);

	return (
		<div>
			{errorItem && !isFetchingItem && (
				<Alert color="danger" className="mb-0">
					{showFriendlyMessafe(errorItem?.code)}
				</Alert>
			)}
			{!isFetchingItem ? (
				<>
					<TableContainer
						columns={columns}
						data={isSuccess ? itemData.data.listPackages : []}
						className="custom-header-css"
						divClass="mb-3"
						tableClass="align-middle table-wrap"
						tableTitle={tableTitle}
						hover={false}
						renderRowSubComponent={(row) => (
							<div className="shadow bg-white m-2">
								<TableReservation
									booking={row.original.idBooking}
									tableClass={'m-0 align-middle table-wrap'}
									divClass="table-responsive"
									theadClass=""
									className=""
									hover={false}
								/>
							</div>
						)}
					/>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default TablePaquete;
