import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import ReservationFilter from "../../../Components/Operation/Reservation/ReservationFilter";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listReservation } from "../../../common/data/common";
import DetailCanvas from "../../../Components/Common/DetailCanvas";

const Reservation = () => {
    document.title="Reservación | CRM - M4SG";
    const navigate = useNavigate();
    const [item, setItems] = useState({
        loading: true,
        data: [],
        isSuccess: false,
        error: null
    });
    const [filterDialog, setFilterDialog] = useState(false)
    //detail canva
    const [showDetail, setShowDetail] = useState(false)
    const [info, setInfo] = useState(null);

    const toggleFilter = () => {
        setFilterDialog(!filterDialog);
    };

    const builtInfo = (dataTable) => {
        const header = {
            title: {
                label:  `ID: Reservación: `,
                value: dataTable.id
            },
            img: null,
            body: [
                {
                    label:  `ID: Booking: `,
                    value: 607276961
                },
                {
                    label:  `ID: Confirmación: `,
                    value: 8065965
                }
            ]
        }
        const detailReservation = {
            id: 'detailReservation',
            title: 'Detalle de la reservación',
            collapse: false,
            body: [
                {
                    label: 'Hotel',
                    value: 'Ocean Spa Hotel'
                },
                {
                    label: 'Plan',
                    value: 'All Inclusive Multiple'
                },
                {
                    label: 'Fecha llegada',
                    value: '29/06/2023'
                },
                {
                    label: 'Fecha salida',
                    value: '03/07/2023'
                },
                {
                    label: 'Tipo de habitación',
                    value: 'Standard King'
                },
                {
                    label: 'Noches',
                    value: 4
                },
                {
                    label: 'Adultos',
                    value: 4
                },
                {
                    label: 'Juniors',
                    value: 0
                },
                {
                    label: 'Menores gratis',
                    value: 0
                },
                {
                    label: 'Menores pagan',
                    value: 0
                },
                {
                    label: 'Infantes',
                    value: 0
                }
            ]
        }
        const detailCliente = {
            id: 'detailCliente',
            title: 'Detalle del titular',
            collapse: true,
            body: [
                {
                    label: 'Estado civil',
                    value: 'Casado'
                },
                {
                    label: 'Ingreso',
                    value: '0-150000'
                },
                {
                    label: 'Tarjetas',
                    value: 1
                },
                {
                    label: 'Visa',
                    value: true
                },
                {
                    label: 'Master Card',
                    value: false
                },
                {
                    label: 'Amex',
                    value: false
                },
                {
                    label: 'Otras',
                    value: false
                },
                {
                    label: 'Cual?',
                    value: ''
                },
                {
                    label: 'Estado de ánimo',
                    value: 'Satisfecho'
                }
            ]     
        }
        const detailOperacion = {
            id: 'detailOperacion',
            title: 'Detalle de la operación',
            collapse: true,
            body: [
                {
                    label: 'Proveedor',
                    value: 'Marketing 4 Sunset Group'
                },
                {
                    label: 'Hooked',
                    value: 'Hooked'
                },
                {
                    label: 'Representante',
                    value: 'MMDINAC'
                },
                {
                    label: 'Precall',
                    value: '01/05/2023 11:28:40'
                }
            ]
        }
        const data = {
            title: `ID: Reservación: ${dataTable.id}`,
            header: header,
            items: [detailReservation, detailCliente, detailOperacion],
            goToView: `/reservation/${dataTable.id}`
        }
        setInfo(data)
    }

    const columns = useMemo(
        () => [
          {
            Header: "Id Reservación",
            accessor: "id",
            filterable: false,
            style: {
                cursor: 'pointer',
            }
          },
          {
            Header: "Confirmación",
            accessor: "idConfirmation",
            filterable: false,
            style: {
                cursor: 'pointer',
            }
          },
          {
            Header: "Nombre",
            accessor: "nombre",
            filterable: false,
            style: {
                cursor: 'pointer'
            }
          },
          {
            Header: "Id Booking",
            accessor: "idBooking",
            filterable: false,
            style: {
                cursor: 'pointer',
            }
          },
          {
            Header: "LLegada",
            accessor: "llegada",
            filterable: false,
            style: {
                cursor: 'pointer',
            }
          },
          {
            Header: "Salida",
            accessor: "salida",
            filterable: false,
            style: {
                cursor: 'pointer',
            }
          },
          {
            id: "action",
            Cell: (cellProps) => {
              return (
                <ul className="list-inline hstack gap-2 mb-0">
                  <li className="list-inline-item edit" title="Vista previa">
                    <Link to="#" className="text-muted d-inline-block">
                      <i 
                        className="ri-file-search-fill fs-16"
                        onClick={() => { 
                            const itemData = cellProps.row.original;
                            builtInfo(itemData) 
                            setShowDetail(true)
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

    const gotToPage = (row) => {
        navigate(`/reservation/${row.id}`)
    }

    //test
    useEffect(() => {
        setTimeout(() => {
            setItems(prev=>({
                ...prev,
                loading: false,
                isSuccess: true,
                data: listReservation
            }))
        }, 2000)
    }, [])

    return (
        <>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb title="Reservaciones" pageTitle="Inicio" urlPageTitle="/dashboard" />
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
                                    {item.isSuccess || !item.loading ? (
                                    <TableContainer
                                        columns={columns}
                                        data={item.data}
                                        isGlobalFilter={false}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-3"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                        isContactsFilter={true}
                                        SearchPlaceholder='Buscar...'
                                        onSelectRow={gotToPage}
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
            {info &&
            <DetailCanvas
                show={showDetail} 
                onCloseClick={() => {
                    setShowDetail(false)
                    setInfo(null)
                }}
                data={info}
            />}        
        </>
    );

}

export default Reservation