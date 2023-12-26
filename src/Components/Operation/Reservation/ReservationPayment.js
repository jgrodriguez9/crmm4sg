import { useQuery } from 'react-query';
import {
	fecthPaxesByReservation,
	fecthPaymentByReservation,
} from '../../../pages/Operation/Reservation/Util/services';
import { useMemo, useState } from 'react';
import jsFormatNumber from '../../../util/jsFormatNumber';
import moment from 'moment';
import { Alert, Col, Row } from 'reactstrap';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import TableContainer from '../../Common/TableContainer';
import Loader from '../../Common/Loader';
import BasicModal from '../../Common/BasicModal';
import FormPaymentClient from './Tab/Payment/FormPaymentClient';

const ReservationPayment = ({ ReservationId, reservation }) => {
	const [showModal, setShowModal] = useState(false);
	const { data, error, isLoading, isSuccess } = useQuery(
		['getPaymentByReservation', reservation.booking],
		() => fecthPaymentByReservation(reservation.booking),
		{
			enabled:
				reservation?.booking !== null &&
				reservation?.booking !== undefined,
		}
	);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'idPayment',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Autorización',
				accessor: 'autorization',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Banco',
				accessor: 'bank',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'No. Pagos',
				accessor: 'numPayment',
				filterable: false,
				width: '5%',
			},
			{
				Header: 'Tipo pago',
				accessor: 'paymentType',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Monto',
				accessor: 'amount',
				filterable: false,
				width: '8%',
				Cell: ({ value }) => jsFormatNumber(value),
			},
			{
				Header: 'Moneda',
				accessor: 'currency',
				filterable: false,
				width: '8%',
			},
			{
				Header: 'Tipo cambio',
				accessor: 'exchangeRate',
				filterable: false,
				width: '9%',
			},
			{
				Header: 'User',
				accessor: 'user',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Departamento',
				accessor: 'depto',
				filterable: false,
				width: '10%',
			},
			{
				Header: 'Fecha creación',
				accessor: 'insertDate',
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
	console.log(data);

	const toggleDialog = () => setShowModal(!showModal);

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
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-2">
						<button
							className="btn btn-info btn-sm"
							onClick={toggleDialog}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Nuevo pago
						</button>
					</div>
				</Col>
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
				<BasicModal
					open={showModal}
					setOpen={setShowModal}
					title="Agregar pago"
					size="lg"
					children={<FormPaymentClient toggleDialog={toggleDialog} />}
				/>
			</Row>
		</>
	);
};

export default ReservationPayment;
