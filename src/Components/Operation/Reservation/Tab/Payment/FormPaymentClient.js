import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';

const FormPaymentClient = ({ toggleDialog }) => {
	return (
		<Form>
			<Row>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							Nombre
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							Apellidos
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Tarjeta
						</Label>
						<InputMask
							className="form-control"
							mask="9999 9999 9999 9999"
							maskChar=" "
							placeholder="xxxx xxxx xxxx xxxx"
						/>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Fecha expiración
						</Label>
						<InputMask
							className="form-control"
							mask="99/9999"
							maskChar=" "
							placeholder="MM/YYYY"
						/>
					</div>
				</Col>
				<Col lg={3}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							CVV
						</Label>
						<InputMask
							className="form-control"
							mask="999"
							maskChar=" "
							placeholder="xxx"
						/>
					</div>
				</Col>
				<Col xs={12} md={6}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Tipo de tarjeta
						</Label>
						<Select
							value={null}
							onChange={() => {}}
							options={[]}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col md={6}></Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Tipo de terminal
						</Label>
						<Select
							value={null}
							onChange={() => {}}
							options={[]}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Afiliación
						</Label>
						<Select
							value={null}
							onChange={() => {}}
							options={[]}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							No. autorización
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							Invoice
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							Fecha pago
						</Label>
						<DatePicker
							id="fechaLlegada"
							date={null}
							onChangeDate={() => {}}
						/>
					</div>
				</Col>
				<Col md={4}></Col>
				<Col xs={12} md={4}>
					<div className="mb-2">
						<Label
							className="form-label mb-1"
							htmlFor="cleave-ccard"
						>
							Moneda
						</Label>
						<Select
							value={null}
							onChange={() => {}}
							options={[]}
							name="choices-single-default"
							id="idStatus"
						></Select>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="total">
							Importe
						</Label>
						<Input id="total" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="total">
							Importe (USD)
						</Label>
						<Input id="total" />
					</div>
				</Col>
			</Row>

			<div className="d-flex mt-3">
				<Button type="submit" color="primary" className="me-2">
					Aceptar
				</Button>
				<Button
					type="button"
					color="danger"
					className="btn-soft-danger"
					onClick={toggleDialog ? toggleDialog : () => {}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default FormPaymentClient;
