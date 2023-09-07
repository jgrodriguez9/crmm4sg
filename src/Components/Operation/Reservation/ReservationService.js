import { useQuery } from 'react-query';
import { fecthServicesByReservation } from '../../../pages/Operation/Reservation/Util/services';
import { useMemo } from 'react';
import jsFormatNumber from '../../../util/jsFormatNumber';
import moment from 'moment';
import { Alert, Col, Row } from 'reactstrap';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';

const ReservationService = ({ ReservationId }) => {
	const { data, error, isLoading, isSuccess } = useQuery(
		['getServiceByReservation', ReservationId],
		() => fecthServicesByReservation(ReservationId),
		{
			keepPreviousData: true,
		}
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Descripción',
				accessor: 'description',
				filterable: false,
				width: '29%',
			},
			{
				Header: 'Pax',
				accessor: 'pax',
				filterable: false,
				width: '5%',
			},
			{
				Header: 'Menores',
				accessor: 'childs',
				filterable: false,
				width: '5%',
			},
			{
				Header: 'Monto',
				accessor: 'amount',
				filterable: false,
				width: '8%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Comisión',
				accessor: 'commission',
				filterable: false,
				width: '8%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'User',
				accessor: 'user',
				filterable: false,
				width: '15%',
			},
			{
				Header: 'Comisión del usuario',
				accessor: 'userComission',
				filterable: false,
				width: '10%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Folio Dolphin',
				accessor: 'folioDolphin',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Fecha creación',
				accessor: 'insertdate',
				filterable: false,
				width: '10%',
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

export default ReservationService;
