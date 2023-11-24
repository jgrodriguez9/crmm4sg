import { Button, Col, Form, Label, Row } from 'reactstrap';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';
import { useQuery } from 'react-query';
import { getListNotesTypes } from '../../../../../helpers/notes';

const FormNotaCliente = () => {
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
