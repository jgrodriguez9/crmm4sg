import { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import ReservationFilter from "../../../Components/Operation/Reservation/ReservationFilter";

const Reservation = () => {
    document.title="Reservación | CRM - M4S";
    const [item, setItems] = useState({
        loading: false,
        data: []
    });
    const [filterDialog, setFilterDialog] = useState(false)

    const toggleFilter = () => {
        setFilterDialog(!filterDialog);
    };

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
                                {/* <div>
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
                                </div> */}
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