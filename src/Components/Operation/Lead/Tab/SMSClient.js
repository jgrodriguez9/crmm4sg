import { Col, Row } from 'reactstrap';
import { useMemo, useState } from 'react';
import BasicModal from '../../../Common/BasicModal';
import TableSMS from './SMSClient/TableSMS';
import FormSMS from './SMSClient/FormSMS';

const SMSClient = ({ customer }) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const phonesOpt = useMemo(() => {
		if (customer?.id) {
			const arrayPhones = [];
			if (customer.phone1) {
				arrayPhones.push({ value: 'phone1', label: customer.phone1 });
			}
			if (customer.phone2) {
				arrayPhones.push({ value: 'phone2', label: customer.phone2 });
			}
			if (customer.phone3) {
				arrayPhones.push({ value: 'phone3', label: customer.phone3 });
			}
			if (customer.movil) {
				arrayPhones.push({ value: 'movil', label: customer.movil });
			}
			return arrayPhones;
		}
		return null;
	}, [
		customer?.id,
		customer.phone1,
		customer.phone2,
		customer.phone3,
		customer.movil,
	]);

	const closeModal = () => setShowAddModal(false);
	return (
		<>
			<Row>
				<Col>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-3">
						<button
							className="btn btn-info"
							onClick={() => setShowAddModal(true)}
						>
							<i className="ri-add-fill me-1 align-bottom"></i>{' '}
							Crear SMS
						</button>
					</div>
				</Col>
			</Row>
			<TableSMS />
			<BasicModal
				open={showAddModal}
				setOpen={setShowAddModal}
				title="Crear SMS"
				size="md"
				children={
					<FormSMS
						phonesOpt={phonesOpt}
						customerId={customer.id}
						closeModal={closeModal}
					/>
				}
			/>
		</>
	);
};

export default SMSClient;
