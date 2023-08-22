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
import FormReservationInformation from './FormReservationInformation';
import ViewReservationInformation from './ViewReservationInformation';

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
							<h5 className="text-primary">
								Detalle de la reservación
							</h5>
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
							<h5 className="text-primary">Paxes</h5>
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
							<h5 className="text-primary">Notas</h5>
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
							<h5 className="text-primary">Transportación</h5>
						</NavLink>
					</NavItem>
				</Nav>
				<hr />
				<Row>
					<Col>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1">
								{activeTab === '1' &&
									(editMode ? (
										<FormReservationInformation
											editMode={editMode}
											setEditMode={setEditMode}
										/>
									) : (
										<ViewReservationInformation
											editMode={editMode}
											setEditMode={setEditMode}
											data={itemData.data}
										/>
									))}
							</TabPane>
						</TabContent>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};

export default TabsReservation;
