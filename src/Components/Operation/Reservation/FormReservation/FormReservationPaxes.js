import { Button, Col, Row, Table } from 'reactstrap';
import DatePicker from '../../../Common/DatePicker';
import { Field, FieldArray, FormikProvider } from 'formik';
import { addIconClass } from '../../../constants/icons';

const FormReservationPaxes = ({ formik }) => {
	return (
		<FormikProvider value={formik}>
			<FieldArray
				name="paxes"
				render={(arrayHelper) => (
					<Row>
						<Col xs="12" md="12" className="mb-2">
							<div className="d-flex align-items-center">
								<h5 className="text-primary m-0 me-1">
									Acompañantes
								</h5>
								<Button
									color="light"
									size="sm"
									className="d-flex align-items-center"
									onClick={() => {
										arrayHelper.push({
											age: '',
											fechadnacimiento: null,
											firstName: '',
											lastName: '',
											occupation: '',
											relation: '',
										});
									}}
								>
									<i className={`fs-5 ${addIconClass}`} />{' '}
									Agregar
								</Button>
							</div>
						</Col>
						<hr />
						{formik.values.paxes.length > 0 && (
							<Col>
								<Table className="w-100 fs-7 table-sm align-middle">
									<thead>
										<tr>
											<th style={{ width: '13%' }}>
												Nombre
											</th>
											<th style={{ width: '22%' }}>
												Apellidos
											</th>
											<th style={{ width: '14%' }}>
												Fecha nacimiento
											</th>
											<th style={{ width: '10%' }}>
												Edad
											</th>
											<th style={{ width: '18%' }}>
												Ocupación
											</th>
											<th style={{ width: '18%' }}>
												Relación
											</th>
											<th style={{ width: '5%' }}></th>
										</tr>
									</thead>
									<tbody>
										{formik.values.paxes.map((it, idx) => (
											<tr key={`paxes-${idx}`}>
												<td>
													<Field
														className={`form-control`}
														name={`paxes.${idx}.firstName`}
													/>
												</td>
												<td>
													<Field
														className={`form-control`}
														name={`paxes.${idx}.lastName`}
													/>
												</td>
												<td>
													<DatePicker
														id="fechadnacimiento"
														date={
															formik.values.paxes[
																idx
															].fechadnacimiento
														}
														onChangeDate={(
															date
														) => {
															if (
																date.length > 0
															) {
																formik.setFieldValue(
																	`paxes.${idx}.fechadnacimiento`,
																	date[0]
																);
															} else {
																formik.setFieldValue(
																	`paxes.${idx}.fechadnacimiento`,
																	null
																);
															}
														}}
													/>
												</td>
												<td>
													<Field
														className={`form-control`}
														name={`paxes.${idx}.age`}
													/>
												</td>
												<td>
													<Field
														className={`form-control`}
														name={`paxes.${idx}.occupation`}
													/>
												</td>
												<td>
													<Field
														className={`form-control`}
														name={`paxes.${idx}.relation`}
													/>
												</td>
												<td className="text-center">
													<i
														className="text-danger mdi mdi-close-circle fs-5"
														onClick={() =>
															arrayHelper.remove(
																idx
															)
														}
													/>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Col>
						)}
					</Row>
				)}
			/>
		</FormikProvider>
	);
};

export default FormReservationPaxes;
