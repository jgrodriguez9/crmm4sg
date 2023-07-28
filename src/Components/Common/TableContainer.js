import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect
} from "react-table";
import { Table, Row, Col, Button, Input, CardBody } from "reactstrap";
import { DefaultColumnFilter } from "./filters";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";


const TableContainer = ({
  columns,
  data,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  pageCount=-1,
  queryPageIndex=0,
  handlePage,
  onSelectRow= (row) => {},
  firstRender=true,
  setItems
}) => {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      pageCount: pageCount,
      manualPagination: true,     
      initialState: {
        pageIndex: queryPageIndex, pageSize: customPageSize,
      },
      
    },
    usePagination
  );  

  return (
    <Fragment>
      {/* <Row className="mb-3">
        {isGlobalSearch && (
          <Col md={1}>
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}        
      </Row> */}


      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id}  {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={thClass}>
                    {column.render("Header")}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.length > 0 ?
              page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell, indexCell) => {
                        return (
                          <td 
                            key={cell.id} 
                            onClick={(e) => {
                              if(row.cells.length - 1 === indexCell){
                                e.stopPropagation();
                                return;
                              }
                              onSelectRow(row.original)}
                            }
                            {...cell.getCellProps([
                              {
                                style: cell.column.style || {},
                              }
                            ])}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              }) :
              <tr><td colSpan={columns.length}>No hay información disponible</td></tr>
            }
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;