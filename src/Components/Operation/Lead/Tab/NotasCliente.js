import { Col, Row } from "reactstrap"
import TableNotas from "./NotasCliente/TableNotas"
import { useState } from "react"
import BasicModal from "../../../Common/BasicModal"
import FormNotaCliente from "./NotasCliente/FormNotaCliente"


const NotasCliente = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
                        <button className="btn btn-info" onClick={() => setShowAddModal(true)}>
                            <i className="ri-add-fill me-1 align-bottom"></i>{" "} Agregar
                        </button>
                    </div>
                </Col>
            </Row>
            <TableNotas />
            <BasicModal 
                open={showAddModal}
                setOpen={setShowAddModal}
                title="Agregar nota"
                size="lg"
                children={<FormNotaCliente />}
            />
        </>
    )
    
}

export default NotasCliente