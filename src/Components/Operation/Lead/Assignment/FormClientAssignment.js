import { Button, Col, Form, FormFeedback, Label, Row } from 'reactstrap';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import StateInput from '../../../Controller/StateInput';
import useUser from '../../../../hooks/useUser';
import {
	ASSIGN_CLIENTS_SUCCESS,
	ERROR_SERVER,
	MISSING_CLIENTS,
	ONE_OPTION_REQUIRED,
	SELECT_OPTION,
} from '../../../constants/messages';
import ButtonsLoader from '../../../Loader/ButtonsLoader';
import TableContainer from '../../../Common/TableContainer';
import PaginationManual from '../../../Common/PaginationManual';
import parseObjectToQueryUrl from '../../../../util/parseObjectToQueryUrl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
	assignClientsRandom,
	getAgentsBySupervisor,
} from '../../../../helpers/customer';
import useRole from '../../../../hooks/useRole';
import { fecthItems } from '../../../../pages/Operation/Lead/Util/services';
import Loader from '../../../Common/Loader';
import { addMessage } from '../../../../slices/messages/reducer';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import { infoIconClass } from '../../../constants/icons';
import TooltipDescription from '../../../Common/TooltipDescription';

const FormClientAssignment = ({ toggleDialog }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.FormClientAssignment',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	const user = useUser();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const { isAgent } = useRole();
	const [countryDefault, setCountryDefault] = useState(null);
	const [statesDefault, setStatesDefault] = useState(null);
	const [owner, setOwner] = useState(null);
	const [agents, setAgents] = useState(null);
	const [query, setQuery] = useState({
		max: 5,
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
					width: '40%',
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
				Header: t('country'),
				accessor: 'country.name_esp',
				filterable: false,
				style: {
					width: '20%',
				},
			},
			{
				Header: t('assignedAgent'),
				accessor: 'userName',
				filterable: false,
				style: {
					width: '40%',
				},
			},
		],
		[t]
	);

	//agents by super/manager
	const { data: agentsOpt } = useQuery(
		['getAgentsBySupervisor', user.usuario],
		() => getAgentsBySupervisor(user.usuario),
		{
			enabled: user !== null && !isAgent,
			select: (result) =>
				result.data.list.map((it) => ({
					value: it.id,
					label: it.id,
				})) ?? [],
		}
	);

	const { mutate: assignClient, isLoading: isAssigning } = useMutation(
		assignClientsRandom,
		{
			onSuccess: (result) => {
				queryClient.refetchQueries({
					queryKey: ['getCustomerPaginate'],
				});
				toggleDialog();
				dispatch(
					addMessage({
						type: 'success',
						message: tMessage(ASSIGN_CLIENTS_SUCCESS),
					})
				);
			},
			onError: (error) => {
				let message = tMessage(ERROR_SERVER);
				message = extractMeaningfulMessage(error, message);
				dispatch(
					addMessage({
						type: 'error',
						message: message,
					})
				);
			},
		}
	);

	const formik = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			agents: [],
			country: '',
			state: '',
			vendor: '',
			customers: '',
		},
		validationSchema: Yup.object({
			agents: Yup.array().min(1, tMessage(ONE_OPTION_REQUIRED)),
			customers: Yup.string().when(['country', 'state', 'vendor'], {
				is: (country, state, vendor) => !country && !state && !vendor,
				then: Yup.string().required(tMessage(MISSING_CLIENTS)),
				otherwise: Yup.string(),
			}),
		}),
		onSubmit: async (values) => {
			const body = {
				country: values.country,
				state: values.state,
				vendor: values.vendor,
				agents: values.agents,
			};
			assignClient(body);
		},
	});

	const {
		data: itemsData,
		isSuccess,
		isLoading,
		isFetching,
	} = useQuery(
		['getClientsToAssign', queryFilter],
		() => fecthItems(queryFilter),
		{
			keepPreviousData: true,
			enabled:
				formik.values.country !== '' ||
				formik.values.state !== '' ||
				formik.values.vendor !== '',
			select: (result) => {
				//console.log(result);
				return result;
			},
		}
	);
	const itemsFiltered = useMemo(() => {
		if (
			isSuccess &&
			itemsData?.data?.list.length > 0 &&
			(formik.values.country !== '' ||
				formik.values.state !== '' ||
				formik.values.vendor !== '')
		) {
			return {
				totalPages: itemsData?.data?.pagination?.totalPages ?? 1,
				totalCount: itemsData?.data?.pagination?.totalCount ?? 0,
				list: itemsData?.data?.list ?? [],
			};
		}
		return {
			totalPages: 1,
			totalCount: 0,
			list: [],
		};
	}, [
		itemsData,
		formik.values.country,
		formik.values.state,
		formik.values.vendor,
		isSuccess,
	]);
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
						<Label
							className="form-label mb-0 d-flex align-items-center"
							htmlFor="agent"
						>
							{t('assignTo')}
							<i
								className={`${infoIconClass} text-primary fs-6 ms-1`}
								id="assign-description"
							/>
							<TooltipDescription
								text={t('infoAssignation')}
								id="assign-description"
							/>
						</Label>
						<Select
							value={agents}
							isMulti
							onChange={(value) => {
								setAgents(value);
								formik.setFieldValue(
									'agents',
									value.map((it) => it.value)
								);
							}}
							options={agentsOpt}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
						/>
						{formik.errors.agents && (
							<FormFeedback type="invalid" className="d-block">
								{formik.errors.agents}
							</FormFeedback>
						)}
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
							{t('agent')}
						</Label>
						<Select
							value={owner}
							onChange={(value) => {
								formik.setFieldValue(
									'vendor',
									value?.value ?? ''
								);
								setOwner(value);
								const copyQuery = {
									...query,
									userName: value?.value ?? '',
								};
								setQuery(copyQuery);
								setQueryFilter(
									parseObjectToQueryUrl(copyQuery)
								);
							}}
							options={agentsOpt}
							classNamePrefix="select2-selection"
							placeholder={tMessage(SELECT_OPTION)}
							isClearable
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
							onChange={(value) => {
								formik.setFieldValue(
									'country',
									value?.value ?? ''
								);
								setCountryDefault(value);
								const copyQuery = {
									...query,
									country: value?.value ?? '',
								};
								setQuery(copyQuery);
								setQueryFilter(
									parseObjectToQueryUrl(copyQuery)
								);
							}}
							options={Country.getAllCountries().map((it) => ({
								label: it.name,
								value: it.isoCode,
							}))}
							isClearable
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
							handleChange={(value) => {
								formik.setFieldValue(
									'state',
									value?.value ?? ''
								);
								setStatesDefault(value);
								const copyQuery = {
									...query,
									state: value?.value ?? '',
								};
								setQuery(copyQuery);
								setQueryFilter(
									parseObjectToQueryUrl(copyQuery)
								);
							}}
							country={countryDefault}
							isClearable
						/>
					</div>
				</Col>
				<Col xs="12" md="12">
					{!isLoading ? (
						<>
							<TableContainer
								columns={columns}
								data={isSuccess ? itemsFiltered.list : []}
								className="custom-header-css"
								divClass="table-responsive mb-3"
								tableClass="align-middle table-nowrap"
								theadClass=""
							/>
							<PaginationManual
								query={query}
								setQuery={setQuery}
								setQueryFilter={setQueryFilter}
								totalPages={itemsFiltered.totalPages}
								totalCount={itemsFiltered.totalCount}
								showTotal={true}
								isLoading={isFetching}
								labelForItem={{
									plural: t('clients'),
									singular: t('client'),
								}}
							/>
						</>
					) : (
						<Loader />
					)}
				</Col>
				<Col xs={12} md={12}>
					{formik.errors.customers && (
						<FormFeedback type="invalid" className="d-block">
							{formik.errors.customers}
						</FormFeedback>
					)}
				</Col>
			</Row>

			{isAssigning ? (
				<div className="d-flex my-3">
					<ButtonsLoader
						buttons={[
							{
								text: t('ok'),
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
						{t('ok')}
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
