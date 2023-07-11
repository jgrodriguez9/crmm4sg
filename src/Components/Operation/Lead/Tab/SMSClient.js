import { Col, Row } from "reactstrap"
import { useState } from "react"
import BasicModal from "../../../Common/BasicModal"
import TableSMS from "./SMSClient/TableSMS"
import FormSMS from "./SMSClient/FormSMS"


const SMSClient = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-3">
                        <button className="btn btn-info" onClick={() => setShowAddModal(true)}>
                            <i className="ri-add-fill me-1 align-bottom"></i>{" "} Crear SMS
                        </button>
                    </div>
                </Col>
            </Row>
            <TableSMS />
            <BasicModal 
                open={showAddModal}
                setOpen={setShowAddModal}
                title="Crear SMS"
                size="md"
                children={<FormSMS />}
            />
        </>
    )
    
}

export default SMSClient