import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CrmFilter from "../../../Components/Common/CrmFilter";
import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//Import actions
import {
    getContacts as onGetContacts,
  } from "../../../slices/thunks";
import DetailLead from "../../../Components/Operation/Lead/DetailLead";
import handleValidDate from "../../../util/handleValidDate";
import handleValidTime from "../../../util/handleValidTime";

const Lead = () => {
    document.title="Lead | CRM - M4S";
    const dispatch = useDispatch();
    const { crmcontacts, isContactSuccess, error } = useSelector((state) => ({
        crmcontacts: state.Crm.crmcontacts,
        isContactSuccess: state.Crm.isContactSuccess,
        error: state.Crm.error,
    }));
    const [info, setInfo] = useState([]);
    const [contact, setContact] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tag, setTag] = useState([]);
    const [assignTag, setAssignTag] = useState([]);
    const [modal, setModal] = useState(false);
    const [isInfoDetails, setIsInfoDetails] = useState(false);
    //detail lead
    const [showDetailLead, setShowDetailLead] = useState(false)

    useEffect(() => {
        if (crmcontacts && !crmcontacts.length) {
          dispatch(onGetContacts());
        }
      }, [dispatch, crmcontacts]);

    const toggleInfo = () => {
        setIsInfoDetails(!isInfoDetails);
    };
    
    
    const toggle = useCallback(() => {
        if (modal) {
          setModal(false);
          setContact(null);
        } else {
          setModal(true);
          setTag([]);
          setAssignTag([]);
        }
      }, [modal]);
    // Update Data
    const handleContactClick = useCallback((arg) => {
        const contact = arg;

        setContact({
        _id: contact._id,
        // img: contact.img,
        name: contact.name,
        company: contact.company,
        email: contact.email,
        designation: contact.designation,
        phone: contact.phone,
        lead_score: contact.lead_score,
        last_contacted: contact.date,
        // time: contact.time,
        tags: contact.tags,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Add Data
    const handleContactClicks = () => {
        setContact("");
        setIsEdit(false);
        toggle();
    };


    const columns = useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
            filterable: false,
            Cell: (contact) => (
              <>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    {contact.row.original.image_src ? <img
                      src={process.env.REACT_APP_API_URL + "/images/users/" + contact.row.original.image_src}
                      alt=""
                      className="avatar-xxs rounded-circle"
                    /> :
                      <div className="flex-shrink-0 avatar-xs me-2">
                        <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                          {contact.row.original.name.charAt(0)}
                        </div>
                      </div>
                      // <img src={dummyImg} alt="" className="avatar-xxs rounded-circle" />
                    }
                  </div>
                  <div className="flex-grow-1 ms-2 name">
                    {contact.row.original.name}
                  </div>
                </div>
              </>
            ),
          },
          {
            Header: "Company",
            accessor: "company",
            filterable: false,
          },
          {
            Header: "Email ID",
            accessor: "email",
            filterable: false,
          },
          {
            Header: "Phone No",
            accessor: "phone",
            filterable: false,
          },
          {
            Header: "Last Contacted",
            Cell: (contact) => (
              <>
                {handleValidDate(contact.row.original.last_contacted)},{" "}
                <small className="text-muted">{handleValidTime(contact.row.original.last_contacted)}</small>
              </>
            ),
          },
          {
            Header: "Action",
            Cell: (cellProps) => {
              return (
                <ul className="list-inline hstack gap-2 mb-0">
                  <li className="list-inline-item edit" title="Llamada">
                    <Link to="#" className="text-muted d-inline-block">
                      <i className="ri-phone-line fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item edit" title="Mensaje">
                    <Link to="#" className="text-muted d-inline-block">
                      <i className="ri-question-answer-line fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item edit" title="Correo electrónico">
                    <Link to="#" className="text-muted d-inline-block">
                      <i className="ri-mail-send-line fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item edit" title="Vista previa">
                    <Link to="#" className="text-muted d-inline-block">
                      <i 
                        className="ri-user-search-fill fs-16"
                        onClick={() => { 
                            const contactData = cellProps.row.original; 
                            setInfo(contactData); 
                            setShowDetailLead(true)
                        }}
                      ></i>
                    </Link>
                  </li>
                </ul>
              );
            },
          },
        ],
        [handleContactClick]
    );

    return (
        <>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb title="Lead" pageTitle="Inicio" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center flex-wrap gap-2">
                                        <div className="flex-grow-1">
                                        {/* <button
                                            className="btn btn-success add-btn"
                                            onClick={() => {
                                            //setModal(true);
                                            }}
                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i> Agregar Lead
                                        </button> */}
                                        </div>
                                        <div className="flex-shrink-0">
                                        <div className="hstack text-nowrap gap-2">                                        
                                            <button className="btn btn-info" onClick={toggleInfo}>
                                                <i className="ri-filter-2-line me-1 align-bottom"></i>{" "} Filtros
                                            </button>

                                        </div>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Col>
                        <Col xxl={12}>
                            <Card id="contactList">
                                <CardBody className="pt-0">
                                <div>
                                    {isContactSuccess && crmcontacts.length ? (
                                    <TableContainer
                                        columns={columns}
                                        data={(crmcontacts || [])}
                                        isGlobalFilter={false}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-3"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                        handleContactClick={handleContactClicks}
                                        isContactsFilter={true}
                                        SearchPlaceholder='Buscar...'
                                    />
                                    ) : (<Loader error={error} />)
                                    }
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <CrmFilter
                show={isInfoDetails}
                onCloseClick={() => setIsInfoDetails(false)}
            />
            <DetailLead
                show={showDetailLead} 
                onCloseClick={() => setShowDetailLead(false)}
                info={info}
            />
        </>
    );
};

export default Lead;