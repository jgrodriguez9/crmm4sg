import { Button, Col, Label, Row } from "reactstrap"

const ViewLeadInformation = ({editMode, setEditMode}) => {

    return (
        <>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label" htmlFor="nombre">Nombre</Label>
                        <div className="form-control">Daniel</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Apellido</Label>
                        <div className="form-control">Maximiliano</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Copropietario</Label>
                        <div className="form-control">Jesus Enrique</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">País</Label>
                        <div className="form-control">United States</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Estado</Label>
                        <div className="form-control">N/A</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Teléfono</Label>
                        <div className="form-control mb-2">******55</div>
                        <div className="form-control">******85</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Correo electrónico</Label>
                        <div className="form-control mb-2">******test.com</div>
                        <div className="form-control">******ghu.com</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label opacity-0">Correo electrónico</Label>
                        <div className="form-control mb-2">******test.com</div>
                        <div className="form-control">******ghu.com</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Lemguange</Label>
                        <div className="form-control">N/A</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Etnia</Label>
                        <div className="form-control">N/A</div>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="mb-3">
                        <Label className="form-label">Hora de contactación</Label>
                        <div className="form-control">13:00</div>
                    </div>
                </Col>
            </Row>
            {!editMode && <div className="d-flex justify-content-end">
                <Button 
                    type="button"
                    color="primary"
                    onClick={() =>  setEditMode(true)}
                >Editar</Button>
            </div>}
        </>
    )
}

export default ViewLeadInformation