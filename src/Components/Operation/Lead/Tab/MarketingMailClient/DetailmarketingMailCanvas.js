import { useState } from 'react';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import template from '../../../../../common/data/template';
import { useTranslation } from 'react-i18next';

const DetailmarketingMailCanvas = ({ show, onCloseClick, data = null }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.detailMarketingMailCanvas',
	});
	const [info, setInfo] = useState(data);
	return (
		<Offcanvas
			direction="end"
			isOpen={show}
			id="filter-canvas"
			toggle={onCloseClick}
			scrollable={true}
		>
			<OffcanvasHeader
				className="bg-gradient bg-primary canvas-title"
				toggle={onCloseClick}
			>
				{t('conversation')}
			</OffcanvasHeader>
			<OffcanvasBody className="p-0 mb-6">
				{info && (
					<div className="d-flex flex-column p-3">
						<h5 className="fw-bold">{info.template}</h5>
						<div className="d-flex align-items-center">
							<div className="me-auto">
								<div className="text-truncate fs-12 text-muted">
									{t('to')}: <br />
									dan*****@gmail.com
								</div>
							</div>
							<div className="text-truncate fs-12 text-muted">
								{info.date} 12:00
							</div>
						</div>
						<h6 className="mt-4">{info.subject}</h6>

						<div style={{ maxHeight: '500px', overflowY: 'auto' }}>
							<div
								dangerouslySetInnerHTML={{ __html: template }}
							></div>
						</div>
					</div>
				)}
			</OffcanvasBody>
			<div className="py-3 px-2 border position-sticky bottom-0 w-100 bg-light ">
				<div className="d-flex justify-content-between align-items-center">
					<div>
						<Button
							onClick={onCloseClick}
							size="sm"
							color="success"
							className="fw-normal"
						>
							{t('accept')}
						</Button>
					</div>
				</div>
			</div>
		</Offcanvas>
	);
};

export default DetailmarketingMailCanvas;
