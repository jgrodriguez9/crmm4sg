import { Button, Col, Row } from 'reactstrap';
import { useMemo, useState } from 'react';
import BasicModal from '../../../Common/BasicModal';
import TableSMS from './SMSClient/TableSMS';
import FormSMS from './SMSClient/FormSMS';
import { addIconClass } from '../../../constants/icons';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getSmsListByCustomer } from '../../../../helpers/external/sms';
import Loader from '../../../Common/Loader';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import AlertMessage from '../../../Common/AlertMessage';

const SMSClient = ({ customer }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.smsClient',
	});
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

	const {
		data: smsList,
		isLoading,
		error: errorItemsQuery,
		isSuccess,
		isError,
	} = useQuery(
		['getSmsListByCustomer'],
		() => getSmsListByCustomer({ customer: customer.id }),
		{
			select: (result) => result.elements ?? [],
		}
	);

	const closeModal = () => setShowAddModal(false);
	return (
		<>
			<Row>
				<Col>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-3">
						<Button
							color="info"
							size="sm"
							onClick={() => setShowAddModal(true)}
							className="d-flex align-items-center"
						>
							<i className={`${addIconClass} fs-5`} />{' '}
							{t('createSms')}
						</Button>
					</div>
				</Col>
			</Row>
			{isLoading && <Loader />}
			{!isLoading && isError && (
				<AlertMessage
					message={showFriendlyMessafe(errorItemsQuery?.code)}
				/>
			)}
			{!isLoading && isSuccess && <TableSMS items={smsList} />}
			<BasicModal
				open={showAddModal}
				setOpen={setShowAddModal}
				title={t('createSms')}
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
