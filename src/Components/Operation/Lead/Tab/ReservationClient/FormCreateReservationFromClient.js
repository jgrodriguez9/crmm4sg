import { Col, Row } from 'reactstrap';
import FormReservationCreate from '../../../Reservation/Tab/Reservation/FormReservationCreate';

const FormCreateReservationFromClient = ({
	reservation = null,
	toggleDialog,
}) => {
	return (
		<Row>
			<Col xs={12} md={12}>
				<FormReservationCreate
					reservation={reservation}
					toggleDialog={toggleDialog}
				/>
			</Col>
		</Row>
	);
};

export default FormCreateReservationFromClient;
