import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	useTable,
	usePagination,
	useExpanded,
	useGlobalFilter,
} from 'react-table';
import { Table } from 'reactstrap';
import GlobalFilter from './GlobalFilter';

const TableContainer = ({
	columns,
	data,
	customPageSize,
	tableClass,
	theadClass,
	trClass,
	thClass,
	divClass,
	hover = true,
	pageCount = -1,
	queryPageIndex = 0,
	handlePage,
	onSelectRow = (row) => {},
	firstRender = true,
	setItems,
	renderRowSubComponent = (row) => null,
	tableTitle = null,
	glFilter = false,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		preGlobalFilteredRows,
		setGlobalFilter,
		state,
	} = useTable(
		{
			columns,
			data,
			pageCount: pageCount,
			manualPagination: true,
			initialState: {
				pageIndex: queryPageIndex,
				pageSize: customPageSize,
			},
		},
		useGlobalFilter,
		useExpanded,
		usePagination
	);
	return (
		<Fragment>
			{glFilter && (
				<div className="d-flex mb-4">
					<div style={{ marginTop: '-42px' }}>
						<GlobalFilter
							preGlobalFilteredRows={preGlobalFilteredRows}
							globalFilter={state.globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>
					</div>
				</div>
			)}
			<div className={divClass}>
				<Table
					hover={hover}
					{...getTableProps()}
					className={`${tableClass} fs-7`}
				>
					<thead className={theadClass}>
						{tableTitle && (
							<tr className="bg-light">
								<th colSpan={columns.length}>{tableTitle}</th>
							</tr>
						)}
						{headerGroups.map((headerGroup) => (
							<tr
								className={trClass}
								key={headerGroup.id}
								{...headerGroup.getHeaderGroupProps()}
							>
								{headerGroup.headers.map((column) => (
									<th
										key={column.id}
										className={thClass}
										{...column.getHeaderProps({
											style: {
												width: column?.width ?? 'auto',
											},
										})}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{page.length > 0 ? (
							page.map((row) => {
								prepareRow(row);
								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row.cells.map(
												(cell, indexCell) => {
													return (
														<td
															key={cell.id}
															onClick={(e) => {
																if (
																	row.cells
																		.length -
																		1 ===
																	indexCell
																) {
																	e.stopPropagation();
																	return;
																}
																onSelectRow(
																	row.original
																);
															}}
															{...cell.getCellProps(
																[
																	{
																		style:
																			cell
																				.column
																				.style ||
																			{},
																	},
																]
															)}
														>
															{cell.render(
																'Cell'
															)}
														</td>
													);
												}
											)}
										</tr>
										{row.isExpanded &&
										renderRowSubComponent ? (
											<tr className="bg-light bg-opacity-50">
												<td colSpan={row.cells.length}>
													{renderRowSubComponent(row)}
												</td>
											</tr>
										) : null}
									</Fragment>
								);
							})
						) : (
							<tr>
								<td colSpan={columns.length}>
									No hay información disponible
								</td>
							</tr>
						)}
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
