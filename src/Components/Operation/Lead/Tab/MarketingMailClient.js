import { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import TableMarketingMailClient from './MarketingMailClient/TableMarketingMailClient';
import FormMaketingMailClient from './MarketingMailClient/FormMaketingMailClient';
import BasicModal from '../../../Common/BasicModal';
import DetailmarketingMailCanvas from './MarketingMailClient/DetailmarketingMailCanvas';
import { addIconClass } from '../../../constants/icons';
import { useTranslation } from 'react-i18next';

const MarketingMailClient = ({ customer }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.marketingMailClient',
	});
	const [showAddModal, setShowAddModal] = useState(false);
	//detail canva
	const [showDetail, setShowDetail] = useState(false);
	const [info, setInfo] = useState(null);
	const builtInfo = (itemData) => {
		setShowDetail(true);
		setInfo(itemData);
	};

	const closeModal = () => setShowAddModal(false);
	return (
		<>
			<Row>
				<Col>
					<div className="d-flex align-items-center justify-content-end flex-wrap gap-2 mb-4">
						<Button
							color="info"
							size="sm"
							onClick={() => setShowAddModal(true)}
							className="d-flex align-items-center"
						>
							<i className={`${addIconClass} fs-5`} />{' '}
							{t('createMail')}
						</Button>
					</div>
				</Col>
			</Row>
			<TableMarketingMailClient builtInfo={builtInfo} />
			<BasicModal
				open={showAddModal}
				setOpen={setShowAddModal}
				title={t('newEmail')}
				size="lg"
				children={
					<FormMaketingMailClient
						closeModal={closeModal}
						emailTo={customer.email}
					/>
				}
			/>
			{info && (
				<DetailmarketingMailCanvas
					show={showDetail}
					onCloseClick={() => {
						setShowDetail(false);
						setInfo(null);
					}}
					data={info}
				/>
			)}
		</>
	);
};

export default MarketingMailClient;
