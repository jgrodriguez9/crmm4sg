import {
	Alert,
	Card,
	CardBody,
	Col,
	Container,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
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
import classNames from 'classnames';

const ReservationDetail = () => {
	const { idReservation } = useParams();
	const [dataView, setDataView] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [activeTab, setActiveTab] = useState('1');

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

	const tabChange = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

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
							<Col>
								<Card>
									<CardBody className="p-4">
										<Nav
											className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
											role="tablist"
										>
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '1',
													})}
													onClick={() => {
														tabChange('1');
													}}
													type="button"
												>
													<h5 className="text-primary">
														Detalle de la
														reservación
													</h5>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '2',
													})}
													onClick={() => {
														tabChange('2');
													}}
													type="button"
												>
													<h5 className="text-primary">
														Paxes
													</h5>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '3',
													})}
													onClick={() => {
														tabChange('3');
													}}
													type="button"
												>
													<h5 className="text-primary">
														Notas
													</h5>
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '4',
													})}
													onClick={() => {
														tabChange('4');
													}}
													type="button"
												>
													<h5 className="text-primary">
														Transportación
													</h5>
												</NavLink>
											</NavItem>
										</Nav>
										<hr />
										<Row>
											<Col>
												<TabContent
													activeTab={activeTab}
												>
													<TabPane tabId="1">
														{activeTab === '1' &&
															(editMode ? (
																<FormReservationInformation
																	editMode={
																		editMode
																	}
																	setEditMode={
																		setEditMode
																	}
																/>
															) : (
																<ViewReservationInformation
																	editMode={
																		editMode
																	}
																	setEditMode={
																		setEditMode
																	}
																	data={
																		itemData.data
																	}
																/>
															))}
													</TabPane>
												</TabContent>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</div>
	);
};

export default ReservationDetail;
