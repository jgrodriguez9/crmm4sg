import { useState } from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Accordion,
  AccordionItem,
  Collapse,
  Button,
} from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const DetailLead = ({ show, onCloseClick, info=null }) => {   
    
    const [acercaAcc, setAcercaAcc] = useState(true);
    const [atribucionAcc, setAtribucionAcc] = useState(false)
    const [beneficiosAcc, setBeneficiosAcc] = useState(false)

    const openAccordion = (elemento, valorElemento) => {
        switch(elemento){
            case "acercaAcc":
                setAcercaAcc(valorElemento);
                setAtribucionAcc(false)
                setBeneficiosAcc(false)
                break;
            case "atribucionAcc":
                setAtribucionAcc(valorElemento);
                setAcercaAcc(false)
                setBeneficiosAcc(false)
                break;
            case "beneficiosAcc":
                setBeneficiosAcc(valorElemento)
                setAcercaAcc(false)
                setAtribucionAcc(false)
                break;
            default:
                break
        }
    }

    return (
        <Offcanvas
            direction="end"
            isOpen={show}
            id="filter-canvas"
            toggle={onCloseClick}
            scrollable={true}
            className="w-400"
        >
        <OffcanvasHeader className="bg-gradient bg-primary canvas-title" toggle={onCloseClick}>
            {info?.name}
        </OffcanvasHeader>
        <form className="d-flex flex-column justify-content-end h-100">
            {info && 
                <OffcanvasBody className="p-0 mb-6">
                    <div className="d-flex mb-2 p-3">
                        <div className="pe-2">
                            <div className="position-relative d-inline-block">
                                <img
                                src={process.env.REACT_APP_API_URL + "/images/users/" + (info.image_src || "avatar-10.jpg")}
                                alt=""
                                className="avatar-lg rounded-circle img-thumbnail"
                                />
                                <span className="contact-active position-absolute rounded-circle bg-success">
                                <span className="visually-hidden"></span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <h5 className="mt-4 mb-1">{info.name}</h5>
                            <p className="text-muted">{info.company}</p>
                        </div>
                    </div>

                    <Accordion 
                        id="vista-previa-accordion" 
                        className="lefticon-accordion custom-accordionwithicon accordion-border-box"
                    >
                        <AccordionItem className="border-start-0 border-end-0  rounded-0">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className={classNames("accordion-button", { collapsed: !acercaAcc })} 
                                    type="button" onClick={() => openAccordion("acercaAcc", !acercaAcc)} 
                                    style={{ cursor: "pointer" }} >
                                    Acerca de este lead
                                </button>
                            </h2>
                            <Collapse isOpen={acercaAcc} className="accordion-collapse" id="collapseOne" >
                                <div className="accordion-body">
                                    <div className="mb-2">
                                        <h6 className="fs-6 fw-normal mb-0">Correos</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******test.com</div>
                                            <div>
                                                <i className="ri-mail-line text-danger fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******test1.com</div>
                                            <div>
                                                <i className="ri-mail-line text-danger fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-2">
                                        <h6 className="fs-6 fw-normal mb-0">Teléfonos</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******42</div>
                                            <div>
                                                <i className="ri-phone-line text-success fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******25</div>
                                            <div>
                                                <i className="ri-phone-line text-success fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fs-6 fw-semibold text-primary">Hora de contactación</span>
                                            <span className="fs-6 fw-semibold text-primary">13:00</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Collapse>
                        </AccordionItem>
                        <AccordionItem className="border-start-0 border-end-0 mt-0 border-top-0 rounded-0">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className={classNames("accordion-button", { collapsed: !atribucionAcc })} 
                                    type="button" onClick={() => openAccordion("atribucionAcc", !atribucionAcc)} 
                                    style={{ cursor: "pointer" }} >
                                    Atribución de creación de este lead
                                </button>
                            </h2>
                            <Collapse isOpen={atribucionAcc} className="accordion-collapse" id="collapseOne" >
                                <div className="accordion-body">
                                    <div className="mb-2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Referido por</h6>
                                            <span className="fs-6">John Doe</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Copropietario</h6>
                                            <span className="fs-6">Jesus Enrique</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Contrato</h6>
                                            <span className="fs-6">RFCG555</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Dirección</h6>
                                            <span className="fs-6">NN, MEX</span>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <h6 className="fs-6 fw-normal mb-0">Correos</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******test.com</div>
                                            <div>
                                                <i className="ri-mail-line text-danger fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******test1.com</div>
                                            <div>
                                                <i className="ri-mail-line text-danger fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h6 className="fs-6 fw-normal mb-0">Teléfonos</h6>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******42</div>
                                            <div>
                                                <i className="ri-phone-line text-success fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>*******25</div>
                                            <div>
                                                <i className="ri-phone-line text-success fs-15" style={{cursor: 'pointer'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </AccordionItem>
                        <AccordionItem className="border-start-0 border-end-0 mt-0 border-top-0 rounded-0">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className={classNames("accordion-button", { collapsed: !beneficiosAcc })} 
                                    type="button" onClick={() => openAccordion("beneficiosAcc", !beneficiosAcc)} 
                                    style={{ cursor: "pointer" }} >
                                    Beneficios de este lead
                                </button>
                            </h2>
                            <Collapse isOpen={beneficiosAcc} className="accordion-collapse" id="collapseOne" >
                                <div className="accordion-body">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Booking</h6>
                                            <span className="fs-6"></span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Membresía</h6>
                                            <span className="fs-6"></span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="fs-6 fw-normal mb-0">Certificados</h6>
                                            <span className="fs-6">RFCG555</span>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </AccordionItem>
                    </Accordion>        
                </OffcanvasBody>
            }
            <div className="py-3 px-2 border position-sticky bottom-0 w-100 bg-light ">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Button
                            color="success"
                            type="submit"
                            size="sm"
                            className="fw-500"
                            onClick={onCloseClick}
                        >Guardar
                        </Button>{" "}
                        <Button
                            type="button"
                            size="sm"
                            className="fw-500 btn-soft-dark"
                            onClick={onCloseClick}
                        >Cancelar
                        </Button>
                    </div>
                    <div>
                        <Link
                            to={`/lead/1`}
                            className="fw-normal btn btn-link btn-sm"
                        >Ver registro
                        </Link>
                    </div>                    
                </div>
            </div>
        </form>
        </Offcanvas>
    );
};

export default DetailLead;
