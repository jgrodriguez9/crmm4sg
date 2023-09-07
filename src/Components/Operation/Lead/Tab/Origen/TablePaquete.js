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

const TablePaquete = ({
	tableTitle = null,
	itemData = [],
	errorItem = null,
	isFetchingItem = true,
	isSuccess,
}) => {
	const columns = useMemo(
		() => [
			{
				Header: 'Booking',
				accessor: 'idBooking',
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Paquete',
				accessor: 'campaign.name',
				style: {
					width: '26%',
				},
			},
			{
				Header: 'F. Venta',
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
				Header: 'Supervisor',
				accessor: 'supervisor',
				style: {
					width: '10%',
				},
			},
			{
				Header: 'No. Pagos',
				accessor: 'numberOfPayments',
				style: {
					width: '6%',
				},
			},
			{
				Header: 'Saldo',
				accessor: 'balance',
				style: {
					width: '8%',
				},
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Usuario',
				accessor: 'user',
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Estatus',
				accessor: 'reservationStatus.status',
				style: {
					width: '10%',
				},
			},
			{
				id: 'expander', // Make sure it has an ID
				style: {
					width: '10%',
				},
				Cell: ({ row }) => (
					<div className="d-flex">
						<div>
							{row.isExpanded ? (
								<i
									className="mdi mdi-chevron-up-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
									title="Ocultar Reservación"
								/>
							) : (
								<i
									className="mdi mdi-chevron-down-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
									title="Ver Reservación"
								/>
							)}
						</div>
						<div className="me-1">
							<i
								className="mdi mdi-email-send fs-4 cursor-pointer text-success"
								title="Envío carta de compra"
							/>
						</div>
						<div className="me-1">
							<i
								className="mdi mdi-calendar-cursor fs-4 cursor-pointer text-info"
								title="Accesso a modulo de Reservaciones"
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
										Envío de promociones
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										Survey
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										Transferencia de booking a nuevo cliente
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										Grabaciones
									</DropdownItem>
									<DropdownItem onClick={() => {}}>
										Archivo digital
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</div>
					</div>
				),
			},
		],
		[]
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
