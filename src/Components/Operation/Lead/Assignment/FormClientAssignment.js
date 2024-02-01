import { Button, Col, Form, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import StateInput from '../../../Controller/StateInput';
import useUser from '../../../../hooks/useUser';
import { SELECT_OPTION } from '../../../constants/messages';
import ButtonsLoader from '../../../Loader/ButtonsLoader';
import TableContainer from '../../../Common/TableContainer';
import PaginationManual from '../../../Common/PaginationManual';
import parseObjectToQueryUrl from '../../../../util/parseObjectToQueryUrl';

const FormClientAssignment = ({ toggleDialog }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.formClient',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const user = useUser();
	const dispatch = useDispatch();
	const [countryDefault, setCountryDefault] = useState(null);
	const [statesDefault, setStatesDefault] = useState(null);
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);

	const columns = useMemo(
		() => [
			{
				Header: t('name'),
				accessor: 'nombre',
				filterable: false,
				style: {
					width: '60%',
				},
				Cell: (contact) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0">
								<div className="flex-shrink-0 avatar-xs me-2">
									<div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
										{contact.row.original.firstName.charAt(
											0
										)}
									</div>
								</div>
							</div>
							<div className="flex-grow-1 ms-2 name">
								{`${contact.row.original.firstName} ${
									contact.row.original.lastName ?? ''
								}`}
							</div>
						</div>
					</>
				),
			},
			{
				Header: 'Agente asignado',
				accessor: 'userName',
				filterable: false,
				style: {
					width: '40%',
				},
			},
		],
		[t]
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			agents: [],
		},
		validationSchema: Yup.object({}),
		onSubmit: async (values) => {
			//submit request
			console.log(values);
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
				<Col xs="12" md="12">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="agent">
							Agentes a asignar
						</Label>
						<Select
							value={null}
							isMulti
							onChange={(value) => console.log(value)}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="callCenter">
							Call center
						</Label>
						<Select
							value={null}
							onChange={(value) => console.log(value)}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="callCenter">
							Agente
						</Label>
						<Select
							value={null}
							onChange={(value) => console.log(value)}
							options={[]}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('country')}
						</Label>
						<Select
							value={countryDefault}
							onChange={(value) => console.log(value)}
							options={Country.getAllCountries().map((it) => ({
								label: it.name,
								value: it.isoCode,
							}))}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
					</div>
				</Col>
				<Col xs="12" md="3">
					<div className="mb-2">
						<Label className="form-label mb-0" htmlFor="country">
							{t('state')}
						</Label>
						<StateInput
							value={statesDefault}
							handleChange={(value) => console.log(value)}
							country={countryDefault}
						/>
					</div>
				</Col>
				<Col xs="12" md="12">
					<TableContainer
						columns={columns}
						data={[]}
						className="custom-header-css"
						divClass="table-responsive mb-3"
						tableClass="align-middle table-nowrap"
						theadClass=""
					/>
					<PaginationManual
						query={query}
						setQuery={setQuery}
						setQueryFilter={setQueryFilter}
						totalPages={1}
					/>
				</Col>
			</Row>

			{1 === 2 ? (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: 'Asignar',
								color: 'primary',
								className: 'me-2',
								loader: true,
							},
							{
								text: t('cancel'),
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
						Asignar
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
			)}
		</Form>
	);
};

export default FormClientAssignment;
