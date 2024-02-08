import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import parseObjectToQueryUrl from '../../../util/parseObjectToQueryUrl';
import { useMutation, useQuery } from 'react-query';
import { getTemplateSmsPaginate } from '../../../helpers/configuration/templateSms';
import { addMessage } from '../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import {
	deleteIconClass,
	editIconClass,
} from '../../../Components/constants/icons';
import {
	Badge,
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Label,
	Row,
} from 'reactstrap';
import moment from 'moment';
import { DATE_FORMAT } from '../../../common/globalsProp';
import CellActions from '../../../Components/Common/CellActions';
import CardHeaderGlobal from '../../../Components/Common/CardHeaderGlobal';
import TableContainer from '../../../Components/Common/TableContainer';
import PaginationManual from '../../../Components/Common/PaginationManual';
import Loader from '../../../Components/Common/Loader';
import ActiveStatus from '../../../Components/Common/ActiveStatus';
import Select from 'react-select';
import { getDepartamentList } from '../../../helpers/configuration/departament';
import { languageOpt } from '../../../Components/constants/utils';
import BasicModal from '../../../Components/Common/BasicModal';
import FormTemplateSms from '../../../Components/Configuration/TemplateSms/FormTemplateSms';

const initFilter = {
	department: '',
	name: '',
	active: true,
	parameter: '',
};

const TemplateSms = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.templateSms.list',
	});
	const { t: tMConstant } = useTranslation('translation', {
		keyPrefix: 'constants.language',
	});
	document.title = t('header');
	const dispatch = useDispatch();
	const [item, setItem] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [departament, setDepartament] = useState('');
	const [isActive, setActive] = useState(true);
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		...initFilter,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	const { data: departmentsOpt } = useQuery(
		['getDepartamentList'],
		async () => {
			const response = await getDepartamentList();
			return response;
		},
		{
			select: (response) =>
				response.data.list.map((it) => ({
					value: it.id,
					label: it.name,
				})),
		}
	);
	//query to get list
	const {
		data: itemsData,
		error: errorItemsQuery,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery(
		['getTemplateSmsPaginate', queryFilter],
		() => getTemplateSmsPaginate(queryFilter),
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (errorItemsQuery?.code) {
			dispatch(
				addMessage({
					message: showFriendlyMessafe(errorItemsQuery?.code),
					type: 'error',
				})
			);
		}
	}, [errorItemsQuery, dispatch]);

	const buscar = () => {
		const copyQuery = {
			max: 10,
			page: 1,
			name: name,
			department: departament,
			active: isActive,
		};
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};
	const editItem = (row) => {
		const { original } = row;
		setItem({
			id: original.id ?? '',
			name: original.name ?? '',
			template: original.template ?? '',
			active: original.active ?? '',
			language: original.language ?? '',
			departments: original.departments ?? [],
		});
		setShowModal(true);
	};

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editItem,
			labelTooltip: t('edit'),
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: t('title'),
				accessor: 'name',
				filterable: false,
				style: {
					width: '15%',
				},
			},
			{
				Header: t('language'),
				accessor: 'language',
				filterable: false,
				style: {
					width: '10%',
				},
				Cell: ({ value }) => {
					const formatLang =
						languageOpt.find((it) => it.value === value)?.label ??
						value;
					return tMConstant(formatLang);
				},
			},
			{
				Header: t('template'),
				accessor: 'template',
				filterable: false,
				style: {
					width: '30%',
				},
			},
			{
				Header: t('departament'),
				accessor: 'departments',
				filterable: false,
				style: {
					width: '25%',
				},
				Cell: ({ value }) => (
					<div className="d-flex">
						{value.map((it) => (
							<Badge
								key={it.id}
								color="light"
								className="text-body me-1"
							>
								{it.name}
							</Badge>
						))}
					</div>
				),
			},
			{
				Header: t('creationDate'),
				accessor: 'dateCreated',
				filterable: false,
				style: {
					width: '10%',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format(DATE_FORMAT),
			},
			{
				Header: t('active'),
				accessor: 'active',
				filterable: false,
				style: {
					width: '5%',
				},
				Cell: ({ value }) => <ActiveStatus active={value} />,
			},
			{
				id: 'action',
				style: {
					width: '5%',
				},
				Cell: ({ row }) => {
					return <CellActions actions={actions} row={row} />;
				},
			},
		],
		[t]
	);

	const toggleDialog = () => {
		setShowModal(!showModal);
	};
	const crearArticulo = () => {
		setItem(null);
		toggleDialog();
	};

	return (
		<>
			<div className="page-content">
				<Container fluid>
					<Row>
						<Col xxl={12}>
							<Card className="shadow">
								<CardHeaderGlobal
									title={t('templateSms')}
									add={{
										action: crearArticulo,
										title: t('createTemplateSms'),
									}}
								/>
								<CardBody className="pt-0">
									<div className="py-3 d-flex justify-content-end border border-dashed border-end-0 border-start-0">
										<div className="position-relative">
											<div className="d-flex align-items-center">
												<Input
													type="text"
													className="form-control me-1"
													placeholder={`${t(
														'searchByName'
													)}...`}
													id="search-options"
													value={name}
													onChange={(e) =>
														setName(e.target.value)
													}
												/>
												<div className="me-1">
													<Select
														id="category"
														className="mb-0 w-250px"
														value={
															departament
																? {
																		value: departament,
																		label:
																			departmentsOpt.find(
																				(
																					it
																				) =>
																					it.value ===
																					departament
																			)
																				?.label ??
																			'',
																  }
																: null
														}
														onChange={(value) => {
															setDepartament(
																value?.value ??
																	''
															);
														}}
														options={departmentsOpt}
														isMulti={false}
														isClearable
														placeholder={t(
															'searchByDepartment'
														)}
													/>
												</div>
												<div className="form-check">
													<Input
														className="form-check-input"
														type="checkbox"
														id="pickup"
														checked={isActive}
														onChange={(evt) =>
															setActive(
																evt.target
																	.checked
															)
														}
													/>
													<Label
														className="form-check-label mb-0"
														htmlFor="pickup"
													>
														{t('active')}
													</Label>
												</div>
											</div>
										</div>
										<button
											className="btn btn-info ms-1"
											onClick={buscar}
										>
											<i className="mdi mdi-magnify"></i>{' '}
											{t('search')}
										</button>
									</div>
									<div>
										{!isLoading ? (
											<>
												<TableContainer
													columns={columns}
													data={
														isSuccess
															? itemsData?.data
																	?.list ?? []
															: []
													}
													className="custom-header-css"
													divClass="table-responsive mb-3"
													tableClass="align-middle table-nowrap"
													theadClass=""
												/>
												<PaginationManual
													query={query}
													setQuery={setQuery}
													setQueryFilter={
														setQueryFilter
													}
													totalPages={
														itemsData?.data
															?.pagination
															?.totalPages ?? 1
													}
													showTotal={true}
													totalCount={
														itemsData?.data
															?.pagination
															?.totalCount ?? 0
													}
												/>
											</>
										) : (
											<Loader />
										)}
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title={`${
					item?.id ? t('editTemplateSms') : t('newTemplateSms')
				}`}
				size="lg"
				children={
					<FormTemplateSms
						item={item}
						toggleModal={toggleDialog}
						refetch={refetch}
					/>
				}
			/>
		</>
	);
};

export default TemplateSms;
