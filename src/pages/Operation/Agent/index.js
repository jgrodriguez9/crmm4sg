import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CrmFilter from "../../../Components/Common/CrmFilter";
import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//Import actions
import {
    getContacts as onGetContacts,
  } from "../../../slices/thunks";

const Agente = () => {
    document.title="Agente | CRM - M4S";
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

    useEffect(() => {
        if (crmcontacts && !crmcontacts.length) {
          dispatch(onGetContacts());
        }
      }, [dispatch, crmcontacts]);

    const toggleInfo = () => {
        setIsInfoDetails(!isInfoDetails);
    };
    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };
    const handleValidTime = (time) => {
        const time1 = new Date(time);
        const getHour = time1.getUTCHours();
        const getMin = time1.getUTCMinutes();
        const getTime = `${getHour}:${getMin}`;
        var meridiem = "";
        if (getHour >= 12) {
          meridiem = "PM";
        } else {
          meridiem = "AM";
        }
        const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
        return updateTime;
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
            Header: "Lead Score",
            accessor: "lead_score",
            filterable: false,
          },
          {
            Header: "Tags",
            Cell: (contact) => (
              <>
                {contact.row.original.tags.map((item, key) => (<span className="badge badge-soft-primary me-1" key={key}>{item}</span>))}
              </>
            ),
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
                  <li className="list-inline-item edit" title="Call">
                    <Link to="#" className="text-muted d-inline-block">
                      <i className="ri-phone-line fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item edit" title="Message">
                    <Link to="#" className="text-muted d-inline-block">
                      <i className="ri-question-answer-line fs-16"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        href="#"
                        className="btn btn-soft-secondary btn-sm dropdown"
                        tag="button"
                      >
                        <i className="ri-more-fill align-middle"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem className="dropdown-item" href="#"
                          onClick={() => { const contactData = cellProps.row.original; setInfo(contactData); }}
                        >
                          <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                          View
                        </DropdownItem>
                        <DropdownItem
                          className="dropdown-item edit-item-btn"
                          href="#"
                          onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
                        >
                          <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                          Edit
                        </DropdownItem>                        
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                    <BreadCrumb title="Agente" pageTitle="Inicio" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center flex-wrap gap-2">
                                        <div className="flex-grow-1">
                                        <button
                                            className="btn btn-success add-btn"
                                            onClick={() => {
                                            //setModal(true);
                                            }}
                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i> Agregar Agente
                                        </button>
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
                        <Col xxl={9}>
                            <Card id="contactList">
                                <CardBody className="pt-0">
                                <div>
                                    {isContactSuccess && crmcontacts.length ? (
                                    <TableContainer
                                        columns={columns}
                                        data={(crmcontacts || [])}
                                        isGlobalFilter={true}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-3"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                        handleContactClick={handleContactClicks}
                                        isContactsFilter={true}
                                        SearchPlaceholder='Search for contact...'
                                    />
                                    ) : (<Loader error={error} />)
                                    }
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xxl={3}>
                            <Card id="contact-view-detail">
                                <CardBody className="text-center">
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
                                <h5 className="mt-4 mb-1">{info.name || "Tonya Noble"}</h5>
                                <p className="text-muted">{info.company || "Nesta Technologies"}</p>

                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item avatar-xs">
                                    <Link
                                        to="#"
                                        className="avatar-title bg-soft-success text-success fs-15 rounded"
                                    >
                                        <i className="ri-phone-line"></i>
                                    </Link>
                                    </li>
                                    <li className="list-inline-item avatar-xs">
                                    <Link
                                        to="#"
                                        className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                                    >
                                        <i className="ri-mail-line"></i>
                                    </Link>
                                    </li>
                                    <li className="list-inline-item avatar-xs">
                                    <Link
                                        to="#"
                                        className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                                    >
                                        <i className="ri-question-answer-line"></i>
                                    </Link>
                                    </li>
                                </ul>
                                </CardBody>
                                <CardBody>
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                    Personal Information
                                </h6>
                                <p className="text-muted mb-4">
                                    Hello, I'm {info.name || "Tonya Noble"}, The most effective objective is one
                                    that is tailored to the job you are applying for. It states
                                    what kind of career you are seeking, and what skills and
                                    experiences.
                                </p>
                                <div className="table-responsive table-card">
                                    <Table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                        <td className="fw-medium">
                                            Designation
                                        </td>
                                        <td>Lead Designer / Developer</td>
                                        </tr>
                                        <tr>
                                        <td className="fw-medium">
                                            Email ID
                                        </td>
                                        <td>{info.email || "tonyanoble@velzon.com"}</td>
                                        </tr>
                                        <tr>
                                        <td className="fw-medium">
                                            Phone No
                                        </td>
                                        <td>{info.phone || "414-453-5725"}</td>
                                        </tr>
                                        <tr>
                                        <td className="fw-medium">
                                            Lead Score
                                        </td>
                                        <td>{info.lead_score || "154"}</td>
                                        </tr>
                                        <tr>
                                        <td className="fw-medium">
                                            Tags
                                        </td>
                                        <td>
                                            {(info.tags || ["Lead", "Partner"]).map((item, key) => (<span className="badge badge-soft-primary me-1" key={key}>{item}</span>))}
                                        </td>
                                        </tr>
                                        <tr>
                                        <td className="fw-medium">
                                            Last Contacted
                                        </td>
                                        <td>
                                            {handleValidDate(info.last_contacted || "2021-04-13T18:30:00.000Z")}{" "}
                                            <small className="text-muted">{handleValidTime(info.last_contacted || "2021-04-13T18:30:00.000Z")}</small>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </Table>
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
        </>
    );
};

export default Agente;