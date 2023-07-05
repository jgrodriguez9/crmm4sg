import { useMemo, useState } from "react";
import TableContainer from "../../../../Common/TableContainer";
import Loader from "../../../../Common/Loader";
import { useEffect } from "react";
import { listNotas } from "../../../../../common/data/common";

const TableNotas = () => {
    const [item, setItems] = useState({
        loading: true,
        data: [],
        isSuccess: false,
        error: null
    });

    const columns = useMemo(
        () => [
          {
            Header: "Tipo",
            accessor: "tipo",
            filterable: false,
            style: {
                width: '10%',
            }
          },
          {
            Header: "Motivo",
            accessor: "motivo",
            filterable: false,
            style: {
                width: '14%',
            }
          },
          {
            Header: "Nota",
            accessor: "nota",
            filterable: false,
            style: {
                width: '30%',
            }
          },
          {
            Header: "Fecha",
            accessor: "fecha",
            filterable: false,
            style: {
                width: '8%',
            }
          },
          {
            Header: "Consultor",
            accessor: "consultor",
            filterable: false,
            style: {
                width: '12%',
            }
          },
          {
            Header: "Contrato",
            accessor: "contrato",
            filterable: false,
            style: {
                width: '10%',
            }
          },
          {
            Header: "Follow Up",
            accessor: "followUp",
            filterable: false,
            style: {
                width: '8%',
            }
          },
          {
            Header: "Hora FUp",
            accessor: "horaFUp",
            filterable: false,
            style: {
                width: '8%',
            }
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
                data: listNotas
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

export default TableNotas