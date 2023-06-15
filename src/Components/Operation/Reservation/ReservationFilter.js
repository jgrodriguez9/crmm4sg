import { Button, Col, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import DatePicker from "../../Common/DatePicker";
import { useState } from "react";
import Select from "react-select";

const ReservationFilter = ({ show, onCloseClick }) => {
    const [filter, setFilter] = useState({
        reserva: ''
    })
    
    const onChangeFilter = (type, value) => {
        const copyFilter = {...filter}
        copyFilter[type] = value
        setFilter(copyFilter);
    }
    
    const onChangeDateLLegada = (date) => {
        console.log(date)
    }



    return (
        <Offcanvas
          direction="end"
          isOpen={show}
          id="filter-canvas"
          toggle={onCloseClick}
          scrollable={true}
        >
          <OffcanvasHeader className="bg-light" toggle={onCloseClick}>Filtros</OffcanvasHeader>
          <form className="d-flex flex-column justify-content-end h-100">
            <OffcanvasBody  className="mb-6">
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="reserva" className="form-label text-muted mb-0">Reserva</Label>
                        <Input className="form-control" type="text" id="reserva" value={filter.reserva} onChange={e=>onChangeFilter('reserva', e.target.value)} />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="id-booking" className="form-label text-muted mb-0">Id Booking</Label>
                        <Input className="form-control" type="text" id="id-booking" />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="confirmacion" className="form-label text-muted mb-0">Confirmación</Label>
                        <Input className="form-control" type="text" id="confirmacion" />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="llegada" className="form-label text-muted mb-0">Llegada Desde</Label>
                        <DatePicker 
                            id='llegada'
                            onChangeDate={onChangeDateLLegada}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="salida" className="form-label text-muted mb-0">Hasta</Label>
                        <DatePicker 
                            id='salida'
                            onChangeDate={onChangeDateLLegada}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="nombre" className="form-label text-muted mb-0">Nombre</Label>
                        <Input className="form-control" type="text" id="nombre" />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="apellido" className="form-label text-muted mb-0">Apellido</Label>
                        <Input className="form-control" type="text" id="apellido" />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="apellido" className="form-label text-muted mb-0">Estatus</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[{value: 'Share', label: 'Share'}, {value: 'Share', label: 'Share'}]}
                            placeholder="Seleccionar opción"
                            id="programa"
                        />
                    </div>
                </Col>
              </Row>
            </OffcanvasBody>
            <div className="py-3 px-3 border position-sticky bottom-0 w-100 bg-light ">
                <div className="d-flex align-items-center">
                    <div className="pe-2">
                        <Button
                            color="success"
                            type="submit"
                            size="sm"
                            className="fw-500"
                            onClick={onCloseClick}
                        >Buscar
                        </Button>
                    </div> 
                    <div>
                        <Button
                            color="danger"
                            outline
                            type="button"
                            size="sm"
                            className="fw-500"
                            onClick={onCloseClick}
                        >Limpiar filtros
                        </Button>
                    </div>                  
                </div>
            </div>
          </form>
        </Offcanvas>
      );
}

export default ReservationFilter