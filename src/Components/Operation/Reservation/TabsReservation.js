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

const TabsReservation = ({ itemData }) => {
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
								Detalle de la reservación
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
							<h6 className="text-primary">Pagos</h6>
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
							<h6 className="text-primary">Servicios</h6>
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
							<h6 className="text-primary">Transportación</h6>
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
							<h6 className="text-primary">Notas</h6>
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
