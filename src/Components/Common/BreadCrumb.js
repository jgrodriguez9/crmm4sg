import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';

const BreadCrumb = ({ title, pageTitle, urlPageTitle = '#', filter }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.breadCrumb',
	});
	return (
		<Row>
			<Col xs={12}>
				<div className="page-title-box d-sm-flex align-items-center justify-content-between">
					<div>
						<h4 className="mb-0">{title}</h4>
						{/* <span className='breadcrumb-item d-flex align-items-center'>
                            <i className='ri-arrow-left-s-line me-1' /><Link to={urlPageTitle}>{pageTitle}</Link>
                        </span> */}
					</div>

					{filter?.allow && (
						<div className="page-title-right">
							<button
								className="btn btn-info me-1"
								onClick={filter.action}
							>
								<i className="ri-filter-2-line me-1 align-bottom"></i>{' '}
								{t('filters')}
							</button>
							<Button
								color="danger"
								outline
								type="button"
								className="fw-500"
								onClick={filter.cleanFilter}
							>
								{t('cleanFilters')}
							</Button>
						</div>
					)}
				</div>
			</Col>
		</Row>
	);
};

export default BreadCrumb;
