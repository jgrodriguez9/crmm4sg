import { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import ReservationFilter from "../../../Components/Operation/Reservation/ReservationFilter";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Reservation = () => {
    document.title="Reservación | CRM - M4S";
    const [item, setItems] = useState({
        loading: false,
        data: [],
        isSuccess: true,
        error: null
    });
    const [filterDialog, setFilterDialog] = useState(false)

    const toggleFilter = () => {
        setFilterDialog(!filterDialog);
    };

    const columns = useMemo(
        () => [
          {
            Header: "ID",
            accessor: "id",
            filterable: false,
          },
          {
            Header: "Confirmation",
            accessor: "confirmation",
            filterable: false,
          },
          {
            Header: "Nombre",
            accessor: "nombre",
            filterable: false,
          },
          {
            Header: "Id Booking",
            accessor: "idBooking",
            filterable: false,
          },
          {
            Header: "LLegada",
            accessor: "llegada",
            filterable: false,
          },
          {
            Header: "Salida",
            accessor: "salida",
            filterable: false,
          },
          {
            Header: "Action",
            Cell: (cellProps) => {
              return (
                <ul className="list-inline hstack gap-2 mb-0">
                  <li className="list-inline-item edit" title="Vista previa">
                    <Link to="#" className="text-muted d-inline-block">
                      <i 
                        className="ri-user-search-fill fs-16"
                        onClick={() => { 
                            const itemData = cellProps.row.original; 
                            //setInfo(contactData); 
                            //setShowDetailLead(true)
                        }}
                      ></i>
                    </Link>
                  </li>
                </ul>
              );
            },
          },
        ],
        []
    );

    return (
        <>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb title="Reservaciones" pageTitle="Inicio" />
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
                                            <button className="btn btn-info" onClick={toggleFilter}>
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
                                    {item.isSuccess ? (
                                    <TableContainer
                                        columns={columns}
                                        data={(item.data)}
                                        isGlobalFilter={false}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-3"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                        isContactsFilter={true}
                                        SearchPlaceholder='Buscar...'
                                    />
                                    ) : (<Loader error={item.error} />)
                                    }
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ReservationFilter
                show={filterDialog}
                onCloseClick={() => setFilterDialog(false)}
            />           
        </>
    );

}

export default Reservation