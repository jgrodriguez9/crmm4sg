import { useMemo } from 'react';
import TableContainer from '../../../../Common/TableContainer';
import Loader from '../../../../Common/Loader';
import moment from 'moment';
import CellActions from '../../../../Common/CellActions';

const TableNotas = ({ isLoading, isSuccess, data, error, actions }) => {
	const columns = useMemo(
		() => [
			{
				Header: 'Tipo',
				accessor: 'noteType.type',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Estado',
				accessor: 'status',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Nota',
				accessor: 'note',
				filterable: false,
				style: {
					width: '35%',
				},
			},
			{
				Header: 'Req. especial',
				accessor: 'specialReq',
				filterable: false,
				style: {
					width: '20%',
				},
			},
			{
				Header: 'Fecha',
				accessor: 'date',
				filterable: false,
				style: {
					width: '10%',
				},
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
			},
			{
				Header: 'Usuario',
				accessor: 'user',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				id: 'action',
				width: '5%',
				Cell: ({ row }) => {
					return <CellActions actions={actions} row={row} />;
				},
			},
		],
		[]
	);
	return (
		<div>
			{isSuccess || !isLoading ? (
				<TableContainer
					columns={columns}
					data={data}
					isGlobalFilter={false}
					isAddUserList={false}
					customPageSize={8}
					className="custom-header-css"
					divClass="mb-3"
					tableClass="align-middle table-wrap"
					hover={false}
				/>
			) : (
				<Loader error={error} />
			)}
		</div>
	);
};

export default TableNotas;
