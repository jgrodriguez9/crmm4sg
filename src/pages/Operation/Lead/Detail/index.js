import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Alert,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import classNames from 'classnames';
import NotasCliente from '../../../../Components/Operation/Lead/Tab/NotasCliente';
import SMSClient from '../../../../Components/Operation/Lead/Tab/SMSClient';
import WhatsappClient from '../../../../Components/Operation/Lead/Tab/WhatsappClient';
import MarketingMailClient from '../../../../Components/Operation/Lead/Tab/MarketingMailClient';
import { useQuery } from 'react-query';
import { fecthItem } from '../Util/services';
import Loader from '../../../../Components/Common/Loader';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import { clickToCall } from '../../../../helpers/customer';
import { ERROR_SERVER } from '../../../../Components/constants/messages';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../slices/messages/reducer';
import { toast } from 'react-toastify';
import ClickToCallAlert from '../../../../Components/Operation/Lead/ClickToCall/ClickToCallAlert';
import { useEffect } from 'react';
import OriginClient from '../../../../Components/Operation/Lead/Tab/OriginClient';
import BasicModal from '../../../../Components/Common/BasicModal';
import FormClient from '../../../../Components/Operation/Lead/Tab/LeadInformation/FormClient';
import moment from 'moment';
import { DATE_FORMAT } from '../../../../common/globalsProp';

const LeadProfile = () => {
	document.title = 'Detalle del Lead | CRM - M4S';
	const { id } = useParams();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [activeTab, setActiveTab] = useState('6');
	const [dataLeft, setDataLeft] = useState([]);
	const tabChange = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
		refetch: refetchClient,
	} = useQuery(['getCustomer', id], () => fecthItem(id), {
		refetchOnWindowFocus: false,
	});

	const onHandleClickToCall = async (phoneType) => {
		toast(<ClickToCallAlert />, {
			autoClose: false,
			position: 'top-right',
		});
		try {
			// const body = {
			// 	customerId: data.id,
			// 	//option: phoneType
			// 	//extension: '?'
			// };
			//test
			let formdata = new FormData();
			formdata['customerId'] = 930706;
			const response = await clickToCall(formdata, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response);
		} catch (error) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(error, message);
			dispatch(
				addMessage({
					message: message,
					type: 'error',
				})
			);
		}
	};

	useEffect(() => {
		if (itemData?.data && !errorItem) {
			const telefonos = [];
			if (itemData?.data?.phone1) {
				const phone1 = {
					title: itemData?.data?.phone1,
					iconClass:
						'fs-15 ri-phone-line text-primary cursor-pointer',
					action: () => onHandleClickToCall('phone1'),
				};
				telefonos.push(phone1);
			}
			if (itemData?.data?.phone2) {
				const phone2 = {
					title: itemData?.data?.phone2,
					iconClass:
						'fs-15 ri-phone-line text-primary cursor-pointer',
					action: () => onHandleClickToCall('phone2'),
				};
				telefonos.push(phone2);
			}
			if (itemData?.data?.phone3) {
				const phone3 = {
					title: itemData?.data?.phone3,
					iconClass:
						'fs-15 ri-phone-line text-primary cursor-pointer',
					action: () => onHandleClickToCall('phone3'),
				};
				telefonos.push(phone3);
			}
			if (itemData?.data?.movil) {
				const movil = {
					title: itemData?.data?.movil,
					iconClass:
						'fs-15 ri-phone-line text-primary cursor-pointer',
					action: () => onHandleClickToCall('movil'),
				};
				telefonos.push(movil);
			}

			const parseInfoLeft = [
				{
					tableClass:
						'table table-sm pb-3 fs-7 table-borderless border-bottom w-100',
					header: null,
					body: [
						{
							title: 'Correo',
							items: [
								{
									title: itemData?.data?.email,
									iconClass:
										'fs-15 ri-mail-line text-danger cursor-pointer',
									action: () => {},
								},
							],
						},
						{
							title: 'Teléfonos',
							items: [...telefonos],
						},
					],
				},
				{
					tableClass:
						'table table-sm align-middle pb-3 fs-7 table-borderless border-bottom w-100',
					header: { title: 'Información principal' },
					body: [
						{
							title: 'Contrato',
							items: [
								{
									title: itemData?.data?.contract,
									iconClass: null,
									action: () => {},
								},
							],
						},
					],
				},
				{
					tableClass:
						'table table-sm align-middle pb-3 fs-7 table-borderless w-100',
					header: { title: 'Acerca de este cliente' },
					body: [
						{
							title: 'Dirección',
							items: [
								{
									title: itemData?.data?.address,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'País',
							items: [
								{
									title: itemData?.data?.country,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Estado',
							items: [
								{
									title: itemData?.data?.state,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Ciudad',
							items: [
								{
									title: itemData?.data?.city,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'CP',
							items: [
								{
									title: itemData?.data?.postalCode,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Ingreso',
							items: [
								{
									title: itemData?.data?.income,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Estado civil',
							items: [
								{
									title: itemData?.data?.maritalStatus,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Fecha nacimiento',
							items: [
								{
									title: itemData?.data?.fechaNacimiento
										? moment(
												itemData?.data?.fechaNacimiento,
												'YYYY-MM-DD'
										  ).format(DATE_FORMAT)
										: '',
									iconClass: null,
									action: () => {},
								},
							],
						},
					],
				},
				{
					tableClass:
						'table table-sm align-middle pb-3 fs-7 table-borderless w-100',
					header: { title: 'Atribución de creación de este cliente' },
					body: [
						{
							title: 'Usuario que lo creó',
							items: [
								{
									title: itemData?.data?.userName,
									iconClass: null,
									action: () => {},
								},
							],
						},
						{
							title: 'Call center',
							items: [
								{
									title: itemData?.data?.callcenter?.name,
									iconClass: null,
									action: () => {},
								},
							],
						},
					],
				},
			];
			setDataLeft(parseInfoLeft);
		}
	}, [itemData?.data, errorItem]);

	const toggleDialog = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb
						title="Detalle del Cliente"
						pageTitle="Clientes"
						urlPageTitle="/client"
					/>

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
						<Row>
							<Col xxl={3}>
								<Card className="shadow">
									<CardBody className="p-0">
										<div className="d-flex align-items-center mb-2 p-3">
											<div className="flex-grow-1">
												<h5 className="card-title mb-0 text-primary">
													{`${itemData?.data?.firstName} ${itemData?.data?.lastName}`}
												</h5>
											</div>
											<div>
												<i
													className="ri-edit-fill cursor-pointer"
													onClick={toggleDialog}
												/>
											</div>
										</div>
										<div className="table-card p-3">
											{dataLeft.map((it, idx) => (
												<table
													className={it.tableClass}
													key={`dataLeft-${idx}`}
												>
													<tbody>
														{it.header && (
															<tr>
																<th
																	className="text-primary border-bottom-0"
																	colSpan={2}
																>
																	{
																		it
																			.header
																			.title
																	}
																</th>
															</tr>
														)}
														{it.body.map(
															(body, bodyIdx) => (
																<tr
																	key={`dataLedt-body-${bodyIdx}`}
																>
																	<td
																		className="fw-medium"
																		style={{
																			width: '45%',
																		}}
																	>
																		{
																			body.title
																		}
																	</td>
																	<td
																		style={{
																			width: '55%',
																		}}
																	>
																		{body.items.map(
																			(
																				bodyItem,
																				bItIdx
																			) => (
																				<div
																					className="d-flex justify-content-between align-items-center"
																					key={`body-it-${bItIdx}`}
																				>
																					<div>
																						{
																							bodyItem.title
																						}
																					</div>
																					{bodyItem.iconClass && (
																						<div>
																							<i
																								className={`${bodyItem.iconClass}`}
																								onClick={
																									bodyItem.action
																								}
																							></i>
																						</div>
																					)}
																				</div>
																			)
																		)}
																	</td>
																</tr>
															)
														)}
													</tbody>
												</table>
											))}
										</div>
									</CardBody>
								</Card>
							</Col>

							<Col xxl={9}>
								<Card className="shadow">
									<CardHeader>
										<Nav
											className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
											role="tablist"
										>
											{/* <NavItem>
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
													Información del Cliente
												</NavLink>
											</NavItem> */}
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '6',
													})}
													onClick={() => {
														tabChange('6');
													}}
													type="button"
												>
													Origen
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
													Notas
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
													SMS
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
													Marketing
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													to="#"
													className={classNames({
														active:
															activeTab === '5',
													})}
													onClick={() => {
														tabChange('5');
													}}
													type="button"
												>
													Whatsapp
												</NavLink>
											</NavItem>
										</Nav>
									</CardHeader>
									<CardBody className="px-4 py-2">
										<TabContent activeTab={activeTab}>
											{/* <TabPane tabId="1">
												{activeTab === '1' && (
													<LeadInformation
														data={itemData.data}
														onHandleClickToCall={onHandleClickToCall}
													/>
												)}
											</TabPane> */}
											<TabPane tabId="2">
												{activeTab === '2' && (
													<NotasCliente />
												)}
											</TabPane>
											<TabPane tabId="3">
												{activeTab === '3' && (
													<SMSClient />
												)}
											</TabPane>
											<TabPane tabId="4">
												{activeTab === '4' && (
													<MarketingMailClient />
												)}
											</TabPane>
											<TabPane tabId="5">
												{activeTab === '5' && (
													<WhatsappClient />
												)}
											</TabPane>
											<TabPane tabId="6">
												{activeTab === '6' && (
													<OriginClient
														customerId={
															itemData.data?.id
														}
													/>
												)}
											</TabPane>
										</TabContent>
									</CardBody>
								</Card>
							</Col>
						</Row>
					)}
				</Container>
			</div>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Editar cliente"
				size="xl"
				classBody="py-1 px-3"
				children={
					<FormClient
						toggleDialog={toggleDialog}
						textBtnSubmit="Editar"
						customer={itemData?.data ?? null}
						refetchClient={refetchClient}
					/>
				}
			/>
		</>
	);
};

export default LeadProfile;
