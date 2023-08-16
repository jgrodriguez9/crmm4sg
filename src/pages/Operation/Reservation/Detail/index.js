import { Alert, Col, Container, Row } from 'reactstrap';
import BannerInformation from '../../../../Components/Common/BannerInformation';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ViewReservationInformation from '../../../../Components/Operation/Reservation/ViewReservationInformation';
import FormReservationInformation from '../../../../Components/Operation/Reservation/FormReservationInformation';
import { useQuery } from 'react-query';
import { fecthReservationById } from '../Util/services';
import Loader from '../../../../Components/Common/Loader';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import diffDates from '../../../../util/diffDates';
import moment from 'moment';

const ReservationDetail = () => {
	const { idReservation } = useParams();
	const [dataView, setDataView] = useState(null);
	const [editMode, setEditMode] = useState(false);

	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
	} = useQuery(
		['getReservation', idReservation],
		() => fecthReservationById(idReservation),
		{
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if (itemData) {
			const { data } = itemData;
			const bannerData = {
				title: `ID: ${idReservation} - ${data?.hotel?.name ?? ''}`,
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
						value: moment(data?.initialDate, 'YYYY-MM-DD').format(
							'DD/MM/YYYY'
						),
						classes: 'text-muted',
					},
					{
						label: 'Salida',
						icon: null,
						value: moment(data?.finalDate, 'YYYY-MM-DD').format(
							'DD/MM/YYYY'
						),
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
	}, [idReservation, itemData]);

	return (
		<div className="page-content">
			<Container fluid>
				{isFetchingItem && (
					<Row className="pt-4">
						<Col>
							<Loader />
						</Col>
					</Row>
				)}
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
							<BannerInformation data={dataView} />
						</Row>
						<Row>
							{editMode ? (
								<FormReservationInformation
									editMode={editMode}
									setEditMode={setEditMode}
								/>
							) : (
								<ViewReservationInformation
									editMode={editMode}
									setEditMode={setEditMode}
									data={itemData.data}
								/>
							)}
						</Row>
					</>
				)}
			</Container>
		</div>
	);
};

export default ReservationDetail;
