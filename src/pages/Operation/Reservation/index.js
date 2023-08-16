import { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import ReservationFilter from '../../../Components/Operation/Reservation/ReservationFilter';
import TableContainer from '../../../Components/Common/TableContainer';
import Loader from '../../../Components/Common/Loader';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DetailCanvas from '../../../Components/Common/DetailCanvas';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import moment from 'moment';
import PaginationManual from '../../../Components/Common/PaginationManual';
import parseObjectToQueryUrl from '../../../util/parseObjectToQueryUrl';
import { fecthReservation, fecthReservationById } from './Util/services';
import diffDates from '../../../util/diffDates';

const initFilter = {
	//reserva
	id: '',
	booking: '',
	status: '',
	certificate: '',
	hotel: '',
	program: '',
	callCenter: '',
	segment: '',
	lastName: '',
	firstName: '',
	email: '',
	movil: '',
	checkInStart: '',
	checkInEnd: '',
	registedDateStart: '',
	registedDateEnd: '',
	campaing: '',
	country: '',
	state: '',
};
const initFilterModel = {
	statusModel: null,
	hotelModel: null,
	programModel: null,
	callCenterModel: null,
	segmentModel: null,
	campaingModel: null,
};

const Reservation = () => {
	document.title = 'Reservación | CRM - M4SG';
	const dispatch = useDispatch();
	const [idItem, setIdItem] = useState(null);
	const navigate = useNavigate();
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		...initFilter,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	//service
	const {
		data: reservationData,
		error: errorReservationQuery,
		isLoading,
		isSuccess,
	} = useQuery(
		['getReservationPaginate', queryFilter],
		() => fecthReservation(queryFilter),
		{
			keepPreviousData: true,
		}
	);

	const [filterDialog, setFilterDialog] = useState(false);
	const [dataSelect, setDataSelect] = useState(initFilterModel);
	//detail canva
	const [showDetail, setShowDetail] = useState(false);
	const [info, setInfo] = useState(null);

	const toggleFilter = () => {
		setFilterDialog(!filterDialog);
	};

	const builtDetailCanvasReservation = (item) => {
		console.log(item);
		const header = {
			title: {
				label: `ID: Reservación: `,
				value: item.id,
			},
			img: null,
			body: [
				{
					label: `ID: Booking: `,
					value: item?.booking ?? '',
				},
				{
					label: `ID: Confirmación: `,
					value: item?.confirm ?? '',
				},
			],
		};
		const detailReservation = {
			id: 'detailReservation',
			title: 'Detalle de la reservación',
			collapse: false,
			body: [
				{
					label: 'Hotel',
					value: item?.hotel?.name ?? '',
				},
				{
					label: 'Plan',
					value: '-',
				},
				{
					label: 'Fecha llegada',
					value: moment(item?.initialDate, 'YYYY-MM-DD').format(
						'DD/MM/YYYY'
					),
				},
				{
					label: 'Fecha salida',
					value: moment(item?.finalDate, 'YYYY-MM-DD').format(
						'DD/MM/YYYY'
					),
				},
				{
					label: 'Tipo de habitación',
					value: '',
				},
				{
					label: 'Noches',
					value: diffDates(
						item?.initialDate,
						item?.finalDate,
						'days'
					),
				},
				{
					label: 'Adultos',
					value: item?.adult ?? '',
				},
				{
					label: 'Juniors',
					value: '',
				},
				{
					label: 'Menores gratis',
					value: '',
				},
				{
					label: 'Menores pagan',
					value: item?.child ?? '',
				},
				{
					label: 'Infantes',
					value: item?.infant ?? '',
				},
			],
		};
		const detailCliente = {
			id: 'detailCliente',
			title: 'Detalle del titular',
			collapse: true,
			body: [
				{
					label: 'Estado civil',
					value: item?.maritalStatus ?? '',
				},
				{
					label: 'Ingreso',
					value: item?.income ?? '',
				},
				{
					label: 'Tarjetas',
					value: item?.visa + item?.amex + item?.mc,
				},
				{
					label: 'Visa',
					value: item?.visa > 0,
				},
				{
					label: 'Master Card',
					value: item?.mc > 0,
				},
				{
					label: 'Amex',
					value: item?.amex > 0,
				},
				{
					label: 'Otras',
					value: false,
				},
				{
					label: 'Cual?',
					value: '',
				},
				{
					label: 'Estado de ánimo',
					value: '',
				},
			],
		};
		const detailOperacion = {
			id: 'detailOperacion',
			title: 'Detalle de la operación',
			collapse: true,
			body: [
				{
					label: 'Call center',
					value: item?.callcenter?.name ?? '',
				},
				{
					label: 'Segmento',
					value: item?.segment?.name ?? '',
				},
				{
					label: 'Programa',
					value: item?.program?.name ?? '',
				},
				{
					label: 'Hooked',
					value: item?.hooked,
				},
			],
		};
		const obj = {
			title: `ID: Reservación: ${item.id}`,
			header: header,
			items: [detailReservation, detailCliente, detailOperacion],
			goToView: `/reservation/${item.id}`,
		};
		return obj;
	};

	//service to get the reservation
	const {
		data: itemData,
		error: errrorItem,
		isFetching: isFetchingItem,
	} = useQuery(
		['getReservation', idItem],
		() => fecthReservationById(idItem),
		{
			enabled: idItem !== null,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (itemData && !isFetchingItem) {
			const data = builtDetailCanvasReservation(itemData.data);
			setInfo(data);
		}
	}, [itemData, isFetchingItem]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id Reservación',
				accessor: 'id',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			{
				Header: 'Confirmación',
				accessor: 'confirm',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			{
				Header: 'Nombre',
				accessor: 'customer.firstName',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
				Cell: ({ row, value }) =>
					`${value.toUpperCase()} ${row.original.customer.lastName.toUpperCase()}`,
			},
			{
				Header: 'Id Booking',
				accessor: 'booking',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			{
				Header: 'LLegada',
				accessor: 'initialDate',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				Header: 'Salida',
				accessor: 'finalDate',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				id: 'action',
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li
								className="list-inline-item edit"
								title="Vista previa"
							>
								<Link
									to="#"
									className="text-muted d-inline-block"
								>
									<i
										className="ri-file-search-fill fs-16"
										onClick={() => {
											setIdItem(
												cellProps.row.original.id
											);
											setShowDetail(true);
										}}
									></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	const gotToPage = (row) => {
		navigate(`/reservation/${row.id}`);
	};

	useEffect(() => {
		if (errorReservationQuery?.code) {
			dispatch(
				addMessage({
					message: showFriendlyMessafe(errorReservationQuery?.code),
					type: 'error',
				})
			);
		}
	}, [errorReservationQuery, dispatch]);

	const buscar = () => {
		setFilterDialog(false);
		const copyQuery = { ...query, page: 1 };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const onCleanFilter = () => {
		setFilterDialog(false);
		const copyQuery = { max: 10, page: 1, ...initFilter };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
		setDataSelect(initFilterModel);
	};
	return (
		<>
			<div className="page-content">
				<Container fluid>
					<div className="mb-2">
						<BreadCrumb
							title="Reservaciones"
							pageTitle="Inicio"
							urlPageTitle="/dashboard"
							filter={{
								allow: true,
								action: toggleFilter,
								cleanFilter: onCleanFilter,
							}}
						/>
					</div>

					<Row>
						<Col xxl={12}>
							<Card id="contactList">
								<CardBody className="pt-0">
									<div>
										{!isLoading ? (
											<>
												<TableContainer
													columns={columns}
													data={
														isSuccess
															? reservationData
																	.data.list
															: []
													}
													className="custom-header-css"
													divClass="table-responsive table-card mb-3"
													tableClass="align-middle table-nowrap"
													theadClass="table-light"
													onSelectRow={gotToPage}
												/>
												<PaginationManual
													query={query}
													setQuery={setQuery}
													setQueryFilter={
														setQueryFilter
													}
													totalPages={
														reservationData?.data
															?.pagination
															?.totalPages ?? 1
													}
												/>
											</>
										) : (
											<Loader />
										)}
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<ReservationFilter
				show={filterDialog}
				onCloseClick={() => setFilterDialog(false)}
				query={query}
				setQuery={setQuery}
				buscar={buscar}
				dataSelect={dataSelect}
				setDataSelect={setDataSelect}
				onCleanFilter={onCleanFilter}
			/>
			<DetailCanvas
				show={showDetail}
				onCloseClick={() => {
					setShowDetail(false);
				}}
				data={info}
				error={errrorItem}
				isLoading={isFetchingItem}
			/>
		</>
	);
};

export default Reservation;
