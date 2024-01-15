import { Alert, Col, Container, Row } from 'reactstrap';
import BannerInformation from '../../../../Components/Common/BannerInformation';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fecthReservationById } from '../Util/services';
import Loader from '../../../../Components/Common/Loader';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import diffDates from '../../../../util/diffDates';
import moment from 'moment';
import TabsReservation from '../../../../Components/Operation/Reservation/TabsReservation';
import { useTranslation } from 'react-i18next';

const ReservationDetail = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.reservation.detail',
	});
	document.title = t('header');
	const { idReservation } = useParams();
	const [dataView, setDataView] = useState(null);

	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
		refetch: refetchReservation,
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
				title: `${t('id')}: ${idReservation} - ${
					data?.hotel?.name ?? ''
				}`,
				subTitle: `${data?.customer?.firstName ?? ''} ${
					data?.customer?.lastName
				}`,
				subTitleInfo: {
					label: t('plan'),
					value: data?.intPlan?.name ?? '-',
					classes: 'text-muted',
				},
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
								title: t('nights'),
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-2-line',
								value: data?.adult ?? '-',
								title: t('adults'),
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-user-follow-line',
								value: data?.child ?? '-',
								title: t('children'),
								classes: 'text-muted',
							},
							{
								label: null,
								icon: 'ri-emotion-happy-line',
								value: data?.infant ?? '-',
								title: t('infants'),
								classes: 'text-muted',
							},
						],
						classes: 'text-muted',
					},
					{
						label: t('shortCheckInLabel'),
						icon: null,
						value: moment(data?.initialDate, 'YYYY-MM-DD').format(
							'DD/MM/YYYY'
						),
						classes: 'text-muted',
					},
					{
						label: t('shortCheckOutLabel'),
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
				sale: data.sale,
			};
			setDataView(bannerData);
		}
	}, [idReservation, itemData, t]);

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
							<Col>
								<TabsReservation
									itemData={itemData}
									refetchReservation={refetchReservation}
								/>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</div>
	);
};

export default ReservationDetail;
