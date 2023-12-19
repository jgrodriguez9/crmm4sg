import { useMemo } from 'react';
import TableContainer from '../../../../Common/TableContainer';
import Loader from '../../../../Common/Loader';
import moment from 'moment';
import CellActions from '../../../../Common/CellActions';
import { getEmoticonsClass } from '../../../../../util/getEmoticonsClass';
import TooltipDescription from '../../../../Common/TooltipDescription';
import { DATE_TIME_FORMAT } from '../../../../../common/globalsProp';

const TableNotas = ({ isLoading, isSuccess, data, error, actions }) => {
	const columns = useMemo(
		() => [
			{
				Header: 'Tipo',
				accessor: 'noteType.type',
				filterable: false,
				style: {
					width: '13%',
				},
			},
			{
				Header: 'Estado',
				accessor: 'status.mood',
				filterable: false,
				style: {
					width: '5%',
				},
				Cell: ({ row, value }) => {
					return (
						<div>
							<i
								id={`list-emot-${row.id}`}
								className={`fs-3 cursor-pointer ${getEmoticonsClass(
									parseInt(row.original?.status?.key ?? '100')
								)}`}
							/>
							<TooltipDescription
								text={value ?? 'Sin estado'}
								id={`list-emot-${row.id}`}
							/>
						</div>
					);
				},
			},
			{
				Header: 'Nota',
				accessor: 'note',
				filterable: false,
				style: {
					width: '25%',
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
				Header: 'Fecha creación',
				accessor: 'date',
				filterable: false,
				style: {
					width: '10%',
				},
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DDTHH:mm').format(
								DATE_TIME_FORMAT
						  )
						: '',
			},
			{
				Header: 'Fecha FUp',
				accessor: 'contactDate',
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
					width: '12%',
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
					glFilter={true}
				/>
			) : (
				<Loader error={error} />
			)}
		</div>
	);
};

export default TableNotas;
