import { Card, CardBody, Col, Row } from "reactstrap"
import img from "../../assets/images/companies/img-4.png";

const BannerInformation = ({data}) => {

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
                                                <img src={img} alt="" className="avatar-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <h4 className="fw-semibold" id="ticket-title">{data?.title}</h4>
                                        <div className="hstack gap-3 flex-wrap">
                                            {
                                                data?.subInfo.map((it, indexSubInfo) => (
                                                    <>
                                                        <div className={it.classes} key={`sunInfo-${indexSubInfo}`}>
                                                            {it.icon && <i className={`${it.icon} align-bottom me-1`} /> }
                                                            {it.value instanceof Array ?
                                                            <div className="d-flex align-items-center">
                                                                {
                                                                    it.value.map((itValue, indexValue) => (
                                                                        <>
                                                                            <div key={`values-${indexValue}`}>
                                                                                <div className={itValue.classes} title={itValue.title}>
                                                                                    {itValue.icon && <i className={`${itValue.icon} align-bottom me-1`} /> }
                                                                                    <span id="ticket-client">{itValue.value}</span>
                                                                                </div>
                                                                            </div>
                                                                            {indexValue !== it.value.length -1 && <div className="ri-checkbox-blank-circle-fill fs-4px px-1" />}
                                                                        </>
                                                                    ))
                                                                }
                                                            </div>
                                                            
                                                             : <span id="ticket-client">{it.label && `${it.label}: `}{it.value}</span>}
                                                        </div>
                                                        {indexSubInfo !== data?.subInfo.length -1 && <div className="vr"></div>}
                                                    </>
                                                    
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Row>
                            </div>
                            <div className="col-md-auto mt-md-0 mt-4">
                                <div className="hstack gap-1 flex-wrap">
                                    <button type="button" className="btn avatar-xs mt-n1 p-0 favourite-btn active">
                                        <span className="avatar-title bg-transparent fs-15">
                                            <i className="ri-star-fill"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn py-0 fs-16 text-body">
                                        <i className="ri-flag-line"></i>
                                    </button>
                                </div>
                            </div>
                        </Row>
                    </CardBody>
                </div>
            </Card>
        </Col>
    )
}

export default BannerInformation