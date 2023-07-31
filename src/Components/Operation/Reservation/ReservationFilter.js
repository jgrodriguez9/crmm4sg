import { Button, Col, Input, Label, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import DatePicker from "../../Common/DatePicker";
import Select from "react-select";
import { getCallCenterPaginate } from "../../../helpers/catalogues/call_center";
import SelectAsync from "../../Common/SelectAsync";
import { getHotelPaginate } from "../../../helpers/catalogues/hotel";
import { getProgramPaginate } from "../../../helpers/catalogues/program";
import { getSegmentPaginate } from "../../../helpers/catalogues/segment";
import { getReservationStatusPaginate } from "../../../helpers/catalogues/reservation_status";
import React from "react";
import moment from "moment";
import { getCampaingPaginate } from "../../../helpers/catalogues/campaign";

const ReservationFilter = ({ 
    show, 
    onCloseClick, 
    query, 
    setQuery, 
    buscar, 
    dataSelect,
    setDataSelect, 
    onCleanFilter,
}) => {    

    return (
        <Offcanvas
          direction="end"
          isOpen={show}
          id="filter-canvas"
          toggle={onCloseClick}
          scrollable={true}
        >
          <OffcanvasHeader className="bg-light" toggle={onCloseClick}>Filtros</OffcanvasHeader>
          <div className="d-flex flex-column justify-content-end h-100">
            <OffcanvasBody  className="mb-6">
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="reserva" className="form-label text-muted mb-0">Reserva</Label>
                        <Input className="form-control" 
                            type="text" 
                            id="reserva" 
                            value={query.id} 
                            onChange={e=>setQuery(prev=>({...prev, id: e.target.value}))} 
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="id-booking" className="form-label text-muted mb-0">Id Booking</Label>
                        <Input 
                            className="form-control" 
                            type="text" id="id-booking" 
                            value={query.booking} 
                            onChange={e=>setQuery(prev=>({...prev, booking: e.target.value}))} 
                        />
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
                            date={query.checkInStart ? moment(query.checkInStart, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''}
                            onChangeDate={value => {
                                if(value.length > 0){
                                    setQuery(prev=>({...prev, checkInStart: moment(value[0]).format('YYYY-MM-DD')}))
                                }else{
                                    setQuery(prev=>({...prev, checkInStart: ''}))
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="salida" className="form-label text-muted mb-0">Hasta</Label>
                        <DatePicker 
                            id='salida'
                            date={query.checkInEnd ? moment(query.checkInEnd, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''}
                            onChangeDate={value => {
                                if(value.length > 0){
                                    setQuery(prev=>({...prev, checkInEnd: moment(value[0]).format('YYYY-MM-DD')}))
                                }else{
                                    setQuery(prev=>({...prev, checkInEnd: ''}))
                                }
                            }}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="nombre" className="form-label text-muted mb-0">Nombre</Label>
                        <Input className="form-control" type="text" id="nombre" 
                            value={query.firstName} 
                            onChange={e=>setQuery(prev=>({...prev, firstName: e.target.value}))}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="apellido" className="form-label text-muted mb-0">Apellido</Label>
                        <Input className="form-control" type="text" id="apellido" 
                            value={query.lastName} 
                            onChange={e=>setQuery(prev=>({...prev, lastName: e.target.value}))} 
                        />
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
                            value={dataSelect.statusModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, status: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    statusModel: value
                                }))                                
                            }}
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
                            date={query.registedDateStart ? moment(query.registedDateStart, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''}
                            onChangeDate={value => {
                                if(value.length > 0){
                                    setQuery(prev=>({...prev, registedDateStart: moment(value[0]).format('YYYY-MM-DD')}))
                                }else{
                                    setQuery(prev=>({...prev, registedDateStart: ''}))
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="ingresada-hasta" className="form-label text-muted mb-0">Hasta</Label>
                        <DatePicker 
                            id='ingresada-hasta'
                            date={query.registedDateEnd ? moment(query.registedDateEnd, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''}
                            onChangeDate={value => {
                                if(value.length > 0){
                                    setQuery(prev=>({...prev, registedDateEnd: moment(value[0]).format('YYYY-MM-DD')}))
                                }else{
                                    setQuery(prev=>({...prev, registedDateEnd: ''}))
                                }
                            }}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="certificado" className="form-label text-muted mb-0">No Certificado</Label>
                        <Input className="form-control" type="text" id="certificado"  
                            value={query.certificate} 
                            onChange={e=>setQuery(prev=>({...prev, certificate: e.target.value}))} 
                        />
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
                <Col xs="12" md="6">
                    <div className="mb-2">
                        <Label htmlFor="hotel" className="form-label text-muted mb-0">Hotel</Label>
                        <SelectAsync 
                            fnFilter={getHotelPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                            value={dataSelect.hotelModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, hotel: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    hotelModel: value
                                }))                                
                            }}
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
                            value={dataSelect.segmentModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, segment: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    segmentModel: value
                                }))                                
                            }}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                {/* <Col xs="12" md="6">
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
                </Col> */}
              </Row>
              <Row>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="call-center" className="form-label text-muted mb-0">Call Center</Label>
                        <SelectAsync 
                            fnFilter={getCallCenterPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                            value={dataSelect.callCenterModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, callCenter: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    callCenterModel: value
                                }))                                
                            }}
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="campana" className="form-label text-muted mb-0">Campaña</Label>
                        <SelectAsync 
                            fnFilter={getCampaingPaginate}
                            query={'?page=1&max=10'}
                            keyCompare={'name'}
                            value={dataSelect.campaingModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, campaing: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    campaingModel: value
                                }))                                
                            }}
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
                            value={dataSelect.programModel} 
                            onChange={value=>{
                                setQuery(prev=>({...prev, program: value?.value ?? ''}))
                                setDataSelect(prev=>({
                                    ...prev,
                                    programModel: value
                                }))                                
                            }}
                        />
                    </div>
                </Col>
              </Row>
              <Row>
                {/* <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="consultor" className="form-label text-muted mb-0">Consultor</Label>
                        <Select
                            className="mb-0"
                            value={null}
                            onChange={() => {}}
                            options={[]}
                            placeholder="Seleccionar opción"
                            id="consultor"
                        />
                    </div>
                </Col> */}
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="telefono" className="form-label text-muted mb-0">Teléfono</Label>
                        <Input className="form-control" 
                            type="text" 
                            id="telefono" 
                            value={query.movil} 
                            onChange={e=>setQuery(prev=>({...prev, movil: e.target.value}))} 
                        />
                    </div>
                </Col>
                <Col xs="12" md="4">
                    <div className="mb-2">
                        <Label htmlFor="correo-electronico" className="form-label text-muted mb-0">Correo electrónico</Label>
                        <Input className="form-control" 
                            type="text" 
                            id="correo-electronico" 
                            value={query.email} 
                            onChange={e=>setQuery(prev=>({...prev, email: e.target.value}))} 
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
                            type="button"
                            size="sm"
                            className="fw-500"
                            onClick={buscar}
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
                            onClick={onCleanFilter}
                        >Limpiar filtros
                        </Button>
                    </div>                  
                </div>
            </div>
          </div>
        </Offcanvas>
      );
}

export default ReservationFilter