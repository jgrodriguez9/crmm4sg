import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CrmFilter from "../../../Components/Common/CrmFilter";
import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Import actions
import DetailCanvas from "../../../Components/Common/DetailCanvas";
import { listClient } from "../../../common/data/common";
import moment from "moment";
import parseObjectToQueryUrl from "../../../util/parseObjectToQueryUrl";
import { useQuery } from "react-query";
import { getCustomerPaginate } from "../../../helpers/customer";
import PaginationManual from "../../../Components/Common/PaginationManual";
import { addMessage } from "../../../slices/messages/reducer";
import showFriendlyMessafe from "../../../util/showFriendlyMessafe";

const initFilter = {
  //reserva
  id: '',
  callCenter: '',
  lastName: '',
  firstName: '',
  email: '',
  movil: '',
  country: '',
  state: ''
}
const initFilterModel = {
  callCenterModel: null,
}

const Lead = () => {
    document.title="Cliente | CRM - M4SG";
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [query, setQuery] = useState({
      max: 10,
      page: 1,
      ...initFilter
    })
    const [queryFilter, setQueryFilter] = useState(parseObjectToQueryUrl(query))
    //query filter 
    const fecthItems = async (q) => {
      const response = await getCustomerPaginate(`?${q}`);
      return response
    }
    //service
    const {data: itemsData, error: errorItemsQuery, isLoading, isSuccess} = 
        useQuery(['getCustomerPaginate', queryFilter], () => fecthItems(queryFilter),
      {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        staleTime: 3 * (60 * 1000),
      }
    );

      useEffect(() => {        
        if(errorItemsQuery?.code){
            dispatch(addMessage({
                message: showFriendlyMessafe(errorItemsQuery?.code),
                type: 'error'
            }))
        }
    }, [errorItemsQuery])

    const [dataSelect, setDataSelect] = useState(initFilterModel)
    const [info, setInfo] = useState(null);  
    const [filterDialog, setFilterDialog] = useState(false)
    //detail lead
    const [showDetailLead, setShowDetailLead] = useState(false)

    console.log(itemsData)
  

    const toggleFilter = () => {
      setFilterDialog(!filterDialog);
    };

    const builtInfo = (dataTable) => {
      const header = {
          title: {
              label:  '',
              value: 'Alexis Clarke'
          },
          img: {
            name: 'A',
            url: process.env.REACT_APP_API_URL + "/images/users/" + (dataTable.image_src || "avatar-10.jpg")
          },
          body: [
              {
                  label:  '',
                  value: 'Digitech Galaxy'
              },
          ]
      }
      const detailClient = {
          id: 'detailClient',
          title: 'Acerca de este lead',
          collapse: false,
          body: [
              {
                  label: 'Correos',
                  value: [
                    {
                      text: '*******test.com',
                      iconClasses: 'ri-mail-line text-danger',
                      action: null,
                    },
                    {
                      text: '*******test1.com',
                      iconClasses: 'ri-mail-line text-danger',
                      action: null,
                    }
                  ]
              },
              {
                label: 'Teléfonos',
                value: [
                  {
                    text: '*******42',
                    iconClasses: 'ri-phone-line text-success',
                    action: null,
                  },
                  {
                    text: '*******99',
                    iconClasses: 'ri-phone-line text-success',
                    action: null,
                  }
                ]
            },
            {
                label: 'Hora de contactación',
                value: '13:00',
                extraClassess: 'fw-semibold text-primary'
            },
          ]
      }
      const atribucionCliente = {
          id: 'atribucionCliente',
          title: 'Atribución de creación de este cliente',
          collapse: true,
          body: [
              {
                  label: 'Referido por',
                  value: 'John Doe'
              },
              {
                  label: 'Copropietario',
                  value: 'Jesus Enrique'
              },
              {
                  label: 'Contrato',
                  value: 'RFCG555'
              },
              {
                  label: 'Dirección',
                  value: 'NN, MEX'
              }
          ]     
      }
      const beneficiosClient = {
          id: 'beneficiosClient',
          title: 'Beneficios de este cliente',
          collapse: true,
          body: [
              {
                  label: 'Booking',
                  value: ''
              },
              {
                  label: 'Membresía',
                  value: ''
              },
              {
                  label: 'Certificados',
                  value: 'RFCG555'
              }
          ]
      }
      const data = {
          title: 'Alexis Clarke',
          header: header,
          items: [detailClient, atribucionCliente, beneficiosClient],
          goToView: `/client/1`
      }
      setInfo(data)
    }

    const columns = useMemo(
        () => [
          {
            Header: "Nombre",
            accessor: "nombre",
            filterable: false,
            style: {
              cursor: 'pointer',
            },
            Cell: (contact) => (
              <>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="flex-shrink-0 avatar-xs me-2">
                      <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                        {contact.row.original.firstName.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-2 name">
                    {`${contact.row.original.firstName} ${contact.row.original.lastName ?? ''}`}
                  </div>
                </div>
              </>
            ),
          },
          // {
          //   Header: "Contrato",
          //   accessor: "contrato",
          //   filterable: false,
          //   style: {
          //     cursor: 'pointer',
          //   }
          // },
          {
            Header: "País",
            accessor: "country",
            filterable: false,
            style: {
              cursor: 'pointer',
            }
          },
          {
            Header: "Estado",
            accessor: "state",
            filterable: false,
            style: {
              cursor: 'pointer',
            }
          },
          // {
          //   Header: "Agente",
          //   accessor: "agente",
          //   filterable: false,
          //   style: {
          //     cursor: 'pointer',
          //   }
          // },
          {
            Header: "Call Center",
            accessor: "callcenter.name",
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
                            builtInfo(contactData); 
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
        []
    );

    const gotToPage = (row) => {
      navigate(`/client/1`)
    }

    const buscar = () => {
      setFilterDialog(false)
      const copyQuery = {...query, page: 1 }
      setQueryFilter(parseObjectToQueryUrl(copyQuery))
      setQuery(copyQuery)
  }

    const onCleanFilter = () =>{
      setFilterDialog(false)
      const copyQuery = {max: 10, page: 1, ...initFilter}
      setQueryFilter(parseObjectToQueryUrl(copyQuery))
      setQuery(copyQuery)      
      setDataSelect(initFilterModel)  
  }

    return (
        <>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb 
                      title="Cliente" 
                      pageTitle="Inicio" 
                      urlPageTitle="/dashboard" 
                      filter={{
                        allow: true,
                        action: toggleFilter,
                        cleanFilter: onCleanFilter
                    }}
                    />
                    <Row>
                        <Col xxl={12}>
                            <Card id="contactList">
                                <CardBody className="pt-0">
                                <div>
                                    {(!isLoading) ? (
                                    <>
                                        <TableContainer
                                            columns={columns}
                                            data={isSuccess ? itemsData.data.list : []}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-3"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            onSelectRow={gotToPage}
                                            
                                        />
                                        <PaginationManual 
                                            query={query}
                                            setQuery={setQuery}
                                            setQueryFilter={setQueryFilter}
                                            totalPages={itemsData?.data?.pagination?.totalPages ?? 1}
                                        />
                                    </>
                                    ) : (<Loader />)
                                    }
                                </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <CrmFilter
                show={filterDialog}
                onCloseClick={() => setFilterDialog(false)}                
                query={query}
                setQuery={setQuery}
                buscar={buscar}
                dataSelect={dataSelect}
                setDataSelect={setDataSelect}
                onCleanFilter={onCleanFilter}
            />
            {info &&
            <DetailCanvas
                show={showDetailLead} 
                onCloseClick={() => {
                  setShowDetailLead(false)
                  setInfo(null)
                }}
                data={info}
            />}
        </>
    );
};

export default Lead;