import { Col, Row } from 'reactstrap';
import TablePaquete from './Origen/TablePaquete';
import TableCerificates from './Origen/TableCerificates';
import { useQuery } from 'react-query';
import { fecthOriginClients } from '../../../../pages/Operation/Lead/Util/services';
import BasicModal from '../../../Common/BasicModal';
import { useState } from 'react';
import FormCreateReservationFromClient from './ReservationClient/FormCreateReservationFromClient';

const OriginClient = ({ customerId }) => {
	const [showModal, setShowModal] = useState(false);
	const {
		data: itemData,
		error: errorItem,
		isFetching: isFetchingItem,
		isSuccess: isSuccesOrigin,
		refetch: refetchOrigin,
	} = useQuery(
		['getOriginCustomer', customerId],
		() => fecthOriginClients(customerId),
		{
			refetchOnWindowFocus: false,
		}
	);
	const toggleDialog = () => setShowModal(!showModal);

	const onHandleCreateReservation = (row) => {
		setShowModal(true);
	};

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
						onHandleCreateReservation={onHandleCreateReservation}
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
						onHandleCreateReservation={onHandleCreateReservation}
					/>
				</Col>
			</Row>

			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Agregar reservación"
				size="xl"
				classBody="py-1 px-3"
				children={
					<FormCreateReservationFromClient
						reservation={{
							customer: { id: customerId },
						}}
						toggleDialog={toggleDialog}
						refetch={refetchOrigin}
					/>
				}
			/>
		</div>
	);
};

export default OriginClient;
