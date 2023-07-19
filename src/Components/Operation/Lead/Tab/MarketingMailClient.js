import { useState } from "react";
import { Col, Row } from "reactstrap"
import TableMarketingMailClient from "./MarketingMailClient/TableMarketingMailClient";
import FormMaketingMailClient from "./MarketingMailClient/FormMaketingMailClient";
import BasicModal from "../../../Common/BasicModal";
import DetailmarketingMailCanvas from "./MarketingMailClient/DetailmarketingMailCanvas";


const MarketingMailClient = () => {    
    const [showAddModal, setShowAddModal] = useState(false)
    //detail canva
    const [showDetail, setShowDetail] = useState(false)
    const [info, setInfo] = useState(null);
    const builtInfo = (itemData) => {
        console.log(itemData)
        setShowDetail(true)
        setInfo(itemData)
    }
    return (
        <>
            <Row>
                <Col>
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
                        <button className="btn btn-info" onClick={() => setShowAddModal(true)}>
                            <i className="ri-add-fill me-1 align-bottom"></i>{" "} Crear nuevo correo
                        </button>
                    </div>
                </Col>
            </Row>
            <TableMarketingMailClient builtInfo={builtInfo}/>
            <BasicModal 
                open={showAddModal}
                setOpen={setShowAddModal}
                title="Nuevo email"
                size="lg"
                children={<FormMaketingMailClient />}
            />
            {info &&
            <DetailmarketingMailCanvas
                show={showDetail} 
                onCloseClick={() => {
                    setShowDetail(false)
                    setInfo(null)
                }}
                data={info}
            />}  
        </>
    )
}

export default MarketingMailClient