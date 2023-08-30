import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	AccordionBody,
	AccordionHeader,
	AccordionItem,
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
	UncontrolledAccordion,
} from 'reactstrap';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import classNames from 'classnames';
import LeadInformation from '../../../../Components/Operation/Lead/Tab/LeadInformation';
import NotasCliente from '../../../../Components/Operation/Lead/Tab/NotasCliente';
import SMSClient from '../../../../Components/Operation/Lead/Tab/SMSClient';
import WhatsappClient from '../../../../Components/Operation/Lead/Tab/WhatsappClient';
import MarketingMailClient from '../../../../Components/Operation/Lead/Tab/MarketingMailClient';
import { useQuery } from 'react-query';
import { fecthItem } from '../Util/services';
import Loader from '../../../../Components/Common/Loader';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import ReservationClient from '../../../../Components/Operation/Lead/Tab/ReservationClient';
import { clickToCall } from '../../../../helpers/customer';
import { ERROR_SERVER } from '../../../../Components/constants/messages';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../slices/messages/reducer';
import { toast } from 'react-toastify';
import ClickToCallAlert from '../../../../Components/Operation/Lead/ClickToCall/ClickToCallAlert';

const LeadProfile = () => {
	document.title = 'Detalle del Lead | CRM - M4S';
	const { id } = useParams();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('6');
	const tabChange = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
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
								<Card>
									<CardBody className="p-0">
										<div className="d-flex align-items-center mb-2 p-3">
											<div className="flex-grow-1">
												<h5 className="card-title mb-0 text-primary">
													{`${itemData?.data?.firstName} ${itemData?.data?.lastName}`}
												</h5>
											</div>
										</div>
										<div className="table-card p-3 mb-4">
											<table className="table mb-0">
												<tbody>
													<tr>
														<td className="fw-medium">
															Correo
														</td>
														<td>
															<div className="d-flex justify-content-between">
																<div>
																	{
																		itemData
																			?.data
																			?.email
																	}
																</div>
																<div>
																	<i
																		className={`fs-15 ri-mail-line text-danger`}
																		style={{
																			cursor: 'pointer',
																		}}
																	></i>
																</div>
															</div>
														</td>
													</tr>
													<tr>
														<td className="fw-medium">
															Teléfono
														</td>
														<td>
															{itemData?.data
																?.phone1 && (
																<div className="d-flex justify-content-between">
																	<div>
																		{
																			itemData
																				?.data
																				?.phone1
																		}
																	</div>
																	<div>
																		<i
																			className={`fs-15 ri-phone-line text-primary`}
																			onClick={(
																				e
																			) =>
																				onHandleClickToCall(
																					'phone1'
																				)
																			}
																			style={{
																				cursor: 'pointer',
																			}}
																		></i>
																	</div>
																</div>
															)}
															{itemData?.data
																?.phone2 && (
																<div className="d-flex justify-content-between">
																	<div>
																		{
																			itemData
																				?.data
																				?.phone2
																		}
																	</div>
																	<div>
																		<i
																			className={`fs-15 ri-phone-line text-primary`}
																			onClick={(
																				e
																			) =>
																				onHandleClickToCall(
																					'phone2'
																				)
																			}
																			style={{
																				cursor: 'pointer',
																			}}
																		></i>
																	</div>
																</div>
															)}
															{itemData?.data
																?.phone3 && (
																<div className="d-flex justify-content-between">
																	<div>
																		{
																			itemData
																				?.data
																				?.phone3
																		}
																	</div>
																	<div>
																		<i
																			className={`fs-15 ri-phone-line text-primary`}
																			onClick={(
																				e
																			) =>
																				onHandleClickToCall(
																					'phone3'
																				)
																			}
																			style={{
																				cursor: 'pointer',
																			}}
																		></i>
																	</div>
																</div>
															)}
															{itemData?.data
																?.movil && (
																<div className="d-flex justify-content-between">
																	<div>
																		{
																			itemData
																				?.data
																				?.movil
																		}
																	</div>
																	<div>
																		<i
																			className={`fs-15 ri-phone-line text-primary`}
																			onClick={(
																				e
																			) =>
																				onHandleClickToCall(
																					'movil'
																				)
																			}
																			style={{
																				cursor: 'pointer',
																			}}
																		></i>
																	</div>
																</div>
															)}
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<UncontrolledAccordion
											id="vista-previa-accordion"
											className="custom-accordionwithicon accordion-border-box"
											defaultOpen="0"
										>
											<AccordionItem className="rounded-0 border-top-0 border-bottom-0 m-0 pb-0">
												<AccordionHeader targetId="1">
													Información principal
												</AccordionHeader>
												<AccordionBody accordionId="1">
													<table className="table mb-0 fs-6">
														<tbody>
															<tr>
																<td className="fw-medium">
																	Contrato
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.contract
																	}
																</td>
															</tr>
														</tbody>
													</table>
												</AccordionBody>
											</AccordionItem>
											<AccordionItem className="rounded-0 m-0 border-bottom-0">
												<AccordionHeader targetId="2">
													Acerca de este cliente
												</AccordionHeader>
												<AccordionBody accordionId="2">
													<table className="table mb-0 fs-6">
														<tbody>
															<tr>
																<td className="fw-medium">
																	Dirección
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.address
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	País
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.country
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Estado
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.state
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Ciudad
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.city
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	CP
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.postalCode
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Ingreso
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.income
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Estado civil
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.maritalStatus
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Fecha
																	nacimiento
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.fechaNacimiento
																	}
																</td>
															</tr>
														</tbody>
													</table>
												</AccordionBody>
											</AccordionItem>
											<AccordionItem className="rounded-0 m-0">
												<AccordionHeader targetId="3">
													Atribución de creación de
													este cliente
												</AccordionHeader>
												<AccordionBody accordionId="3">
													<table className="table mb-0 fs-6">
														<tbody>
															<tr>
																<td className="fw-medium">
																	Usuario que
																	lo creó
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.userName
																	}
																</td>
															</tr>
															<tr>
																<td className="fw-medium">
																	Call center
																</td>
																<td>
																	{
																		itemData
																			?.data
																			?.callcenter
																			?.name
																	}
																</td>
															</tr>
														</tbody>
													</table>
												</AccordionBody>
											</AccordionItem>
										</UncontrolledAccordion>
									</CardBody>
								</Card>
							</Col>

							<Col xxl={9}>
								<Card>
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
													<ReservationClient
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
		</>
	);
};

export default LeadProfile;
