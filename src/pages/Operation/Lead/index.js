import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import CrmFilter from '../../../Components/Common/CrmFilter';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TableContainer from '../../../Components/Common/TableContainer';
import Loader from '../../../Components/Common/Loader';
import { Link } from 'react-router-dom';
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
import { clickToCall } from '../../../helpers/customer';
import { ERROR_SERVER } from '../../../Components/constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';
import { toast } from 'react-toastify';
import ClickToCallAlert from '../../../Components/Operation/Lead/ClickToCall/ClickToCallAlert';
import CardHeaderGlobal from '../../../Components/Common/CardHeaderGlobal';
import FilterCommandGlobal from '../../../Components/Common/FilterCommandGlobal';
import BasicModal from '../../../Components/Common/BasicModal';
import FormClient from '../../../Components/Operation/Lead/Tab/LeadInformation/FormClient';
import ErrorBoundary from '../../../Components/Common/ErrorBoundary';

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
	const [idItem, setIdItem] = useState(null);
	const [showModal, setShowModal] = useState(false);
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
					width: '18%',
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
								<Link
									to={`/client/${contact.row.original.id}`}
									className="link-primary link-offset-2 text-decoration-underline link-underline-opacity-25 link-underline-opacity-100-hover"
								>
									{`${contact.row.original.firstName} ${
										contact.row.original.lastName ?? ''
									}`}
								</Link>
							</div>
						</div>
					</>
				),
			},
			{
				Header: 'Id Booking',
				accessor: 'booking',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'Call Center',
				accessor: 'callcenter.name',
				filterable: false,
				style: {
					width: '14%',
				},
			},
			{
				Header: 'Campaña',
				accessor: 'campana',
				filterable: false,
				style: {
					width: '14%',
				},
			},
			{
				Header: 'Edad titular',
				accessor: 'age',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				Header: 'País',
				accessor: 'country',
				filterable: false,
				style: {
					width: '9%',
				},
			},
			{
				Header: 'Vendedor',
				accessor: 'userName',
				filterable: false,
				style: {
					width: '9%',
				},
			},
			{
				Header: 'Estatus',
				accessor: 'status',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				id: 'action',
				style: {
					width: '6%',
				},
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
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

	const onHandleClickToCall = async (phoneType) => {
		toast(<ClickToCallAlert />, {
			autoClose: false,
			position: 'top-left',
		});
		try {
			// const body = {
			// 	customerId: data.id,
			// 	//option: phoneType
			// 	//extension: '?'
			// };
			//test
			let formdata = new FormData();
			formdata['customerId'] = 930706;
			const response = await clickToCall(formdata, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response);
		} catch (error) {
			let message = ERROR_SERVER;
			message = extractMeaningfulMessage(error, message);
			dispatch(
				addMessage({
					message: message,
					type: 'error',
				})
			);
		}
	};

	useEffect(() => {
		if (itemData && !isFetchingItem) {
			const data = builtDetailCanvasClient(
				itemData.data,
				onHandleClickToCall
			);
			setInfo(data);
		}
	}, [itemData, isFetchingItem]);

	const toggleDialog = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div className="page-content">
				<Container fluid>
					<Row>
						<Col xxl={12}>
							<Card className="shadow">
								<CardHeaderGlobal
									title={'Cliente'}
									add={{
										action: toggleDialog,
										title: 'Crear cliente',
									}}
								/>
								<CardBody className="pt-0">
									<FilterCommandGlobal
										toggleFilter={toggleFilter}
										onCleanFilter={onCleanFilter}
									/>
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
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title="Agregar cliente"
				size="xl"
				classBody="py-1 px-3"
				children={<FormClient toggleDialog={toggleDialog} />}
			/>
		</>
	);
};

export default Lead;
