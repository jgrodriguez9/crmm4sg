import { Col, Row } from 'reactstrap';
import TablePaquete from './Origen/TablePaquete';
import TableCerificates from './Origen/TableCerificates';
import { useQuery } from 'react-query';
import { fecthOriginClients } from '../../../../pages/Operation/Lead/Util/services';
import BasicModal from '../../../Common/BasicModal';
import { useState } from 'react';
import FormCreateReservationFromClient from './ReservationClient/FormCreateReservationFromClient';
import { useTranslation } from 'react-i18next';

const OriginClient = ({ customerId }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.originClient',
	});
	const [showModal, setShowModal] = useState(false);
	const [booking, setBooking] = useState(null);
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
		setBooking(row.original.idBooking);
		setShowModal(true);
	};

	return (
		<div className="mt-2">
			<Row>
				<Col>
					<TablePaquete
						tableTitle={t('packages')}
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
						tableTitle={t('certificates')}
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
				title={t('createReservation')}
				size="xl"
				classBody="py-1 px-3"
				children={
					<FormCreateReservationFromClient
						reservation={{
							customer: { id: customerId },
							booking: booking,
						}}
						toggleDialog={toggleDialog}
						refetchOrigin={refetchOrigin}
					/>
				}
			/>
		</div>
	);
};

export default OriginClient;
