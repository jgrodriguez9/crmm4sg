import { useMemo, useState } from 'react';
import TableContainer from '../../../../Common/TableContainer';
import Loader from '../../../../Common/Loader';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalCanvas from '../../../../Common/GlobalCanvas';
import { useQuery } from 'react-query';
import {
	fecthReservation,
	fecthReservationById,
} from '../../../../../pages/Operation/Reservation/Util/services';
import moment from 'moment';
import diffDates from '../../../../../util/diffDates';
import { Alert, Col, Container, Row } from 'reactstrap';
import showFriendlyMessafe from '../../../../../util/showFriendlyMessafe';
import BannerInformation from '../../../../Common/BannerInformation';
import ViewReservationInformation from '../../../Reservation/ViewReservationInformation';
import parseObjectToQueryUrl from '../../../../../util/parseObjectToQueryUrl';
import PaginationManual from '../../../../Common/PaginationManual';
import { addMessage } from '../../../../../slices/messages/reducer';
import { useDispatch } from 'react-redux';
import TabsReservation from '../../../Reservation/TabsReservation';
import TableReservation from '../ReservationClient/TableReservation';

const TablePaquete = ({ customerId, tableTitle = null }) => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		customerId: customerId,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	// const {
	// 	data: reservationData,
	// 	error: errorReservationQuery,
	// 	isLoading,
	// 	isSuccess,
	// } = useQuery(
	// 	['getReservationPaginate', queryFilter],
	// 	() => fecthReservation(queryFilter),
	// 	{
	// 		keepPreviousData: true,
	// 	}
	// );
	// useEffect(() => {
	// 	if (errorReservationQuery?.code) {
	// 		dispatch(
	// 			addMessage({
	// 				message: showFriendlyMessafe(errorReservationQuery?.code),
	// 				type: 'error',
	// 			})
	// 		);
	// 	}
	// }, [errorReservationQuery, dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: 'Booking',
				accessor: 'booking',
			},
			{
				Header: 'Paquete',
				accessor: 'package',
			},
			{
				Header: 'F. Venta',
				accessor: 'dateSell',
			},
			{
				Header: 'Supervisor',
				accessor: 'supervisor',
			},
			{
				Header: 'No. Pagos',
				accessor: 'payments',
			},
			{
				Header: 'Saldo',
				accessor: 'saldo',
			},
			{
				Header: 'Usuario',
				accessor: 'user',
			},
			{
				Header: 'Estatus',
				accessor: 'status',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				id: 'expander', // Make sure it has an ID
				Cell: ({ row }) => (
					<div className="d-flex">
						<div>
							{row.isExpanded ? (
								<i
									className="bx bxs-chevron-up-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
								/>
							) : (
								<i
									className="bx bxs-chevron-down-circle text-primary fs-4 cursor-pointer"
									onClick={() => row.toggleRowExpanded()}
								/>
							)}
						</div>
					</div>
				),
			},
		],
		[]
	);
	const data = [
		{
			booking: '140964292',
			package: 'PKG 5/4 Laguna suite AU $599 USD',
			dateSell: '06/06/2023',
			supervisor: 'MACASHUMP',
			payments: 5,
			saldo: '$499.17',
			user: 'FCRGRTU',
			status: 'Procesable',
			email: 'Pagos',
		},
		{
			booking: '140964292',
			package: 'PKG 5/4 Laguna suite AU $599 USD',
			dateSell: '06/06/2023',
			supervisor: 'MACASHUMP',
			payments: 5,
			saldo: '$499.17',
			user: 'FCRGRTU',
			status: 'Procesable',
			email: 'Pagos',
		},
	];

	return (
		<div>
			{/* {!isLoading ? (
				<>
					<TableContainer
						columns={columns}
						data={isSuccess ? reservationData.data.list : []}
						className="custom-header-css"
						divClass="table-responsive table-card mb-3"
						tableClass="align-middle table-nowrap"
						theadClass="table-light"
					/>
					<PaginationManual
						query={query}
						setQuery={setQuery}
						setQueryFilter={setQueryFilter}
						totalPages={
							reservationData?.data?.pagination?.totalPages ?? 1
						}
					/>
				</>
			) : (
				<Loader />
			)} */}

			<TableContainer
				columns={columns}
				data={data}
				className="custom-header-css"
				divClass="table-responsive mb-3"
				tableClass="align-middle table-nowrap"
				tableTitle={tableTitle}
				hover={false}
				renderRowSubComponent={(row) => (
					<div className="shadow bg-white m-2">
						<TableReservation
							customerId={customerId}
							tableClass={'m-0'}
							divClass="table-responsive"
							theadClass=""
							className=""
							hover={false}
						/>
					</div>
				)}
			/>
		</div>
	);
};

export default TablePaquete;
