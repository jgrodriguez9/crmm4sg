import { Button, Col, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import DatePicker from "../../Common/DatePicker";
import { useState } from "react";
import Select from "react-select";
import { getCallCenterPaginate } from "../../../helpers/catalogues/call_center";
import SelectAsync from "../../Common/SelectAsync";
import { getHotelPaginate } from "../../../helpers/catalogues/hotel";
import { getProgramPaginate } from "../../../helpers/catalogues/program";
import { getSegmentPaginate } from "../../../helpers/catalogues/segment";
import { getReservationStatusPaginate } from "../../../helpers/catalogues/reservation_status";

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
                        <Label htmlFor="estatus" className="form-label text-muted mb-0">Estatus</Label>
                        <SelectAsync 
                            fnFilter={getReservationStatusPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                            keyProperty="status"
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="ingresada" className="form-label text-muted mb-0">Ingresada Desde</Label>
                        <DatePicker 
                            id='ingresada'
                            onChangeDate={onChangeDateLLegada}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="ingresada-hasta" className="form-label text-muted mb-0">Hasta</Label>
                        <DatePicker 
                            id='ingresada-hasta'
                            onChangeDate={onChangeDateLLegada}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="certificado" className="form-label text-muted mb-0">No Certificado</Label>
                        <Input className="form-control" type="text" id="certificado"  />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="pais" className="form-label text-muted mb-0">País</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="pais"
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="estado" className="form-label text-muted mb-0">Estado</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="estado"
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="12">
                    <div className="mb-2">
                        <Label htmlFor="hotel" className="form-label text-muted mb-0">Hotel</Label>
                        <SelectAsync 
                            fnFilter={getHotelPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}

                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                    <div className="mb-2">
                        <Label htmlFor="departamento" className="form-label text-muted mb-0">Departamento</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="departamento"
                        />
                    </div>
                </Col>
                <Col xs="12" md="6">
                    <div className="mb-2">
                        <Label htmlFor="segmento" className="form-label text-muted mb-0">Segmento</Label>
                        <SelectAsync 
                            fnFilter={getSegmentPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="call-center" className="form-label text-muted mb-0">Call Center</Label>
                        <SelectAsync 
                            fnFilter={getCallCenterPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="campana" className="form-label text-muted mb-0">Campaña</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="campana"
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="programa" className="form-label text-muted mb-0">Programa</Label>
                        <SelectAsync 
                            fnFilter={getProgramPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                            keyProperty="program"
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="consultor" className="form-label text-muted mb-0">Consultos</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="consultor"
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="telefono" className="form-label text-muted mb-0">Teléfono</Label>
                        <DatePicker 
                            id='telefono'
                            onChangeDate={onChangeDateLLegada}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="correo-electronico" className="form-label text-muted mb-0">Correo electrónico</Label>
                        <DatePicker 
                            id='correo-electronico'
                            onChangeDate={onChangeDateLLegada}
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