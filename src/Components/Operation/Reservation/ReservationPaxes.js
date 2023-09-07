import moment from 'moment';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Alert, Col, Row } from 'reactstrap';
import { fecthPaxesByReservation } from '../../../pages/Operation/Reservation/Util/services';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';

const ReservationPaxes = ({ ReservationId }) => {
	const { data, error, isLoading, isSuccess } = useQuery(
		['getPaxesByReservation', ReservationId],
		() => fecthPaxesByReservation(ReservationId),
		{
			keepPreviousData: true,
		}
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Nombre',
				accessor: 'firstName',
				filterable: false,
				width: '40%',
				Cell: ({ row, value }) =>
					`${value.toUpperCase()} ${row.original.lastName.toUpperCase()}`,
			},
			{
				Header: 'Relación',
				accessor: 'relation',
				filterable: false,
				width: '20%',
			},
			{
				Header: 'Ocupación',
				accessor: 'occupation',
				filterable: false,
				width: '20%',
			},
			{
				Header: 'Fecha nacimiento',
				accessor: 'fechadnacimiento',
				filterable: false,
				width: '20%',
				Cell: ({ value }) =>
					value
						? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
						: '',
			},
		],
		[]
	);

	return (
		<>
			{error && !isLoading && (
				<Row>
					<Col xs="12" md={{ size: 4, offset: 4 }}>
						<Alert color="danger" className="mb-0">
							{showFriendlyMessafe(error?.code)}
						</Alert>
					</Col>
				</Row>
			)}
			<Row>
				<Col xxl={12}>
					<div>
						{!isLoading ? (
							<>
								<TableContainer
									columns={columns}
									data={isSuccess ? data.data.list : []}
									className="custom-header-css"
									divClass="mb-3"
									tableClass="align-middle table-wrap"
								/>
							</>
						) : (
							<Loader />
						)}
					</div>
				</Col>
			</Row>
		</>
	);
};

export default ReservationPaxes;
