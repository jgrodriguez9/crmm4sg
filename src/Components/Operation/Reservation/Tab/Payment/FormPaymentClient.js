import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import InputMask from 'react-input-mask';

const FormPaymentClient = () => {
	return (
		<Form>
			<Row>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							Nombre
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={12}>
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
				<Col lg={7}>
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
				<Col lg={5}>
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
				<Col lg={12}>
					<div className="mb-2 mt-1 d-flex">
						<div className="form-check me-4">
							<Input
								className="form-check-input"
								type="radio"
								name="moneda"
								id="usd"
								defaultChecked
							/>
							<Label className="form-check-label" htmlFor="usd">
								Dolar (USD)
							</Label>
						</div>
						<div className="form-check">
							<Input
								className="form-check-input"
								type="radio"
								name="moneda"
								id="mxn"
							/>
							<Label className="form-check-label" htmlFor="mxn">
								Peso mexicano (MXN)
							</Label>
						</div>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="total">
							Total
						</Label>
						<Input id="total" />
					</div>
				</Col>
			</Row>
			<div className="d-flex mt-3">
				<Button type="submit" color="primary" className="me-2">
					Pagar
				</Button>
				<Button
					type="button"
					color="danger"
					className="btn-soft-danger"
					onClick={() => {}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default FormPaymentClient;
