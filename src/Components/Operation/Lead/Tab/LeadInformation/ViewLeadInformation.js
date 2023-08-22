import { Col, Label, Row } from 'reactstrap';

const ViewLeadInformation = ({
	editMode,
	setEditMode,
	data,
	onHandleClickToCall,
}) => {
	return (
		<>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="nombre">
							Nombre
						</Label>
						<div className="form-control">
							{data?.firstName ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Apellido</Label>
						<div className="form-control">
							{data?.lastName ?? 'No disponible'}
						</div>
					</div>
				</Col>
				{/* <Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Copropietario</Label>
						<div className="form-control">Jesus Enrique</div>
					</div>
				</Col> */}
			</Row>
			<Row>
				<Col lg={8}>
					<div className="mb-3">
						<Label className="form-label">Dirección</Label>
						<div className="form-control">
							{data?.address ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Código postal</Label>
						<div className="form-control">
							{data?.postalCode ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">País</Label>
						<div className="form-control">
							{data?.country ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Estado</Label>
						<div className="form-control">
							{data?.state ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Ciudad</Label>
						<div className="form-control">
							{data?.city ?? 'No disponible'}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Correo electrónico</Label>
						<div className="form-control mb-2">
							{data?.email ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Teléfono</Label>
						<div className="form-icon right">
							<div className="form-control mb-2">
								{data?.phone1 ?? 'No disponible'}
							</div>
							{data?.phone1 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone1')
									}
								></i>
							)}
						</div>
						<div className="form-icon right">
							<div className="form-control">
								{data?.phone2 ?? 'No disponible'}
							</div>
							{data?.phone2 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone2')
									}
								></i>
							)}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label opacity-0">Teléfono</Label>
						<div className="form-icon right">
							<div className="form-control mb-2">
								{data?.phone3 ?? 'No disponible'}
							</div>
							{data?.phone3 && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('phone3')
									}
								></i>
							)}
						</div>
						<div className="form-icon right">
							<div className="form-control">
								{data?.movil ?? 'No disponible'}
							</div>
							{data?.movil && (
								<i
									className="ri-phone-fill text-primary fw-bold"
									onClick={(e) =>
										onHandleClickToCall('movil')
									}
								></i>
							)}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">
							Usuario que lo creó
						</Label>
						<div className="form-control">
							{data?.userName ?? 'No disponible'}
						</div>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label">Call center</Label>
						<div className="form-control">
							{data?.callcenter?.name ?? 'No disponible'}
						</div>
					</div>
				</Col>
			</Row>
			{/* <hr />
			{!editMode && (
				<div className="d-flex mt-3">
					<Button
						type="button"
						color="primary"
						onClick={() => setEditMode(true)}
					>
						Editar
					</Button>
				</div>
			)} */}
		</>
	);
};

export default ViewLeadInformation;
