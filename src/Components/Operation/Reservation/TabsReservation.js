import classNames from 'classnames';
import { useState } from 'react';
import {
	Card,
	CardBody,
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import ViewReservationInformation from './ViewReservationInformation';
import ReservationPaxes from './ReservationPaxes';
import ReservationService from './ReservationService';
import ReservationPayment from './ReservationPayment';
import ReservationTransportation from './ReservationTransportation';
import ReservationNotas from './ReservationNotas';
import { useTranslation } from 'react-i18next';

const TabsReservation = ({ itemData, refetchReservation }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.tabsReservation',
	});
	const [activeTab, setActiveTab] = useState('1');
	const [editMode, setEditMode] = useState(false);

	const tabChange = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<Card>
			<CardBody className="p-4">
				<Nav
					className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
					role="tablist"
				>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '1',
							})}
							onClick={() => {
								tabChange('1');
							}}
							type="button"
						>
							<h6 className="text-primary">
								{t('reservationDetail')}
							</h6>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '3',
							})}
							onClick={() => {
								tabChange('3');
							}}
							type="button"
						>
							<h6 className="text-primary">Paxes</h6>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '2',
							})}
							onClick={() => {
								tabChange('2');
							}}
							type="button"
						>
							<h6 className="text-primary">{t('payments')}</h6>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '5',
							})}
							onClick={() => {
								tabChange('5');
							}}
							type="button"
						>
							<h6 className="text-primary">{t('services')}</h6>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '4',
							})}
							onClick={() => {
								tabChange('4');
							}}
							type="button"
						>
							<h6 className="text-primary">
								{t('transportation')}
							</h6>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							to="#"
							className={classNames({
								active: activeTab === '6',
							})}
							onClick={() => {
								tabChange('6');
							}}
							type="button"
						>
							<h6 className="text-primary">{t('notes')}</h6>
						</NavLink>
					</NavItem>
				</Nav>
				<hr />
				<Row>
					<Col>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								{activeTab === '1' && (
									<ViewReservationInformation
										editMode={editMode}
										setEditMode={setEditMode}
										data={itemData.data}
										refetchReservation={refetchReservation}
									/>
								)}
							</TabPane>
							<TabPane tabId="3">
								{activeTab === '3' && (
									<ReservationPaxes
										reservationId={itemData.data.id}
									/>
								)}
							</TabPane>
							<TabPane tabId="5">
								{activeTab === '5' && (
									<ReservationService
										ReservationId={itemData.data.id}
										reservation={itemData.data}
									/>
								)}
							</TabPane>
							<TabPane tabId="2">
								{activeTab === '2' && (
									<ReservationPayment
										ReservationId={itemData.data.id}
										reservation={itemData.data}
									/>
								)}
							</TabPane>
							<TabPane tabId="4">
								{activeTab === '4' && (
									<ReservationTransportation
										ReservationId={itemData.data.id}
									/>
								)}
							</TabPane>
							<TabPane tabId="6">
								{activeTab === '6' && (
									<ReservationNotas
										ReservationId={itemData.data.id}
										customerId={itemData.data.customer.id}
									/>
								)}
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default TabsReservation;
