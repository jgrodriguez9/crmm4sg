import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import kpi from '../../assets/images/kpi.png';
import DashboardAgent from '../../Components/Dashboard/DashboardAgent';
import { useTranslation } from 'react-i18next';
import DashboardSupervisor from '../../Components/Dashboard/DashboardSupervisor';
import { useProfile } from '../../Components/Hooks/UserHooks';
import {
	ROLE_AGENT,
	ROLE_MANAGER,
	ROLE_SUPERVISOR,
} from '../../Components/constants/roles';
import DashboardManager from '../../Components/Dashboard/DashboardManager';

const DashboardCrm = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.dashboard',
	});
	const { roles } = useProfile();
	document.title = t('header');
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<Row>
						{/*Dashboard agente*/}
						{roles.includes(ROLE_AGENT) && <DashboardAgent />}
						{/*Dashboard supervisor*/}
						{roles.includes(ROLE_SUPERVISOR) && (
							<DashboardSupervisor />
						)}
						{/*Dashboard manager*/}
						{roles.includes(ROLE_MANAGER) && <DashboardManager />}

						<Col>
							<img src={kpi} className="w-100" alt="" />
						</Col>
						{/* <ComingSoon /> */}
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default DashboardCrm;
