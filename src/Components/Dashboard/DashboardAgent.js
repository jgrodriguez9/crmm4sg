import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import SemiCircularRadial from '../Charts/SemiCircularRadial';
import Widget from '../Charts/Widgets';
import BasicLineCharts from '../Charts/BasicLineCharts';
import DatePicker from '../Common/DatePicker';
import Select from 'react-select';
import { SELECT_OPTION } from '../constants/messages';
import { useTranslation } from 'react-i18next';

const options = [
	{
		value: 'semana',
		label: 'Semanal',
	},
	{
		value: 'quincena',
		label: 'Quincenal',
	},
	{
		value: 'mes',
		label: 'Mensual',
	},
];

const DashboardAgent = () => {
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	return (
		<>
			<Row className="justify-content-end mb-3" style={{ zIndex: 2 }}>
				<Col xs={12} md={4}>
					<div className="d-flex align-items-center justify-content-end">
						<div className="flex-grow-1 me-2">
							<div className="input-group">
								<DatePicker
									id="rangeDate"
									className="form-control border-0 dash-filter-picker shadow-sm"
									options={{
										mode: 'range',
									}}
									onChangeDate={(e) => console.log(e)}
									placeholder="Seleccionar rango de fecha"
								/>
								<div className="input-group-text bg-primary border-primary text-white">
									<i className="ri-calendar-2-line"></i>
								</div>
							</div>
						</div>
						<div>
							<Select
								value={null}
								onChange={(e) => {}}
								options={options}
								placeholder={tMessage(SELECT_OPTION)}
								className="shadow-sm"
							></Select>
						</div>
					</div>
				</Col>
			</Row>
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
						<CardHeader>
							<h4 className="card-title mb-0">RESERVAS</h4>
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
						<CardHeader>
							<h4 className="card-title mb-0">
								TIEMPO EN LLAMADAS
							</h4>
						</CardHeader>
						<CardBody>
							<div>
								<BasicLineCharts dataColors='["--vz-warning"]' />
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default DashboardAgent;
