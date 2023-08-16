import { Col, Row } from 'reactstrap';
import { useState } from 'react';
import TableReservation from './ReservationClient/TableReservation';

const ReservationClient = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	return (
		<div className="mt-5">
			{/* <Row>
                <Col>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
                        <button className="btn btn-info" onClick={() => setShowAddModal(true)}>
                            <i className="ri-add-fill me-1 align-bottom"></i>{" "} Agregar
                        </button>
                    </div>
                </Col>
            </Row> */}
			<TableReservation />
			{/* <BasicModal 
                open={showAddModal}
                setOpen={setShowAddModal}
                title="Agregar nota"
                size="lg"
                children={<FormNotaCliente />}
            /> */}
		</div>
	);
};

export default ReservationClient;
