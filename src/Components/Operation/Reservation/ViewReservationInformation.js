import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";

const ViewReservationInformation = ({editMode, setEditMode}) => {

    return (
        <Col xs="12" md="12">
            <Card>
                <CardBody className="p-4">
                    <h5 className="text-primary">Detalle de la reservación</h5>
                    <hr />
                    <Row>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="confirmacion">No. confirmación</Label>
                                <div className="form-control" id="confirmacion">8057861</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="booking">Id booking</Label>
                                <div className="form-control" id="booking">60727691</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="hotel">Hotel</Label>
                                <div className="form-control" id="hotel">Ocean Spa Hotel</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="plan">Plan</Label>
                                <div className="form-control" id="plan">All Inclusive Multiple</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="fechaLlegada">Fecha llegada</Label>
                                <div className="form-control" id="fechaLlegada">29/06/2023</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="fechaSalida">Fecha salida</Label>
                                <div className="form-control" id="fechaSalida">03/07/2023</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={1}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="noches">Noches</Label>
                                <div className="form-control" id="noches">4</div>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="adultos">Adultos</Label>
                                <div className="form-control" id="adultos">2</div>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="juniors">Juniors</Label>
                                <div className="form-control" id="juniors">0</div>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="menoresPagan">Menores que pagan</Label>
                                <div className="form-control" id="menoresPagan">0</div>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="menoresGratis">Menores gratis</Label>
                                <div className="form-control" id="menoresGratis">0</div>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="infantes">Infantes</Label>
                                <div className="form-control" id="infantes">0</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="tipoHabitacion">Tipo de habitación</Label>
                                <div className="form-control" id="tipoHabitacion">Standard King</div>
                            </div>
                        </Col>
                    </Row>
                    <h5 className="mt-3 text-primary">Detalle del titular</h5>
                    <hr />
                    <Row>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="estadoCivil">Estado civil</Label>
                                <div className="form-control" id="estadoCivil">Casado</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="estadoCivil">Ingreso</Label>
                                <div className="form-control" id="estadoCivil">0-150000</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="estadoAnimo">Estado de ánimo</Label>
                                <div className="form-control" id="estadoAnimo">Satisfecho</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="tarjetas">Tarjetas</Label>
                                <div className="form-control" id="tarjetas">1</div>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="form-check">
                                <Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
                                    S
                                </Label>
                                <div className="form-check-input" type="checkbox" id="visa"/>
                                <Label className="form-check-label" htmlFor="visa">
                                    Visa
                                </Label>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="form-check">
                                <Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
                                    S
                                </Label>
                                <div className="form-check-input" type="checkbox" id="masterCard"/>
                                <Label className="form-check-label" htmlFor="masterCard">
                                    Master Card
                                </Label>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="form-check">
                                <Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
                                    S
                                </Label>
                                <div className="form-check-input" type="checkbox" id="amex"/>
                                <Label className="form-check-label" htmlFor="amex">
                                    Amex
                                </Label>
                            </div>
                        </Col>
                        <Col lg={1}>
                            <div className="form-check">
                                <Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
                                    S
                                </Label>
                                <div className="form-check-input" type="checkbox" id="otras"/>
                                <Label className="form-check-label" htmlFor="otras">
                                    Otras
                                </Label>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="cual">Cual</Label>
                                <div className="form-control" id="cual">-</div>
                            </div>
                        </Col>
                    </Row>
                    <h5 className="mt-3 text-primary">Detalle de la operación</h5>
                    <hr />
                    <Row>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="proveedor">Proveedor</Label>
                                <div className="form-control" id="proveedor">Marketing 4 Sunset Group</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="hooked">Hooked</Label>
                                <div className="form-control" id="hooked">Hooked</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="representante">Representante</Label>
                                <div className="form-control" id="representante">MMDINAC</div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="mb-3">
                                <Label className="form-label" htmlFor="precall">Precall</Label>
                                <div className="form-control" id="precall">01/05/2023 11:28:40</div>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    {!editMode && <div className="d-flex mt-3">
                        <Button 
                            type="button"
                            color="primary"
                            onClick={() =>  setEditMode(true)}
                        >Editar</Button>
                    </div>}
                </CardBody>
            </Card>
        </Col>
    );
}

export default ViewReservationInformation