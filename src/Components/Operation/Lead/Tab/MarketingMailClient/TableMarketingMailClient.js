import { useMemo, useState } from "react";
import TableContainer from "../../../../Common/TableContainer";
import Loader from "../../../../Common/Loader";
import { useEffect } from "react";
import { mailbox } from "../../../../../common/data";
import { Link } from "react-router-dom";
import { classBadgeStatusEmail, parseTextStatusMail } from "../../../../../util/utilStatusEmail";

const TableMarketingMailClient = ({builtInfo}) => {
    const [item, setItems] = useState({
        loading: true,
        data: [],
        isSuccess: false,
        error: null
    });

    const columns = useMemo(
        () => [
          {
            Header: "Template",
            accessor: "template",
            filterable: false,
            style: {
                width: '30%',
            }
          },
          {
            Header: "Asunto",
            accessor: "subject",
            filterable: false,
            style: {
                width: '20%',
            }
          },
          {
            Header: "Estado",
            accessor: "status",
            filterable: false,
            Cell: ({value}) =><span className={`badge ${classBadgeStatusEmail(value)}`}>{parseTextStatusMail(value)}</span>,
            style: {
                width: '10%',
                textAlign: 'center'
            }
          },
          {
            Header: "Fecha",
            accessor: "date",
            filterable: false,
            style: {
                width: '10%',
            }
          },
          {
            id: "action",
            style: {
              width: '10%',
            },
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

    //test
    useEffect(() => {
        setTimeout(() => {
            setItems(prev=>({
                ...prev,
                loading: false,
                isSuccess: true,
                data: mailbox
            }))
        }, 2000)
    }, [])

    return (
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
            />
            ) : (<Loader error={item.error} />)
            }
        </div>
    )
}

export default TableMarketingMailClient