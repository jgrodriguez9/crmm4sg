import { useState } from "react";
import { Badge, Col, Row } from "reactstrap";
import SimpleBar from "simplebar-react";

const TableSMS = () => {
    const [item, setItems] = useState({
        loading: true,
        data: [],
        isSuccess: false,
        error: null
    });

    return (
        <Row>
            <Col>
                <SimpleBar style={{ maxHeight: "420px" }} className="p-3 pt-0">
                    <div className="acitivity-timeline acitivity-main">
                        <div className="acitivity-item pb-3 d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                <div className="avatar-title bg-soft-success text-success rounded-circle">
                                <i className="ri-check-double-fill"></i>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <Badge color="success" className="bg-soft-success text-success mb-1">Recibido</Badge>
                                <h6 className="mb-1 lh-base d-flex align-items-center">
                                    08/04/2023 12:20
                                </h6>
                                <p className="text-muted mb-1">
                                    Hola me comunico de Cancún de parte de tu tío que tiene una invitación para ti con un 60% descuento
                                </p>
                                <div className="hstack gap-3">
                                    <small className="mb-0 text-muted">
                                       <i className="ri-user-3-fill" /> ANESCOLARDE
                                    </small>
                                    <div className="vr" />
                                    <small className="mb-0 text-muted">
                                    <i className="ri-phone-fill" /> ***8364
                                    </small>
                                </div>
                                
                            </div>
                        </div>

                        <div className="acitivity-item pb-3 d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                <div className="avatar-title bg-soft-dark text-dark rounded-circle">
                                <i className="mdi mdi-timer-sand-complete"></i>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <Badge color="dark" className="bg-soft-dark text-dark mb-1">En Cola</Badge>
                                <h6 className="mb-1 lh-base d-flex align-items-center">
                                    02/04/2023 09:40
                                </h6>
                                <p className="text-muted mb-1">
                                    Hola me comunico de Cancún tenemos un 60% descuento para su próxima reservación
                                </p>
                                <div className="hstack gap-3">
                                    <small className="mb-0 text-muted">
                                       <i className="ri-user-3-fill" /> ANESCOLARDE
                                    </small>
                                    <div className="vr" />
                                    <small className="mb-0 text-muted">
                                    <i className="ri-phone-fill" /> ***8364
                                    </small>
                                </div>
                                
                            </div>
                        </div>

                        <div className="acitivity-item pb-3 d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                <i className=" ri-send-plane-fill"></i>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <Badge color="primary" className="bg-soft-primary text-primary mb-1">Enviado</Badge>
                                <h6 className="mb-1 lh-base d-flex align-items-center">
                                    27/03/2023 13:28
                                </h6>
                                <p className="text-muted mb-1">
                                    Hola me comunico de Cancún de parte de tu tío que tiene una invitación para ti con un 60% descuento
                                </p>
                                <div className="hstack gap-3">
                                    <small className="mb-0 text-muted">
                                       <i className="ri-user-3-fill" /> ANESCOLARDE
                                    </small>
                                    <div className="vr" />
                                    <small className="mb-0 text-muted">
                                    <i className="ri-phone-fill" /> ***8364
                                    </small>
                                </div>
                                
                            </div>
                        </div>

                        <div className="acitivity-item pb-3 d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                <div className="avatar-title bg-soft-danger text-danger rounded-circle">
                                <i className="ri-close-line"></i>
                                </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <Badge color="danger" className="bg-soft-danger text-danger mb-1">Falló</Badge>
                                <h6 className="mb-1 lh-base d-flex align-items-center">
                                    08/03/2023 16:00
                                </h6>
                                <p className="text-muted mb-1">
                                    Hola somos grupo Sunset con ofertas increíbles
                                </p>
                                <div className="hstack gap-3">
                                    <small className="mb-0 text-muted">
                                       <i className="ri-user-3-fill" /> ANESCOLARDE
                                    </small>
                                    <div className="vr" />
                                    <small className="mb-0 text-muted">
                                    <i className="ri-phone-fill" /> ***8364
                                    </small>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </SimpleBar>
            </Col>
        </Row>
    )
}

export default TableSMS