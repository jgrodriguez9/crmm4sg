import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import DatePicker from '../../../../Common/DatePicker';
import Select from 'react-select';
import { SELECT_OPTION } from '../../../../constants/messages';

const FormPaxes = ({ toggleDialog }) => {
	return (
		<Form className="fs-7">
			<Row>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Nombre
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Apellidos
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={8}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Fecha nacimiento
						</Label>
						<DatePicker
							id="fechaLlegada"
							date=""
							onChangeDate={(date) => console.log(date)}
						/>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Edad
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Ocupación
						</Label>
						<Select
							value={null}
							onChange={(value) => {}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="nombre">
							Relación
						</Label>
						<Select
							value={null}
							onChange={(value) => {}}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={SELECT_OPTION}
						/>
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
					onClick={toggleDialog ? toggleDialog : () => {}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default FormPaxes;
