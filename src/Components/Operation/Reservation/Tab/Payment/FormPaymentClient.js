import { Button, Col, Form, Input, Label, Row } from 'reactstrap';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';
import { useTranslation } from 'react-i18next';

const FormPaymentClient = ({ toggleDialog }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formPaymentClient',
	});
	return (
		<Form>
			<Row>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							{t('name')}
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={6}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							{t('lastName')}
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
							{t('card')}
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
							{t('expirationDate')}
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
							{t('cardType')}
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
							{t('terminalType')}
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
							{t('membership')}
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
							{t('noAuthorization')}
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							{t('invoice')}
						</Label>
						<Input id="nombre" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="nombre">
							{t('paymentDate')}
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
							{t('currency')}
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
							{t('amount')}
						</Label>
						<Input id="total" />
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-2">
						<Label className="form-label mb-1" htmlFor="total">
							{t('amount')} (USD)
						</Label>
						<Input id="total" />
					</div>
				</Col>
			</Row>

			<div className="d-flex mt-3">
				<Button type="submit" color="primary" className="me-2">
					{t('accept')}
				</Button>
				<Button
					type="button"
					color="danger"
					className="btn-soft-danger"
					onClick={toggleDialog ? toggleDialog : () => {}}
				>
					{t('cancel')}
				</Button>
			</div>
		</Form>
	);
};

export default FormPaymentClient;
