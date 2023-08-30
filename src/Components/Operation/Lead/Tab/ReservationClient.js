import { useState } from 'react';
import TableReservation from './ReservationClient/TableReservation';
import { Col, Row } from 'reactstrap';
import TablePaquete from './Origen/TablePaquete';
import TableCerificates from './Origen/TableCerificates';

const ReservationClient = ({ customerId }) => {
	return (
		<div className="mt-2">
			<Row>
				<Col>
					<TablePaquete
						customerId={customerId}
						tableTitle="Paquetes"
					/>
				</Col>
			</Row>
			<div className="my-4" />
			<Row>
				<Col>
					<TableCerificates
						customerId={customerId}
						tableTitle="Certificados"
					/>
				</Col>
			</Row>
			{/* <TableReservation customerId={customerId} /> */}
		</div>
	);
};

export default ReservationClient;
