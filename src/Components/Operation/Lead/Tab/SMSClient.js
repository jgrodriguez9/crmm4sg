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
import DatePicker from '../../../Common/DatePicker';
import isInRange from '../../../../util/isInRange';

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
	const [date, setDate] = useState([]);
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
	const smsFiltered = useMemo(() => {
		if (smsList) {
			if (date.length > 1) {
				const smsInRangeList = smsList.filter((it) =>
					isInRange(it.fechaCreacion, date[0], date[1])
				);
				return smsInRangeList;
			}
			return smsList;
		}
	}, [smsList, date]);

	return (
		<>
			<Row className="mb-3 align-items-center">
				<Col xs="12" md={4}>
					<div className="input-group">
						<DatePicker
							id="rangeDate"
							className="form-control"
							options={{
								mode: 'range',
							}}
							date={date}
							onChangeDate={(e) => setDate(e)}
							placeholder={t('filterByDateRange')}
							onClose={(selectedDates) => {
								if (selectedDates.length === 0) setDate([]);
							}}
						/>
						<div className="input-group-text bg-light text-dark">
							<i className="ri-calendar-2-line"></i>
						</div>
					</div>
				</Col>
				<Col xs="12" md={6}></Col>
				<Col xs="12" md={2}>
					<div className="d-flex align-items-center justify-content-end gap-2">
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
			<hr />
			{isLoading && <Loader />}
			{!isLoading && isError && (
				<AlertMessage
					message={showFriendlyMessafe(errorItemsQuery?.code)}
				/>
			)}
			{!isLoading && isSuccess && <TableSMS items={smsFiltered} />}
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
