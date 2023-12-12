import { Col, Row } from 'reactstrap';
import FormReservationClient from './FormReservationClient';
import FormReservationEdit from './FormReservationEdit';
import { useState } from 'react';

const FormReservation = ({ reservation = null, toggleDialog }) => {
	const [editClient, setEditClient] = useState(false);
	return (
		<Row>
			<Col xs={12} md={12}>
				<FormReservationClient
					reservation={reservation}
					editClient={editClient}
					setEditClient={setEditClient}
				/>
			</Col>
			<Col xs={12} md={12}>
				<FormReservationEdit
					reservation={reservation}
					toggleDialog={toggleDialog}
				/>
			</Col>
		</Row>
	);
};

export default FormReservation;
