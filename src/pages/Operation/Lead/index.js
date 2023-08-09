import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import CrmFilter from '../../../Components/Common/CrmFilter';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TableContainer from '../../../Components/Common/TableContainer';
import Loader from '../../../Components/Common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//Import actions
import DetailCanvas from '../../../Components/Common/DetailCanvas';
import parseObjectToQueryUrl from '../../../util/parseObjectToQueryUrl';
import { useQuery } from 'react-query';
import PaginationManual from '../../../Components/Common/PaginationManual';
import { addMessage } from '../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import { builtDetailCanvasClient } from '../../../util/detailCanvasUtils';
import { fecthItem, fecthItems } from './Util/services';

const initFilter = {
	//id: '',
	callCenter: '',
	lastName: '',
	firstName: '',
	email: '',
	movil: '',
	country: '',
	state: '',
};
const initFilterModel = {
	callCenterModel: null,
};

const Lead = () => {
	document.title = 'Cliente | CRM - M4SG';
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [idItem, setIdItem] = useState(null);
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		...initFilter,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	//query to get list clients
	const {
		data: itemsData,
		error: errorItemsQuery,
		isLoading,
		isSuccess,
	} = useQuery(
		['getCustomerPaginate', queryFilter],
		() => fecthItems(queryFilter),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			staleTime: 3 * (60 * 1000),
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

	const [dataSelect, setDataSelect] = useState(initFilterModel);
	const [info, setInfo] = useState(null);
	const [filterDialog, setFilterDialog] = useState(false);
	//detail lead
	const [showDetailLead, setShowDetailLead] = useState(false);

	const toggleFilter = () => {
		setFilterDialog(!filterDialog);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Nombre',
				accessor: 'nombre',
				filterable: false,
				style: {
					cursor: 'pointer',
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
			// {
			//   Header: "Contrato",
			//   accessor: "contrato",
			//   filterable: false,
			//   style: {
			//     cursor: 'pointer',
			//   }
			// },
			{
				Header: 'País',
				accessor: 'country',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			{
				Header: 'Estado',
				accessor: 'state',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			// {
			//   Header: "Agente",
			//   accessor: "agente",
			//   filterable: false,
			//   style: {
			//     cursor: 'pointer',
			//   }
			// },
			{
				Header: 'Call Center',
				accessor: 'callcenter.name',
				filterable: false,
				style: {
					cursor: 'pointer',
				},
			},
			{
				id: 'action',
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li
								className="list-inline-item edit"
								title="Llamada"
							>
								<Link
									to="#"
									className="text-muted d-inline-block"
								>
									<i className="ri-phone-line fs-16"></i>
								</Link>
							</li>
							<li
								className="list-inline-item edit"
								title="Mensaje"
							>
								<Link
									to="#"
									className="text-muted d-inline-block"
								>
									<i className="ri-question-answer-line fs-16"></i>
								</Link>
							</li>
							<li
								className="list-inline-item edit"
								title="Correo electrónico"
							>
								<Link
									to="#"
									className="text-muted d-inline-block"
								>
									<i className="ri-mail-send-line fs-16"></i>
								</Link>
							</li>
							<li
								className="list-inline-item edit"
								title="Vista previa"
							>
								<Link
									to="#"
									className="text-muted d-inline-block"
								>
									<i
										className="ri-user-search-fill fs-16"
										onClick={() => {
											setIdItem(
												cellProps.row.original.id
											);
											//builtInfo(cellProps.row.original);
											setShowDetailLead(true);
										}}
									></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	const gotToPage = (row) => {
		navigate(`/client/1`);
	};

	const buscar = () => {
		setFilterDialog(false);
		const copyQuery = { ...query, page: 1 };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const onCleanFilter = () => {
		setFilterDialog(false);
		const copyQuery = { max: 10, page: 1, ...initFilter };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
		setDataSelect(initFilterModel);
	};

	//service to get the client
	const {
		data: itemData,
		error: errrorItem,
		isFetching: isFetchingItem,
	} = useQuery(['getCustomer', idItem], () => fecthItem(idItem), {
		enabled: idItem !== null,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (itemData && !isFetchingItem) {
			const data = builtDetailCanvasClient(itemData.data);
			setInfo(data);
		}
	}, [itemData, isFetchingItem]);

	return (
		<>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb
						title="Cliente"
						pageTitle="Inicio"
						urlPageTitle="/dashboard"
						filter={{
							allow: true,
							action: toggleFilter,
							cleanFilter: onCleanFilter,
						}}
					/>
					<Row>
						<Col xxl={12}>
							<Card id="contactList">
								<CardBody className="pt-0">
									<div>
										{!isLoading ? (
											<>
												<TableContainer
													columns={columns}
													data={
														isSuccess
															? itemsData.data
																	.list
															: []
													}
													className="custom-header-css"
													divClass="table-responsive table-card mb-3"
													tableClass="align-middle table-nowrap"
													theadClass="table-light"
													onSelectRow={gotToPage}
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
			<CrmFilter
				show={filterDialog}
				onCloseClick={() => setFilterDialog(false)}
				query={query}
				setQuery={setQuery}
				buscar={buscar}
				dataSelect={dataSelect}
				setDataSelect={setDataSelect}
				onCleanFilter={onCleanFilter}
			/>
			<DetailCanvas
				show={showDetailLead}
				onCloseClick={() => {
					setShowDetailLead(false);
				}}
				data={info}
				error={errrorItem}
				isLoading={isFetchingItem}
			/>
		</>
	);
};

export default Lead;
