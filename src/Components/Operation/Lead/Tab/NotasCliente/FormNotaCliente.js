import { Button, Col, Form, FormFeedback, Label, Row } from 'reactstrap';
import Select from 'react-select';
import DatePicker from '../../../../Common/DatePicker';
import { useMutation, useQuery } from 'react-query';
import {
	createNote,
	getListEmotionsClients,
	getListNotesTypes,
	updateNote,
} from '../../../../../helpers/notes';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	ERROR_SERVER,
	FIELD_REQUIRED,
	SAVE_SUCCESS,
	SELECT_OPTION,
	UPDATE_SUCCESS,
} from '../../../../constants/messages';
import removetEmptyObject from '../../../../../util/removetEmptyObject';
import ButtonsLoader from '../../../../Loader/ButtonsLoader';
import moment from 'moment';
import TooltipDescription from '../../../../Common/TooltipDescription';
import {
	getBgEmoticonsClass,
	getEmoticonsClass,
} from '../../../../../util/getEmoticonsClass';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../../util/extractMeaningfulMessage';
import useUser from '../../../../../hooks/useUser';

const FormNotaCliente = ({ note = null, toggleModal, customerId, refetch }) => {
	const user = useUser();
	const dispatch = useDispatch();
	const [animo, setAnimo] = useState('');
	const [bgAnimo, setBgAnimo] = useState('');
	const [fUp, setFUp] = useState(
		note?.contactDate
			? moment(note?.contactDate, 'YYYY-MM-DD').toDate()
			: null
	);
	const { data: noteTypeOpt } = useQuery(
		['getListNotesTypes'],
		async () => {
			const response = await getListNotesTypes();
			return response;
		},
		{
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: it.type,
					labelEn: it.typeEng,
				})),
		}
	);
	const { data: emotionsClientsTypeOpt } = useQuery(
		['getListEmotionsClients'],
		async () => {
			const response = await getListEmotionsClients();
			return response;
		},
		{
			select: (response) =>
				response.data.list
					.map((it) => ({
						key: parseInt(it.key),
						value: it.id,
						label: it.mood,
						labelEn: it.moodEng,
					}))
					.sort((a, b) => a.key - b.key),
		}
	);

	//create note
	const {
		mutate: createItem,
		isLoading: isCreating,
		isError: isErrorCreate,
		error: errorCreate,
		isSuccess: isCreated,
	} = useMutation(createNote);

	//update note
	const {
		mutate: updateItem,
		isLoading: isUpdating,
		isError: isErrorUpdate,
		error: errorUpdate,
		isSuccess: isUpdated,
	} = useMutation(updateNote);

	useEffect(() => {
		if (isCreated || isUpdated) {
			dispatch(
				addMessage({
					type: 'success',
					message: isCreated ? SAVE_SUCCESS : UPDATE_SUCCESS,
				})
			);
			toggleModal();
			refetch();
		} else if (isErrorCreate || isErrorUpdate) {
			let message = ERROR_SERVER;
			let serverError = isErrorCreate ? errorCreate : errorUpdate;
			message = extractMeaningfulMessage(serverError, message);
			dispatch(
				addMessage({
					type: 'error',
					message: message,
				})
			);
		}
	}, [
		isCreated,
		isUpdated,
		dispatch,
		isErrorCreate,
		isErrorUpdate,
		errorCreate,
		errorUpdate,
	]);

	useEffect(() => {
		const emot = emotionsClientsTypeOpt?.find(
			(it) => it.value === note?.status?.id
		);
		setAnimo(emot?.label ?? '');
		setBgAnimo(getBgEmoticonsClass(emot?.key ?? ''));
	}, [emotionsClientsTypeOpt, note?.status?.id]);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			noteId: note?.noteId ?? '',
			user: note?.user ?? user?.username,
			contactDate: note?.contactDate ?? null,
			customerId: customerId,
			note: note?.note ?? '',
			specialReq: note?.specialReq ?? '',
			status: note?.status ?? '',
			noteTypeId: note?.noteType?.id ?? '',
		},
		validationSchema: Yup.object({
			note: Yup.string().required(FIELD_REQUIRED),
			noteTypeId: Yup.string().required(FIELD_REQUIRED),
		}),
		onSubmit: async (values) => {
			//submit request
			const data = {};
			Object.entries(removetEmptyObject(values)).forEach((entry) => {
				const [key, value] = entry;
				if (key === 'contactDate') {
					data[key] = moment(values.contactDate).format('YYYY-MM-DD');
				} else {
					data[key] = value;
				}
			});
			data['noteType'] = values.noteTypeId;
			console.log(data);
			if (data.noteId) {
				updateItem({
					customerId: customerId,
					noteId: data.noteId,
					body: data,
				});
			} else {
				createItem(data);
			}
		},
	});

	return (
		<Form
			className="needs-validation fs-7"
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
				return false;
			}}
		>
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
									{emotionsClientsTypeOpt?.map((emot) => (
										<li
											key={`emot-${emot.key}-${emot.key}`}
											className="list-inline-item"
											id={`emot-${emot.key}-${emot.key}`}
										>
											<i
												className={`fs-3 cursor-pointer ${getEmoticonsClass(
													emot.key
												)}`}
												onClick={() => {
													setAnimo(emot.label);
													formik.setFieldValue(
														'status',
														emot.value
													);
													setBgAnimo(
														getBgEmoticonsClass(
															emot.key
														)
													);
												}}
											/>
											<TooltipDescription
												text={emot.label}
												id={`emot-${emot.key}-${emot.key}`}
											/>
										</li>
									))}
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
							value={
								formik.values.noteTypeId
									? {
											value: formik.values.noteTypeId,
											label:
												noteTypeOpt?.find(
													(it) =>
														it.value ===
														formik.values.noteTypeId
												)?.label ?? '',
									  }
									: null
							}
							onChange={(value) => {
								formik.setFieldValue(
									'noteTypeId',
									value?.value ?? ''
								);
							}}
							options={noteTypeOpt}
							placeholder={SELECT_OPTION}
						/>
					</div>
				</Col>
				<Col lg={4}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="contactDate">
							Fecha FUp
						</Label>
						<DatePicker
							id="contactDate"
							date={fUp}
							onChangeDate={(value) => {
								setFUp(value[0]);
								if (value.length > 0) {
									formik.setFieldValue(
										`contactDate`,
										value[0]
									);
								} else {
									formik.setFieldValue(`contactDate`, null);
								}
							}}
						/>
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="note">
							Nota
						</Label>
						<textarea
							id="note"
							name="note"
							className={`form-control ${
								formik.errors.note ? 'is-invalid' : ''
							}`}
							value={formik.values.note}
							onChange={(e) =>
								formik.setFieldValue('note', e.target.value)
							}
							rows={5}
						/>
						{formik.errors.note && (
							<FormFeedback type="invalid d-block">
								{formik.errors.note}
							</FormFeedback>
						)}
					</div>
				</Col>
				<Col lg={12}>
					<div className="mb-3">
						<Label className="form-label" htmlFor="specialReq">
							Req. especial
						</Label>
						<textarea
							id="specialReq"
							name="specialReq"
							className={`form-control`}
							value={formik.values.specialReq}
							onChange={(e) =>
								formik.setFieldValue(
									'specialReq',
									e.target.value
								)
							}
							rows={5}
						/>
					</div>
				</Col>
			</Row>
			{isUpdating || isCreating ? (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: 'Aceptar',
								color: 'primary',
								className: 'me-2',
								loader: true,
							},
							{
								text: 'Cancelar',
								color: 'danger',
								className: 'btn-soft-danger',
								loader: false,
							},
						]}
					/>
				</div>
			) : (
				<div className="d-flex my-3">
					<Button type="submit" color="primary" className="me-2">
						Aceptar
					</Button>
					<Button
						type="button"
						color="danger"
						className="btn-soft-danger"
						onClick={toggleModal ? toggleModal : () => {}}
					>
						Cancelar
					</Button>
				</div>
			)}
		</Form>
	);
};

export default FormNotaCliente;
