import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import BalanceOverview from './BalanceOverview';
import ClosingDeals from './ClosingDeals';
import DealsStatus from './DealsStatus';
import DealType from './DealType';
import MyTasks from './MyTasks';
import SalesForecast from './SalesForecast';
import UpcomingActivities from './UpcomingActivities';
import Widgets from './Widgets';
import ComingSoon from '../Utils/ComingSoon';
import kpi from '../../assets/images/kpi.png';
import DashboardAgent from '../../Components/Dashboard/DashboardAgent';
import { useTranslation } from 'react-i18next';
import DashboardSupervisor from '../../Components/Dashboard/DashboadSupervisor';

const DashboardCrm = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.dashboard',
	});
	document.title = t('header');
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					{/* <BreadCrumb
						title="CRM"
						pageTitle="Inicio"
						urlPageTitle="/dashboard"
					/> */}
					<Row>
						{/*Dashboard agente*/}
						{/* <DashboardAgent /> */}
						{/*Dashboard supervisor*/}
						<DashboardSupervisor />
						{/*Dashboard manager*/}
						{/* <DashboardAgent /> */}

						<Col>
							<img src={kpi} className="w-100" alt="" />
						</Col>
						{/* <ComingSoon /> */}
					</Row>
					{/* <Row>
                        <Widgets />
                    </Row>
                    <Row>
                        <SalesForecast />
                        <DealType />
                        <BalanceOverview />
                    </Row>
                    <Row>
                        <DealsStatus />
                        <MyTasks />
                    </Row>
                    <Row>
                        <UpcomingActivities />
                        <ClosingDeals />
                    </Row> */}
				</Container>
			</div>
		</React.Fragment>
	);
};

export default DashboardCrm;
