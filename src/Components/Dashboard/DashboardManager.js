import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import SemiCircularRadial from '../Charts/SemiCircularRadial';
import Widget from '../Charts/Widgets';
import BasicLineCharts from '../Charts/BasicLineCharts';
import DatePicker from '../Common/DatePicker';
import Select from 'react-select';
import { SELECT_OPTION } from '../constants/messages';
import { useTranslation } from 'react-i18next';
import ResumeWidgets from '../Charts/ResumeWidgets';

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

const crmWidgets = [
	{
		id: 1,
		label: 'Revenue',
		badge: 'ri-arrow-up-circle-line text-success',
		icon: 'ri-money-dollar-circle-line',
		counter: '1596.5',
		decimals: 2,
		suffix: '',
		prefix: '$',
	},
	{
		id: 2,
		label: 'LLamadas',
		badge: 'ri-arrow-up-circle-line text-success',
		icon: 'ri-phone-line',
		counter: '489',
		decimals: 0,
		suffix: '',
		prefix: '',
	},
	{
		id: 3,
		label: 'Tiempo en llamada',
		badge: 'ri-arrow-up-circle-line text-success',
		icon: ' ri-timer-line',
		counter: '489',
		decimals: 0,
		suffix: 'min',
		prefix: '',
	},
	{
		id: 4,
		label: 'Reservaciones confirmadas',
		badge: 'ri-arrow-up-circle-line text-success',
		icon: 'ri-trophy-line',
		counter: '1596',
		decimals: 0,
		prefix: '',
		separator: ',',
		suffix: '',
	},
	{
		id: 5,
		label: 'pre-confirmadas',
		badge: 'ri-arrow-down-circle-line text-danger',
		icon: 'ri-service-line',
		counter: '2659',
		decimals: 0,
		separator: ',',
		suffix: '',
		prefix: '',
	},
];

const DashboardManager = () => {
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
				<ResumeWidgets crmWidgets={crmWidgets} />
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
									label: 'LLAMADAS RECIBIDAS',
									count: '13',
									countClass: '',
									iconClass: 'bx bx-phone fs-1',
								}}
							/>
						</div>
						<div>
							<Widget
								widget={{
									label: 'LLAMADAS INBOUND',
									count: '30 min',
									countClass: 'text-success',
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
									label: 'LLAMADAS CONTESTADAS',
									count: '13',
									countClass: 'text-success',
									iconClass: 'bx bx-check-circle fs-1',
								}}
							/>
						</div>
						<div>
							<Widget
								widget={{
									label: 'LLAMADAS OUTBOUND',
									count: '20 min',
									countClass: 'text-success',
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
									label: 'LLAMADAS PERDIDAS',
									count: '13',
									countClass: 'text-danger',
									iconClass: 'bx bx-x-circle fs-1',
								}}
							/>
						</div>
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

export default DashboardManager;
