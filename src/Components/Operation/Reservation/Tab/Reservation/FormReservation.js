import { Accordion, AccordionItem, Col, Collapse, Row } from 'reactstrap';
import FormReservationClient from './FormReservationClient';
import FormReservationEdit from './FormReservationEdit';
import { useState } from 'react';
import classNames from 'classnames';

const FormReservation = ({ reservation = null, toggleDialog }) => {
	const [editClient, setEditClient] = useState(false);
	const [openClient, setOpenClient] = useState(false);

	return (
		<Row>
			<Col xs={12} md={12} className="mb-4">
				<Accordion id="default-accordion-example" flush>
					<AccordionItem>
						<h2 className="accordion-header" id="headingOne">
							<button
								className={
									`ps-0 ` +
									classNames('accordion-button', {
										collapsed: !openClient,
									})
								}
								type="button"
								onClick={() => setOpenClient(!openClient)}
								style={{ cursor: 'pointer' }}
							>
								<div className="d-flex flex-column">
									<h5 className="text-primary m-0">
										Titular
									</h5>
									<p className="m-0">{`${reservation.customer.firstName} ${reservation.customer.lastName}`}</p>
								</div>
							</button>
						</h2>
						<Collapse
							isOpen={openClient}
							className="accordion-collapse"
							id="collapseOne"
						>
							<div className="accordion-body">
								<FormReservationClient
									reservation={reservation}
									editClient={editClient}
									setEditClient={setEditClient}
									setOpenClient={setOpenClient}
								/>
							</div>
						</Collapse>
					</AccordionItem>
				</Accordion>
			</Col>
			<Col xs={12} md={12}>
				<FormReservationEdit
					reservation={reservation}
					toggleDialog={toggleDialog}
					editClient={editClient}
				/>
			</Col>
		</Row>
	);
};

export default FormReservation;
