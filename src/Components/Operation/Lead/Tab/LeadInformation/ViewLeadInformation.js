import { useTranslation } from 'react-i18next';
import { Col, Label, Row } from 'reactstrap';

const ViewLeadInformation = ({
	editMode,
	setEditMode,
	data,
	onHandleClickToCall,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.viewLeadInformation',
	});
	return (
		<>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="nombre">
							{t('name')}
						</Label>
						<div className="form-control">
							{data?.firstName ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('lastName')}</Label>
						<div className="form-control">
							{data?.lastName ?? 'No disponible'}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={8}>
					<div className="mb-3">
						<Label className="form-label">{t('address')}</Label>
						<div className="form-control">
							{data?.address ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('zipCode')}</Label>
						<div className="form-control">
							{data?.postalCode ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('country')}</Label>
						<div className="form-control">
							{data?.country ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('state')}</Label>
						<div className="form-control">
							{data?.state ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('city')}</Label>
						<div className="form-control">
							{data?.city ?? 'No disponible'}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('email')}</Label>
						<div className="form-control mb-2">
							{data?.email ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">{t('phone')}</Label>
						<div className="form-icon right">
							<div className="form-control mb-2">
								{data?.phone1 ?? 'No disponible'}
							</div>
							{data?.phone1 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone1')
									}
								></i>
							)}
						</div>
						<div className="form-icon right">
							<div className="form-control">
								{data?.phone2 ?? 'No disponible'}
							</div>
							{data?.phone2 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone2')
									}
								></i>
							)}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label opacity-0">
							{t('phone')}
						</Label>
						<div className="form-icon right">
							<div className="form-control mb-2">
								{data?.phone3 ?? 'No disponible'}
							</div>
							{data?.phone3 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone3')
									}
								></i>
							)}
						</div>
						<div className="form-icon right">
							<div className="form-control">
								{data?.movil ?? 'No disponible'}
							</div>
							{data?.movil && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('movil')
									}
								></i>
							)}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">
							{t('assignedUser')}
						</Label>
						<div className="form-control">
							{data?.userName ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Call center</Label>
						<div className="form-control">
							{data?.callcenter?.name ?? 'No disponible'}
						</div>
					</div>
				</Col>
			</Row>
			{/* <hr />
			{!editMode && (
				<div className="d-flex mt-3">
					<Button
						type="button"
						color="primary"
						onClick={() => setEditMode(true)}
					>
						Editar
					</Button>
				</div>
			)} */}
		</>
	);
};

export default ViewLeadInformation;
