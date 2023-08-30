import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useExpanded } from 'react-table';
import { Table } from 'reactstrap';

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
}) => {
	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
		useTable(
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
			useExpanded,
			usePagination
		);
	return (
		<Fragment>
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
											<tr className="bg-light">
												<td colSpan={row.cells.length}>
													{console.log(row)}
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
