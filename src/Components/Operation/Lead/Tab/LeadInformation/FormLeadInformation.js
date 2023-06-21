import { Button, Col, Form, Input, Label, Row } from "reactstrap"
import Select from "react-select";

const FormLeadInformation = ({editMode, setEditMode}) => {

    return (
        <Form>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Nombre</Label>
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="Daniel" 
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Apellido</Label>
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="Maximiliano" 
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Copropietario</Label>
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="Jesus Enrique" 
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">País</Label>
                        <Select
                            className="mb-0"
                            value={{value: 'United States', label: 'United States'}}
                            onChange={() => {}}
                            options={[{value: 'United States', label: 'United States'}]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Estado</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Teléfono</Label>
                        <Input 
                            type="text" 
                            className="form-control mb-2" 
                            id="nombre"
                            defaultValue="******55" 
                        />
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="******85" 
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Correo electrónico</Label>
                        <Input 
                            type="text" 
                            className="form-control mb-2" 
                            id="nombre"
                            defaultValue="******test.com" 
                        />
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="******ghu.com" 
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label opacity-0">Correo electrónico</Label>
                        <Input 
                            type="text" 
                            className="form-control mb-2" 
                            id="nombre"
                            defaultValue="******test.com" 
                        />
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="******ghu.com" 
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Lemguange</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Etnia</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                        />
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Hora de contactación</Label>
                        <Input 
                            type="text" 
                            className="form-control" 
                            id="nombre"
                            defaultValue="13:00" 
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
        </Form>
    )
}

export default FormLeadInformation