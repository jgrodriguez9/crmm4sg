import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import DatePicker from "../../Common/DatePicker";

const FormReservationInformation = ({editMode, setEditMode}) => {

    return (
        <Col xs="12" md="12">
            <Form>
                <Card>
                    <CardBody className="p-4">
                        <h5 className="text-primary">Detalle de la reservación</h5>
                        <hr />
                        <Row>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="confirmacion">No. confirmación</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="confirmacion"
                                        defaultValue="8057861" 
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="booking">Id booking</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="booking"
                                        defaultValue="60727691" 
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="hotel">Hotel</Label>
                                    <Select
                                        id="hotel"
                                        className="mb-0"
                                        value={{value: 'Ocean Spa Hotel', label: 'Ocean Spa Hotel'}}
                                        onChange={() => {}}
                                        options={[{value: 'Ocean Spa Hotel', label: 'Ocean Spa Hotel'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="plan">Plan</Label>
                                    <Select
                                        id="plan"
                                        className="mb-0"
                                        value={{value: 'All Inclusive Multiple', label: 'All Inclusive Multiple'}}
                                        onChange={() => {}}
                                        options={[{value: 'All Inclusive Multiple', label: 'All Inclusive Multiple'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="fechaLlegada">Fecha llegada</Label>
                                    <DatePicker 
                                        id='fechaLlegada'
                                        date='29/06/2023'
                                        onChangeDate={(date)=>console.log(date)}
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="fechaSalida">Fecha salida</Label>
                                    <DatePicker 
                                        id='fechaSalida'
                                        date='29/06/2023'
                                        onChangeDate={(date)=>console.log(date)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={1}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="noches">Noches</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="noches"
                                        defaultValue="4" 
                                    />
                                </div>
                            </Col>
                            <Col lg={1}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="adultos">Adultos</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="adultos"
                                        defaultValue="2" 
                                    />
                                </div>
                            </Col>
                            <Col lg={1}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="juniors">Juniors</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="juniors"
                                        defaultValue="0" 
                                    />
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="menoresPagan">Menores que pagan</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="menoresPagan"
                                        defaultValue="0" 
                                    />
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="menoresGratis">Menores gratis</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="menoresGratis"
                                        defaultValue="0" 
                                    />
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="infantes">Infantes</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="infantes"
                                        defaultValue="0" 
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="tipoHabitacion">Tipo de habitación</Label>
                                    <Select
                                        id="tipoHabitacion"
                                        className="mb-0"
                                        value={{value: 'Standard King', label: 'Standard King'}}
                                        onChange={() => {}}
                                        options={[{value: 'Standard King', label: 'Standard King'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <h5 className="mt-3 text-primary">Detalle del titular</h5>
                        <hr />
                        <Row>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="estadoCivil">Estado civil</Label>
                                    <Select
                                        id="estadoCivil"
                                        className="mb-0"
                                        value={{value: 'Casado', label: 'Casado'}}
                                        onChange={() => {}}
                                        options={[{value: 'Casado', label: 'Casado'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="ingreso">Ingreso</Label>
                                    <Select
                                        id="ingreso"
                                        className="mb-0"
                                        value={{value: '0-150000', label: '0-150000'}}
                                        onChange={() => {}}
                                        options={[{value: '0-150000', label: '0-150000'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="estadoAnimo">Estado de ánimo</Label>
                                    <Select
                                        id="estadoCivil"
                                        className="mb-0"
                                        value={{value: 'Satisfecho', label: 'Satisfecho'}}
                                        onChange={() => {}}
                                        options={[{value: 'Satisfecho', label: 'Satisfecho'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="tarjetas">Tarjetas</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="tarjetas"
                                        defaultValue="1" 
                                    />
                                </div>
                            </Col>
                            <Col lg={1}>
                                <div className="form-check">
                                    <Label className="form-label text-muted text-uppercase fw-semibold opacity-0 d-block">
                                        S
                                    </Label>
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="visa"
                                        checked={true}
                                    />
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
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="masterCard"
                                    />
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
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="amex"
                                    />
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
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="otras"
                                    />
                                    <Label className="form-check-label" htmlFor="otras">
                                        Otras
                                    </Label>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="cual">Cual</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="cual"
                                        defaultValue="" 
                                    />
                                </div>
                            </Col>
                        </Row>
                        <h5 className="mt-3 text-primary">Detalle de la operación</h5>
                        <hr />
                        <Row>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="proveedor">Proveedor</Label>
                                    <Select
                                        id="proveedor"
                                        className="mb-0"
                                        value={{value: 'Marketing 4 Sunset Group', label: 'Marketing 4 Sunset Group'}}
                                        onChange={() => {}}
                                        options={[{value: 'Marketing 4 Sunset Group', label: 'Marketing 4 Sunset Group'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="hooked">Hooked</Label>
                                    <Select
                                        id="hooked"
                                        className="mb-0"
                                        value={{value: 'Hooked', label: 'Hooked'}}
                                        onChange={() => {}}
                                        options={[{value: 'Hooked', label: 'Hooked'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="representante">Representante</Label>
                                    <Select
                                        id="representante"
                                        className="mb-0"
                                        value={{value: 'MMDINAC', label: 'MMDINAC'}}
                                        onChange={() => {}}
                                        options={[{value: 'MMDINAC', label: 'MMDINAC'}]}
                                        placeholder="Seleccionar opción"
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className="mb-3">
                                    <Label className="form-label" htmlFor="precall">Precall</Label>
                                    <Input 
                                        type="text" 
                                        className="form-control" 
                                        id="precall"
                                        defaultValue="01/05/2023 11:28:40" 
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        {editMode && 
                            <div className="d-flex mt-3">
                                <Button 
                                    type="submit"
                                    color="primary"
                                    className="me-2"
                                >Aceptar</Button>
                                <Button 
                                    type="button"
                                    color="danger"
                                    className="btn-soft-danger"
                                    onClick={() =>  setEditMode(false)}
                                >Cancelar</Button>
                            </div>}
                    </CardBody>
                </Card>
            </Form>
        </Col>
    );
}

export default FormReservationInformation