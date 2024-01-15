import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import ReservationFilter from '../../../Components/Operation/Reservation/ReservationFilter';
import TableContainer from '../../../Components/Common/TableContainer';
import Loader from '../../../Components/Common/Loader';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
import BasicModal from '../../../Components/Common/BasicModal';
import FormReservationInformation from '../../../Components/Operation/Reservation/FormReservationInformation';
import CardHeaderGlobal from '../../../Components/Common/CardHeaderGlobal';
import FilterCommandGlobal from '../../../Components/Common/FilterCommandGlobal';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.reservation.list',
	});
	document.title = t('header');
	const dispatch = useDispatch();
	const [idItem, setIdItem] = useState(null);
	const [showModal, setShowModal] = useState(false);
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
		refetch,
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
		//console.log(item);
		const header = {
			title: {
				label: `${t('idReservation')}: `,
				value: item.id,
			},
			img: null,
			body: [
				{
					label: `${t('idBooking')}: `,
					value: item?.booking ?? '',
				},
				{
					label: `${t('idConfirmation')}: `,
					value: item?.confirm ?? '',
				},
			],
		};
		const detailReservation = {
			id: 'detailReservation',
			title: t('reservationDetail'),
			collapse: false,
			body: [
				{
					label: t('hotel'),
					value: item?.hotel?.name ?? '',
				},
				{
					label: t('plan'),
					value: '-',
				},
				{
					label: t('check-in'),
					value: moment(item?.initialDate, 'YYYY-MM-DD').format(
						'DD/MM/YYYY'
					),
				},
				{
					label: t('check-out'),
					value: moment(item?.finalDate, 'YYYY-MM-DD').format(
						'DD/MM/YYYY'
					),
				},
				{
					label: t('roomType'),
					value: '',
				},
				{
					label: t('nights'),
					value: diffDates(
						item?.initialDate,
						item?.finalDate,
						'days'
					),
				},
				{
					label: t('adults'),
					value: item?.adult ?? '',
				},
				{
					label: t('children'),
					value: item?.child ?? '',
				},
				{
					label: t('infants'),
					value: item?.infant ?? '',
				},
			],
		};
		const detailCliente = {
			id: 'detailCliente',
			title: t('ownerDetail'),
			collapse: true,
			body: [
				{
					label: t('name'),
					value: `${item?.customer?.firstName} ${
						item?.customer?.lastName ?? ''
					}`,
				},
				{
					label: t('maritalStatus'),
					value: item?.maritalStatus ?? '',
				},
				{
					label: t('income'),
					value: item?.income ?? '',
				},
				{
					label: t('cards'),
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
					label: t('others'),
					value: false,
				},
				{
					label: t('mood'),
					value: '',
				},
			],
		};
		const detailOperacion = {
			id: 'detailOperacion',
			title: t('operationDetail'),
			collapse: true,
			body: [
				{
					label: 'Call center',
					value: item?.callcenter?.name ?? '',
				},
				{
					label: t('segment'),
					value: item?.segment?.name ?? '',
				},
				{
					label: t('program'),
					value: item?.program?.name ?? '',
				},
				{
					label: 'Hooked',
					value: item?.hooked,
				},
			],
		};
		const obj = {
			title: `${t('idReservation')}: ${item.id}`,
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
				Header: 'Id',
				accessor: 'id',
				filterable: false,
				width: '7%',
				Cell: ({ value }) => (
					<Link
						to={`/reservation/${value}`}
						className="link-primary link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover"
					>
						{value}
					</Link>
				),
			},
			{
				Header: t('confirmation'),
				accessor: 'confirm',
				filterable: false,
				width: '8%',
			},
			{
				Header: 'Booking',
				accessor: 'booking',
				filterable: false,
				width: '7%',
			},
			{
				Header: t('name'),
				accessor: 'customer.firstName',
				filterable: false,
				width: '12%',
				Cell: ({ row, value }) =>
					`${value.toUpperCase()} ${row.original.customer.lastName.toUpperCase()}`,
			},
			{
				Header: t('hotel'),
				accessor: 'hotel.name',
				filterable: false,
				width: '13%',
			},
			{
				Header: t('plan'),
				accessor: 'intPlan.name',
				filterable: false,
				width: '13%',
			},
			{
				Header: t('shortCheckInLabel'),
				accessor: 'initialDate',
				filterable: false,
				width: '8%',
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				Header: t('shortCheckOutLabel'),
				accessor: 'finalDate',
				filterable: false,
				width: '8%',
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				Header: 'Call center',
				accessor: 'callcenter.name',
				filterable: false,
				width: '9%',
			},
			{
				Header: t('adults'),
				accessor: 'adult',
				filterable: false,
				width: '4%',
			},
			{
				Header: t('status'),
				accessor: 'status.name',
				filterable: false,
				width: '7%',
			},
			{
				id: 'action',
				width: '4%',
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
										className="ri-file-search-fill fs-16 text-secondary"
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
	const toggleDialog = () => {
		setShowModal(!showModal);
	};
	return (
		<>
			<div className="page-content">
				<Container fluid>
					<Row>
						<Col xxl={12}>
							<Card className="shadow">
								<CardHeaderGlobal
									title={t('title')}
									add={{
										action: toggleDialog,
										title: t('createReservation'),
									}}
								/>
								<CardBody className="pt-0">
									<FilterCommandGlobal
										toggleFilter={toggleFilter}
										onCleanFilter={onCleanFilter}
									/>
									<div>
										{!isLoading ? (
											<>
												<TableContainer
													columns={columns}
													data={
														isSuccess
															? reservationData
																	?.data
																	?.list ?? []
															: []
													}
													className="custom-header-css"
													divClass="table-responsive mb-3"
													tableClass="align-middle"
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
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title={t('createReservation')}
				size="xl"
				classBody="py-1 px-3"
				children={
					<FormReservationInformation
						toggleDialog={toggleDialog}
						refetch={refetch}
					/>
				}
			/>
		</>
	);
};

export default Reservation;
