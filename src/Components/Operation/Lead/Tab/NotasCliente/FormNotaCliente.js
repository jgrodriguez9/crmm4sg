import { Button, Col, Form, Label, Row } from "reactstrap";
import Select from "react-select";
import DatePicker from "../../../../Common/DatePicker";

const FormNotaCliente = () => {

    return (
            <Form>
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="tipo">Tipo</Label>
                            <Select
                                id="tipo"
                                className="mb-0"
                                value={{value: 'Nota de supervisor', label: 'Nota de supervisor'}}
                                onChange={() => {}}
                                options={[{value: 'Nota de supervisor', label: 'Nota de supervisor'}]}
                                placeholder="Seleccionar opción"
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="motivo">Motivo</Label>
                            <Select
                                id="motivo"
                                className="mb-0"
                                value={{value: 'No contesta', label: 'No contesta'}}
                                onChange={() => {}}
                                options={[{value: 'No contesta', label: 'No contesta'}]}
                                placeholder="Seleccionar opción"
                            />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="nota">Nota</Label>
                            <textarea
                                id="nota"
                                name="nota"
                                className={`form-control`}
                                value="test nota"
                                rows={5}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="fechaFUp">Fecha FUp</Label>
                            <DatePicker 
                                id='fechaFUp'
                                date='29/06/2023'
                                onChangeDate={(date)=>console.log(date)}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <Label className="form-label" htmlFor="fechaFUp">Hora FUp</Label>
                            <DatePicker 
                                id='fechaFUp'
                                date=''
                                onChangeDate={(date)=>console.log(date)}
                                dateFormat="H:i"
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    time_24hr: true
                                }}
                            />
                        </div>
                    </Col>
                </Row>
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
                        onClick={() => {}}
                    >Cancelar</Button>
                </div>
            </Form>
    );
}

export default FormNotaCliente