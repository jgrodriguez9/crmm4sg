import { Button, Col, Row, Table } from 'reactstrap';
import DatePicker from '../../../Common/DatePicker';
import { Field, FieldArray, FormikProvider } from 'formik';
import { addIconClass } from '../../../constants/icons';
import { useQuery } from 'react-query';
import { getRelationship } from '../../../../helpers/pax';
import Select from 'react-select';
import { SELECT_OPTION } from '../../../constants/messages';
import { useTranslation } from 'react-i18next';

const FormReservationPaxes = ({ formik }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formReservationPaxes',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	//query to get relationship
	const { data: dataRelationships } = useQuery(
		'getRelationship',
		async () => {
			const response = await getRelationship();
			return response;
		},
		{
			select: (response) => {
				return (
					response.data.relationList.map((item) => ({
						value: item.id,
						label: item.spanishDescription,
					})) ?? []
				);
			},
		}
	);
	return (
		<FormikProvider value={formik}>
			<FieldArray
				name="paxes"
				render={(arrayHelper) => (
					<Row>
						<Col xs="12" md="12" className="mb-2">
							<div className="d-flex align-items-center">
								<h5 className="text-primary m-0 me-1">
									{t('paxes')}
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
									{t('add')}
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
												{t('name')}
											</th>
											<th style={{ width: '22%' }}>
												{t('lastName')}
											</th>
											<th style={{ width: '14%' }}>
												{t('birthDay')}
											</th>
											<th style={{ width: '10%' }}>
												{t('age')}
											</th>
											<th style={{ width: '18%' }}>
												{t('occupation')}
											</th>
											<th style={{ width: '18%' }}>
												{t('relationship')}
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
													<Select
														value={
															formik.values.paxes[
																idx
															].relation
																? {
																		value: formik
																			.values
																			.paxes[
																			idx
																		]
																			.relation,
																		label:
																			dataRelationships.find(
																				(
																					item
																				) =>
																					item.value ===
																					formik
																						.values
																						.paxes[
																						idx
																					]
																						.relation
																			)
																				?.label ??
																			'',
																  }
																: null
														}
														onChange={(value) => {
															formik.setFieldValue(
																`paxes.${idx}.relation`,
																value.value
															);
														}}
														options={
															dataRelationships
														}
														classNamePrefix="select2-selection"
														placeholder={tMessage(
															SELECT_OPTION
														)}
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
