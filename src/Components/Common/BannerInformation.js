import { Card, CardBody, Col, Row } from 'reactstrap';
import img from '../../assets/images/companies/img-4.png';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import moment from 'moment';

const BannerInformation = ({ data, showBreadcrumb = true }) => {
	console.log(data);
	return (
		<Col lg={12}>
			<Card className="mt-n4 mx-n4 mb-n5">
				<div className="bg-soft-warning">
					<CardBody className="pb-4 mb-5">
						<Row>
							<div className="col-md">
								<Row className="align-items-center">
									<div className="col-md-auto">
										<div className="avatar-md mb-md-0 mb-4">
											<div className="avatar-title bg-white rounded-circle">
												<img
													src={img}
													alt=""
													className="avatar-sm"
												/>
											</div>
										</div>
									</div>
									<div className="col-md">
										<div className="d-flex">
											<div className="me-5">
												{data?.subTitle && (
													<span className="badge bg-primary fs-7">
														{data?.subTitle}
													</span>
												)}
												<h4
													className="fw-semibold fs-6"
													id="ticket-title"
												>
													{data?.title}
												</h4>
											</div>
											<div>
												<div className="d-flex flex-col">
													<div className="lh-sm me-4">
														<span className="d-block fw-bold">
															Booking
														</span>
														<span>
															{
																data?.sale
																	?.idBooking
															}
														</span>
													</div>
													<div className="lh-sm">
														<span className="d-block fw-bold">
															Fecha venta
														</span>
														<span>
															{data?.sale
																?.saleDate
																? moment(
																		data
																			?.sale
																			?.saleDate,
																		'YYY-MM-DD'
																  ).format(
																		'DD/MM/YYYY'
																  )
																: ''}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="hstack gap-3 flex-wrap fs-7">
											{data?.subInfo.map(
												(it, indexSubInfo) => (
													<Fragment
														key={`sunInfo-${indexSubInfo}`}
													>
														<div
															className={
																it.classes
															}
														>
															{it.icon && (
																<i
																	className={`${it.icon} align-bottom me-1`}
																/>
															)}
															{it.value instanceof
															Array ? (
																<div className="d-flex align-items-center">
																	{it.value.map(
																		(
																			itValue,
																			indexValue
																		) => (
																			<>
																				<div
																					key={`values-${indexValue}`}
																				>
																					<div
																						className={
																							itValue.classes
																						}
																						title={
																							itValue.title
																						}
																					>
																						{itValue.icon && (
																							<i
																								className={`${itValue.icon} align-bottom me-1`}
																							/>
																						)}
																						<span
																							id="ticket-client"
																							className="fs-7"
																						>
																							{
																								itValue.value
																							}
																						</span>
																					</div>
																				</div>
																				{indexValue !==
																					it
																						.value
																						.length -
																						1 && (
																					<div className="ri-checkbox-blank-circle-fill fs-4px px-1" />
																				)}
																			</>
																		)
																	)}
																</div>
															) : (
																<span
																	id="ticket-client"
																	className="fs-7"
																>
																	{it.label &&
																		`${it.label}: `}
																	{it.value}
																</span>
															)}
														</div>
														{indexSubInfo !==
															data?.subInfo
																.length -
																1 && (
															<div className="vr"></div>
														)}
													</Fragment>
												)
											)}
										</div>
									</div>
								</Row>
							</div>
							{showBreadcrumb && (
								<div className="col-md-auto mt-md-0 mt-4">
									<div className="hstack gap-1 flex-wrap">
										<div className="page-title-right">
											<ol className="breadcrumb m-0">
												<li className="breadcrumb-item">
													<Link to={'/reservation'}>
														Reservación
													</Link>
												</li>
												<li className="breadcrumb-item active">
													Detalle de la reservación
												</li>
											</ol>
										</div>
									</div>
								</div>
							)}
						</Row>
					</CardBody>
				</div>
			</Card>
		</Col>
	);
};

export default BannerInformation;
