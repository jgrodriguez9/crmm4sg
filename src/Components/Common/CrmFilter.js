import React, { useState } from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

const CrmFilter = ({ show, onCloseClick }) => {
  const [selectCountry, setselectCountry] = useState(null);

const handleselectCountry = (selectCountry) => {
    setselectCountry(selectCountry);
  }

  const country = [
    {
      options: [
        { label: "Select country", value: "Select country" },
        { label: "Argentina", value: "Argentina" },
        { label: "Belgium", value: "Belgium" },
        { label: "Brazil", value: "Brazil" },
        { label: "Colombia", value: "Colombia" },
        { label: "Denmark", value: "Denmark" },
        { label: "France", value: "France" },
        { label: "Germany", value: "Germany" },
        { label: "Mexico", value: "Mexico" },
        { label: "Russia", value: "Russia" },
        { label: "Spain", value: "Spain" },
        { label: "Syria", value: "Syria" },
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "United States of America", value: "United States of America"},
      ],
    },
  ];

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
              <div className="mb-3">
                <Label
                  htmlFor="programa-select"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  Programa
                </Label>
                <Select
                  className="mb-0"
                  value={selectCountry}
                  onChange={() => {
                    handleselectCountry();
                  }}
                  options={[{value: 'Share', label: 'Share'}]}
                  placeholder="Seleccionar opción"
                  id="programa-select"
                ></Select>
              </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="tipobusqueda-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Tipo búsqueda
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Tipo búsqueda 1', label: 'Tipo búsqueda 1'}]}
                    placeholder="Seleccionar opción"
                    id="tipobusqueda-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="8">
              <div className="mb-3">
                <Label
                  htmlFor="nombre"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  Nombre
                </Label>
                <Input
                    className="form-control"
                    type="text"
                    id="nombre"
                />
              </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                <Label
                  htmlFor="telefono"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  Teléfono
                </Label>
                <Input
                    className="form-control"
                    type="text"
                    id="telefono"
                />
              </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                <Label
                  htmlFor="pais-select"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  País
                </Label>
                <Select
                  className="mb-0"
                  value={selectCountry}
                  onChange={() => {
                    handleselectCountry();
                  }}
                  options={country}
                  placeholder="Seleccionar opción"
                  id="pais-select"
                ></Select>
              </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="estado-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Estado
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Estado 1', label: 'Estado 1'}]}
                    placeholder="Seleccionar opción"
                    id="estado-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="etnia-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Etnia
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Etnia 1', label: 'Etnia 1'}]}
                    placeholder="Seleccionar opción"
                    id="etnia-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="8">
              <div className="mb-3">
                <Label
                  htmlFor="fecha-range"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >Fecha
                </Label>
                <Flatpickr
                  className="form-control"
                  id="fecha-range"
                  placeholder="Seleccionar rango de fecha"
                  options={{
                    mode: "range",
                    dateFormat: "d-M-Y",
                  }}
                />
              </div>              
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="consultor-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Consultor
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Consultor 1', label: 'Consultor 1'}]}
                    placeholder="Seleccionar opción"
                    id="consultor-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="tiponota-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Tipo nota
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Tipo nota 1', label: 'Tipo nota 1'}]}
                    placeholder="Seleccionar opción"
                    id="tiponota-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                <Label
                  htmlFor="fecha-nota"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >Fecha nota
                </Label>
                <Flatpickr
                  className="form-control"
                  id="fecha-nota"
                  placeholder="Seleccionar fecha"
                  options={{
                    dateFormat: "d-M-Y",
                  }}
                />
              </div>              
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="segmento-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Segmento
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Segmento 1', label: 'Segmento 1'}]}
                    placeholder="Seleccionar opción"
                    id="segmento-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                  <Label
                    htmlFor="motivonota-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0"
                  >
                    Motivo nota
                  </Label>
                  <Select
                    className="mb-0"
                    value={selectCountry}
                    onChange={() => {
                      handleselectCountry();
                    }}
                    options={[{value: 'Motivo nota 1', label: 'Motivo nota 1'}]}
                    placeholder="Seleccionar opción"
                    id="motivonota-select"
                  ></Select>
                </div>
            </Col>
            <Col xs="12" md="4">
              <div className="mb-3">
                <Label
                  htmlFor="id-booking"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  ID Booking
                </Label>
                <Input
                    className="form-control"
                    type="text"
                    id="id-booking"
                />
              </div>
            </Col>
            <Col xs="12" md="4">
              <div className="form-check">
                  <Label
                    htmlFor="segmento-select"
                    className="form-label text-muted text-uppercase fw-semibold mb-0 opacity-0 d-block"
                  >
                    Segmento
                  </Label>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="con-referidos"
                    defaultValue="option1"
                  />
                  <Label className="form-check-label" htmlFor="con-referidos">
                    Con referidos
                  </Label>
                </div>
            </Col>
            <Col xs="12" md="8">
              <div className="mb-3">
                <Label
                  htmlFor="contarto"
                  className="form-label text-muted text-uppercase fw-semibold mb-0"
                >
                  Contrato
                </Label>
                <Input
                    className="form-control"
                    type="text"
                    id="contarto"
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
};

export default CrmFilter;
