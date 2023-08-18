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

const TableReservation = ({ customerId }) => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		customerId: customerId,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
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
	const [idItem, setIdItem] = useState(null);
	const [showCanvas, setShowCanvas] = useState(false);
	const [dataView, setDataView] = useState(null);

	const columns = useMemo(
		() => [
			{
				Header: 'ID. Reservación',
				accessor: 'id',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Confirmación',
				accessor: 'confirm',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Booking',
				accessor: 'booking',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Hotel',
				accessor: 'hotel.name',
				filterable: false,
				style: {
					width: '35%',
				},
			},
			{
				Header: 'Fecha llegada',
				accessor: 'initialDate',
				filterable: false,
				style: {
					width: '15%',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				Header: 'Fecha salida',
				accessor: 'finalDate',
				filterable: false,
				style: {
					width: '15%',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			},
			{
				id: 'action',
				style: {
					width: '5%',
				},
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
											setShowCanvas(true);
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

	const {
		data: itemData,
		error: errorItem,
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
		if (itemData) {
			const { data } = itemData;
			const bannerData = {
				title: `ID: ${idItem} - ${data?.hotel?.name ?? ''}`,
				subTitle: `${data?.customer?.firstName ?? ''} ${
					data?.customer?.lastName
				}`,
				subInfo: [
					{
						label: null,
						icon: null,
						value: [
							{
								label: null,
								icon: 'ri-hotel-bed-line',
								value: diffDates(
									data?.initialDate,
									data?.finalDate,
									'days'
								),
								title: 'Noches',
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-2-line',
								value: data?.adult ?? '-',
								title: 'Adultos',
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-3-line',
								value: '-',
								title: 'Juniors',
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-unfollow-line',
								value: '-',
								title: 'Menores que no pagan',
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-follow-line',
								value: data?.child ?? '-',
								title: 'Menores que pagan',
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-emotion-happy-line',
								value: data?.infant ?? '-',
								title: 'Infantes',
								classes: 'text-muted',
							},
						],
						classes: 'text-muted',
					},
					{
						label: 'Plan',
						icon: null,
						value: '-',
						classes: 'text-muted',
					},
					{
						label: 'Llegada',
						icon: null,
						value: data?.initialDate
							? moment(data?.initialDate, 'YYYY-MM-DD').format(
									'DD/MM/YYYY'
							  )
							: '-',
						classes: 'text-muted',
					},
					{
						label: 'Salida',
						icon: null,
						value: data?.finalDate
							? moment(data?.finalDate, 'YYYY-MM-DD').format(
									'DD/MM/YYYY'
							  )
							: '-',
						classes: 'text-muted',
					},
					{
						label: null,
						icon: null,
						value: data?.status?.name ?? '-',
						classes: 'badge rounded-pill bg-success fs-12',
					},
				],
			};
			setDataView(bannerData);
		}
	}, [idItem, itemData]);

	const childrenContent = (
		<Container fluid>
			{isFetchingItem && <Loader />}
			{errorItem && !isFetchingItem && (
				<Row>
					<Col xs="12" md={{ size: 4, offset: 4 }}>
						<Alert color="danger" className="mb-0">
							{showFriendlyMessafe(errorItem?.code)}
						</Alert>
					</Col>
				</Row>
			)}
			{itemData && !isFetchingItem && !errorItem && (
				<>
					<Row>
						<BannerInformation
							data={dataView}
							showBreadcrumb={false}
						/>
					</Row>
					<Row>
						<ViewReservationInformation data={itemData.data} />
					</Row>
				</>
			)}
		</Container>
	);

	return (
		<div>
			{!isLoading ? (
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
			)}
			<GlobalCanvas
				show={showCanvas}
				onCloseClick={() => {
					setShowCanvas(false);
				}}
				title={'Reservación'}
				children={childrenContent}
				fullWidth={true}
			/>
		</div>
	);
};

export default TableReservation;
