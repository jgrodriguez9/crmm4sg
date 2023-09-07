import { Col, Row } from 'reactstrap';
import TablePaquete from './Origen/TablePaquete';
import TableCerificates from './Origen/TableCerificates';
import { useQuery } from 'react-query';
import { fecthOriginClients } from '../../../../pages/Operation/Lead/Util/services';

const OriginClient = ({ customerId }) => {
	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
		isSuccess: isSuccesOrigin,
	} = useQuery(
		['getOriginCustomer', customerId],
		() => fecthOriginClients(customerId),
		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div className="mt-2">
			<Row>
				<Col>
					<TablePaquete
						tableTitle="Paquetes"
						itemData={itemData}
						errorItem={errorItem}
						isFetchingItem={isFetchingItem}
						isSuccess={isSuccesOrigin}
					/>
				</Col>
			</Row>
			<div className="my-4" />
			<Row>
				<Col>
					<TableCerificates
						tableTitle="Certificados"
						itemData={itemData}
						errorItem={errorItem}
						isFetchingItem={isFetchingItem}
						isSuccess={isSuccesOrigin}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default OriginClient;
