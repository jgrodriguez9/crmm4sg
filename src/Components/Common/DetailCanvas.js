import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
	Accordion,
	AccordionItem,
	Alert,
	Collapse,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import showFriendlyMessafe from '../../util/showFriendlyMessafe';
import { useTranslation } from 'react-i18next';

const DetailCanvas = ({
	show,
	onCloseClick,
	data = null,
	error,
	isLoading,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.detailCanvas',
	});
	const [info, setInfo] = useState(data);
	const openAccordion = (idItem, valorElemento) => {
		const copyItems = [...info.items]; //.map((it) => ({ ...it, collapse: true }));
		const index = copyItems.findIndex((it) => it.id === idItem);
		copyItems[index].collapse = valorElemento;
		setInfo((prev) => ({
			...prev,
			items: copyItems,
		}));
	};

	useEffect(() => {
		setInfo(data);
	}, [data]);

	return (
		<Offcanvas
			direction="end"
			isOpen={show}
			id="filter-canvas"
			toggle={onCloseClick}
			scrollable={true}
			className="w-400"
		>
			<OffcanvasHeader
				className="bg-gradient bg-primary canvas-title"
				toggle={onCloseClick}
			>
				{!isLoading ? info?.title ?? '' : ''}
			</OffcanvasHeader>
			{isLoading && (
				<OffcanvasBody className="p-0 mb-6">
					<Loader />
				</OffcanvasBody>
			)}
			{error && !isLoading && (
				<OffcanvasBody className="py-3 mb-6">
					<Alert color="danger" className="mb-0">
						{showFriendlyMessafe(error?.code)}
					</Alert>
				</OffcanvasBody>
			)}
			{info && !isLoading && !error && (
				<OffcanvasBody className="p-0 mb-6 fs-7">
					{info?.header && (
						<div className="d-flex mb-2 p-3">
							<div className="pe-2">
								{info.header.img && (
									<div className="position-relative d-inline-block">
										<div className="avatar-lg rounded-circle img-thumbnail">
											<div className="avatar-title bg-soft-success text-success rounded-circle fs-1">
												{info.header.img.name.charAt(0)}
											</div>
										</div>
									</div>
								)}
							</div>
							<div>
								<h6 className="mt-4 mb-1 text-primary">{`${info.header.title.label} ${info.header.title.value}`}</h6>
								{info.header.body.map((it, idx) => (
									<p
										key={`header-${idx}`}
										className={`text-muted mb-0 ${it.extraClassess}`}
									>{`${it.label} ${it.value}`}</p>
								))}
							</div>
						</div>
					)}
					{info && (
						<Accordion
							id="vista-previa-accordion"
							className="lefticon-accordion custom-accordionwithicon accordion-border-box"
							open={''}
							toggle={() => {}}
						>
							{info?.items.map((it, indexIt) => (
								<AccordionItem
									key={it.id}
									className={`border-start-0 border-end-0  rounded-0 ${
										indexIt > 0 ? 'mt-0 border-top-0' : ''
									}`}
								>
									<h2
										className="accordion-header"
										id="headingOne"
									>
										<button
											className={classNames(
												'accordion-button fs-7',
												{ collapsed: !it.collapse }
											)}
											type="button"
											onClick={() =>
												openAccordion(
													it.id,
													!it.collapse
												)
											}
											style={{ cursor: 'pointer' }}
										>
											{it.title}
										</button>
									</h2>
									<Collapse
										isOpen={!it.collapse}
										className="accordion-collapse"
									>
										<div className="accordion-body">
											<div>
												{it.body.map(
													(bElement, idx) => (
														<div
															key={`body-${idx}`}
															className={
																bElement.value instanceof
																Array
																	? 'mb-2'
																	: 'd-flex justify-content-between align-items-center'
															}
														>
															<h6
																className={`fs-7 fw-normal mb-0 ${bElement.extraClassess}`}
															>
																{bElement.label}
															</h6>
															{bElement.value instanceof
															Array ? (
																bElement.value.map(
																	(
																		bValue,
																		indexValue
																	) => (
																		<div
																			key={`value=${indexValue}`}
																			className="d-flex justify-content-between align-items-center"
																		>
																			<div>
																				{
																					bValue.text
																				}
																			</div>
																			<div>
																				<i
																					className={`fs-15 ${bValue.iconClasses}`}
																					onClick={
																						bValue.action
																					}
																					style={{
																						cursor: 'pointer',
																					}}
																				></i>
																			</div>
																		</div>
																	)
																)
															) : (
																<span
																	className={`fs-7 ${bElement.extraClassess}`}
																>
																	{
																		bElement.value
																	}
																</span>
															)}
														</div>
													)
												)}
											</div>
										</div>
									</Collapse>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</OffcanvasBody>
			)}

			<div className="py-3 px-2 border position-sticky bottom-0 w-100 bg-light ">
				<div className="d-flex justify-content-between align-items-center">
					<div>
						{info && !isLoading && (
							<Link
								to={info?.goToView}
								className="fw-normal btn btn-success btn-sm"
							>
								{t('viewRegister')}
							</Link>
						)}
					</div>
				</div>
			</div>
		</Offcanvas>
	);
};

export default React.memo(DetailCanvas);
