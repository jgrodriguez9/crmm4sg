import Select from "react-select";
import { Button, Col, Form, Label, Row } from "reactstrap";
import template from "../../../../../common/data/template";


const FormMaketingMailClient = () => {

    return (
        <Form>
            <Row>
                <Col lg={12}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="tipo">Receptor</Label>
                        <div className="form-control">dan******@gmail.com</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="motivo">Idioma</Label>
                        <Select
                            id="motivo"
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[{value: 'ES', label: 'Español'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={8}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="motivo">Template</Label>
                        <Select
                            id="motivo"
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[{value: '1', label: 'Paquete Cancún EP 5/4 ES'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div style={{maxHeight: '500px', overflowY: 'auto'}}>
                            <div dangerouslySetInnerHTML={{__html: template}}></div>
                        </div>
                </Col>
            </Row>
            <div className="d-flex mt-5">
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

export default FormMaketingMailClient