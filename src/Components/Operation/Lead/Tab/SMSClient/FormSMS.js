import { useState } from "react";
import Select from "react-select";
import { Button, Col, Form, Label, Row } from "reactstrap";

const FormSMS = () => {
    const [test, setTest] = useState(false)
    return (
        <Form>
            <Row>
                <Col lg={12}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="proveedor">Proveedor</Label>
                        <Select
                            id="proveedor"
                            className="mb-0"
                            value={{value: 'Twilio', label: 'Twilio'}}
                            onChange={() => {}}
                            options={[{value: 'Twilio', label: 'Twilio'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="nota">Número</Label>
                        <Select
                            id="proveedor"
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[{value: '1', label: '****9874'}, {value: '2', label: '****1456'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="motivo">Idioma</Label>
                        <Select
                            id="motivo"
                            className="mb-0"
                            value={{value: 'ES', label: 'Español'}}
                            onChange={() => {}}
                            options={[{value: 'ES', label: 'Español'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={12}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="motivo">Mensaje</Label>
                        <Select
                            id="motivo"
                            className="mb-0"
                            value={null}
                            onChange={() => {setTest(true)}}
                            options={[{value: '1', label: 'Black Friday'}, {value: '2', label: 'Oferta Verano 60%'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                {test && <Col lg="12">
                    <div className="mb-3 text-muted border p-2">
                        Mensaje de promocion poresta oferta de verano al 60%, reserva en nuestros hoteles
                    </div>
                </Col>}
            </Row>
            <div className="d-flex mt-3">
                <Button 
                    type="submit"
                    color="primary"
                    className="me-2"
                >Enviar</Button>
                <Button 
                    type="button"
                    color="danger"
                    className="btn-soft-danger"
                    onClick={() => {}}
                >Cancelar</Button>
            </div>
        </Form>
);
}

export default FormSMS