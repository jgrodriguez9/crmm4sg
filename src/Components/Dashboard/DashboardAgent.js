import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import SemiCircularRadial from '../Charts/SemiCircularRadial';
import Widget from '../Charts/Widgets';
import BasicLineCharts from '../Charts/BasicLineCharts';
import Select from 'react-select';
import { months, years } from '../constants/dates';

const DashboardAgent = () => {
	return (
		<Row>
			<Col xs={6} md={3}>
				<Card className="card-animate overflow-hidden">
					<CardBody>
						<SemiCircularRadial
							dataColors='["--vz-primary"]'
							title={'Bono Mensual'}
						/>
					</CardBody>
				</Card>
			</Col>
			<Col xs={6} md={3}>
				<div className="d-flex flex-column">
					<div>
						<Widget
							widget={{
								label: 'TOTAL LLAMADAS',
								count: '13',
								countClass: '',
								iconClass: 'bx bx-phone fs-1',
							}}
						/>
					</div>
					<div>
						<Widget
							widget={{
								label: 'TIEMPO CONECTADO',
								count: '30 min',
								countClass: '',
								iconClass: 'bx bx-time-five fs-1',
							}}
						/>
					</div>
				</div>
			</Col>
			<Col xs={6} md={3}>
				<div className="d-flex flex-column">
					<div>
						<Widget
							widget={{
								label: 'TOTAL RESERVAS',
								count: 4,
								countClass: 'text-success',
								iconClass: 'bx bx-check-circle fs-1',
							}}
						/>
					</div>
					<div>
						<Widget
							widget={{
								label: 'TIEMPO EN LLAMADA',
								count: '20 min',
								countClass: 'text-success',
								iconClass: 'bx bx-check-circle fs-1',
							}}
						/>
					</div>
				</div>
			</Col>
			<Col xs={6} md={3}>
				<div className="d-flex flex-column">
					<div>
						<Widget
							widget={{
								label: 'TOTAL DE CANCELACIONES',
								count: '1',
								countClass: 'text-danger',
								iconClass: 'bx bx-x-circle fs-1',
							}}
						/>
					</div>
					<div>
						<Widget
							widget={{
								label: 'TIEMPO EN ESPERA',
								count: '4 min',
								countClass: 'text-danger',
								iconClass: 'bx bx-timer fs-1',
							}}
						/>
					</div>
				</div>
			</Col>

			<Col xs="12" md="6">
				<Card className="card-animate overflow-hidden">
					<CardHeader className="py-0">
						<div className="d-flex align-items-center justify-content-between">
							<div>
								<h4 className="card-title mb-0">RESERVAS</h4>
							</div>
							<div>
								<div className="d-flex flex-md-row flex-column">
									<div>
										<Select
											value={null}
											onChange={(e) => {}}
											options={months}
											className="form-control-sm"
											placeholder="Seleccionar mes"
										></Select>
									</div>
									<div>
										<Select
											value={null}
											onChange={(e) => {}}
											options={years()}
											className="form-control-sm"
											placeholder="Seleccionar año"
										></Select>
									</div>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardBody>
						<div>
							<BasicLineCharts dataColors='["--vz-primary"]' />
						</div>
					</CardBody>
				</Card>
			</Col>
			<Col xs="12" md="6">
				<Card className="card-animate overflow-hidden">
					<CardHeader className="py-0">
						<div className="d-flex align-items-center justify-content-between">
							<div>
								<h4 className="card-title mb-0">
									TIEMPO EN LLAMADAS
								</h4>
							</div>
							<div>
								<div className="d-flex flex-md-row flex-column">
									<div>
										<Select
											value={null}
											onChange={(e) => {}}
											options={months}
											className="form-control-sm"
											placeholder="Seleccionar mes"
										></Select>
									</div>
									<div>
										<Select
											value={null}
											onChange={(e) => {}}
											options={years()}
											className="form-control-sm"
											placeholder="Seleccionar año"
										></Select>
									</div>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardBody>
						<div>
							<BasicLineCharts dataColors='["--vz-warning"]' />
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default DashboardAgent;
