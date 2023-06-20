import React,{ useState } from "react";
import classNames from "classnames"
import { Accordion, AccordionItem, Button, Collapse, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap"
import { Link } from "react-router-dom";

const DetailCanvas = ({show, onCloseClick, data=null}) => {
    const [info, setInfo] = useState(data);
    const openAccordion = (idItem, valorElemento) => {
        const copyItems = info.items.map(it=>({...it, collapse: true}))
        const index = copyItems.findIndex(it=>it.id===idItem);
        copyItems[index].collapse = valorElemento;
        setInfo(prev=>({
            ...prev,
            items: copyItems
        }))
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
                {info?.title}
            </OffcanvasHeader>
            <OffcanvasBody className="p-0 mb-6">
                {
                    info?.header &&
                    <div className="d-flex mb-2 p-3">
                        <div className="pe-2">
                            {info.header.img && 
                            <div className="position-relative d-inline-block">
                                <img
                                    src={info.header.img.url}
                                    alt={info.header.img.alt}
                                    className="avatar-lg rounded-circle img-thumbnail"
                                />
                                <span className="contact-active position-absolute rounded-circle bg-success">
                                <span className="visually-hidden"></span>
                                </span>
                            </div>}
                        </div>
                        <div>
                            <h5 className="mt-4 mb-1">{`${info.header.title.label} ${info.header.title.value}`}</h5>
                            {
                                info.header.body.map((it, idx) => (
                                    <p key={`header-${idx}`} className="text-muted mb-0">{`${it.label} ${it.value}`}</p>
                                ))
                            }                            
                        </div>
                    </div>
                }
                {info && 
                <Accordion 
                    id="vista-previa-accordion" 
                    className="lefticon-accordion custom-accordionwithicon accordion-border-box"
                    open={''}
                    toggle={() => {}}
                >
                    {
                        info?.items.map((it, indexIt) => (
                            <AccordionItem key={it.id} className={`border-start-0 border-end-0  rounded-0 ${indexIt > 0 ? 'mt-0 border-top-0' : ''}`}>
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className={classNames("accordion-button", { collapsed: !it.collapse })} 
                                        type="button" onClick={() => openAccordion(it.id, !it.collapse)} 
                                        style={{ cursor: "pointer" }} >
                                        {it.title}
                                    </button>
                                </h2>
                                <Collapse isOpen={!it.collapse} className="accordion-collapse" >
                                    <div className="accordion-body">
                                        <div>
                                            {
                                                it.body.map((bElement, idx) => (
                                                    <div key={`body-${idx}`} className={bElement.value instanceof Array ? 'mb-2' : 'd-flex justify-content-between align-items-center'}>
                                                        <h6 className={`fs-6 fw-normal mb-0 ${bElement.extraClassess}`}>{bElement.label}</h6>
                                                        {
                                                            bElement.value instanceof Array ?
                                                            bElement.value.map((bValue, indexValue) => (
                                                                <div key={`value=${indexValue}`} className="d-flex justify-content-between align-items-center">
                                                                    <div>{bValue.text}</div>
                                                                    <div>
                                                                        <i className={`fs-15 ${bValue.iconClasses}`} style={{cursor: 'pointer'}}></i>
                                                                    </div>
                                                                </div>
                                                            )) :
                                                            <span className={`fs-6 ${bElement.extraClassess}`}>{bElement.value}</span>
                                                        }                                                        
                                                    </div>
                                                ))
                                            }
                                        </div>                                        
                                    </div>
                                </Collapse>
                            </AccordionItem>
                        ))
                    }
                </Accordion>}
            </OffcanvasBody>
            <div className="py-3 px-2 border position-sticky bottom-0 w-100 bg-light ">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Link
                            to={info?.goToView}
                            className="fw-normal btn btn-success btn-sm"
                        >Ver registro
                        </Link>
                    </div>                    
                </div>
            </div>
        </Offcanvas>
    )
};

export default React.memo(DetailCanvas)

