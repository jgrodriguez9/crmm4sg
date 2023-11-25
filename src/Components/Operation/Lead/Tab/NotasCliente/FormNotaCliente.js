import { Button, Col, Form, Label, Row } from 'reactstrap';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';
import { useQuery } from 'react-query';
import { getListNotesTypes } from '../../../../../helpers/notes';
import { useState } from 'react';

const FormNotaCliente = () => {
	const [animo, setAnimo] = useState('');
	const [bgAnimo, setBgAnimo] = useState('');
	const {
		data: noteTypeOpt,
		error: errorNoteTypeOpt,
		isLoading: isLoadingNoteTypeOpt,
		isSuccess: isSuccessNoteTypeOpt,
	} = useQuery(
		['getListNotesTypes'],
		async () => {
			const response = await getListNotesTypes();
			return response;
		},
		{
			keepPreviousData: true,
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: it.type,
					labelEn: it.typeEng,
				})),
		}
	);

	return (
		<Form>
			<Row>
				<Col xs={12} lg={12}>
					<div className="mb-3">
						<div className="d-flex flex-column">
							<div>
								<Label
									className="form-label mb-0"
									htmlFor="tipo"
								>
									Estado de ánimo del cliente
									{animo ? (
										<span
											style={{
												backgroundColor: bgAnimo,
												color: '#fff',
											}}
											className="px-2 py-1 rounded-pill ms-2"
										>
											{animo}
										</span>
									) : (
										''
									)}
								</Label>
							</div>
							<div>
								<ul className="list-inline hstack gap-0 mb-0">
									<li className="list-inline-item">
										<i
											className="ri-emotion-unhappy-line fs-3 cursor-pointer"
											title="Triste"
											style={{ color: '#f40000' }}
											onClick={() => {
												setAnimo('Triste');
												setBgAnimo('#f40000');
											}}
										/>
									</li>
									<li className="list-inline-item">
										<i
											className="ri-emotion-normal-line fs-3 cursor-pointer"
											title="Neutro"
											style={{ color: '#f49000' }}
											onClick={() => {
												setAnimo('Nuetro');
												setBgAnimo('#f49000');
											}}
										/>
									</li>
									<li className="list-inline-item">
										<i
											className="ri-emotion-happy-line fs-3 cursor-pointer"
											title="Feliz"
											style={{ color: '#bff400' }}
											onClick={() => {
												setAnimo('Feliz');
												setBgAnimo('#bff400');
											}}
										/>
									</li>
									<li className="list-inline-item">
										<i
											className="ri-emotion-line fs-3 cursor-pointer"
											title="Emocionado"
											style={{ color: '#0cc412' }}
											onClick={() => {
												setAnimo('Emocionado');
												setBgAnimo('#0cc412');
											}}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</Col>
				<Col lg={8}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="tipo">
							Tipo
						</Label>
						<Select
							id="tipo"
							className="mb-0"
							value={null}
							onChange={() => {}}
							options={noteTypeOpt}
							placeholder="Seleccionar opción"
						/>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="fechaFUp">
							Fecha FUp
						</Label>
						<DatePicker
							id="fechaFUp"
							date="29/06/2023"
							onChangeDate={(date) => console.log(date)}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="nota">
							Nota
						</Label>
						<textarea
							id="nota"
							name="nota"
							className={`form-control`}
							value="test nota"
							rows={5}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="nota">
							Req. especial
						</Label>
						<textarea
							id="nota"
							name="nota"
							className={`form-control`}
							value="req especial"
							rows={5}
						/>
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
					onClick={() => {}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default FormNotaCliente;
