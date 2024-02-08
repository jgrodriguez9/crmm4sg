import { Badge, Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TableContainer from '../../../Components/Common/TableContainer';
import Loader from '../../../Components/Common/Loader';
import { useEffect } from 'react';

//Import actions
import parseObjectToQueryUrl from '../../../util/parseObjectToQueryUrl';
import { useMutation, useQuery } from 'react-query';
import PaginationManual from '../../../Components/Common/PaginationManual';
import { addMessage } from '../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';
import CardHeaderGlobal from '../../../Components/Common/CardHeaderGlobal';
import {
	deleteArticle,
	getArticlePaginate,
} from '../../../helpers/configuration/article';
import CellActions from '../../../Components/Common/CellActions';
import {
	deleteIconClass,
	editIconClass,
} from '../../../Components/constants/icons';
import moment from 'moment';
import { DATE_FORMAT } from '../../../common/globalsProp';
import BasicModal from '../../../Components/Common/BasicModal';
import FormArticle from '../../../Components/Configuration/Article/FormArticle';
import DeleteModal from '../../../Components/Common/DeleteModal';
import {
	DELETE_SUCCESS,
	ERROR_SERVER,
} from '../../../Components/constants/messages';
import extractMeaningfulMessage from '../../../util/extractMeaningfulMessage';
import { useTranslation } from 'react-i18next';

const initFilter = {
	parameter: '',
};

const Article = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.article.list',
	});
	const { t: tMessage } = useTranslation('translation', {
		keyPrefix: 'messages',
	});
	document.title = t('header');
	const dispatch = useDispatch();
	const [item, setItem] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [parameter, setParameter] = useState('');
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		...initFilter,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	//query to get list
	const {
		data: itemsData,
		error: errorItemsQuery,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery(
		['getArticlePaginate', queryFilter],
		() => getArticlePaginate(queryFilter),
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
		const copyQuery = { ...query, page: 1, parameter: parameter };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const editPax = (row) => {
		const { original } = row;
		setItem({
			id: original.id ?? '',
			title: original.title ?? '',
			description: original.description ?? '',
			url: original.url ?? '',
			category: original.category ?? '',
			departments: original.departments ?? [],
		});
		setShowModal(true);
	};
	const showDialogDelete = (row) => {
		setShowDeleteDialog(true);
		const { original } = row;
		setItem({ id: original.id });
	};

	const actions = [
		{
			iconClass: `${editIconClass} fs-5 text-primary`,
			click: editPax,
			labelTooltip: t('edit'),
		},
		{
			iconClass: `${deleteIconClass} fs-5 text-danger`,
			click: showDialogDelete,
			labelTooltip: t('delete'),
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: t('title'),
				accessor: 'title',
				filterable: false,
				style: {
					width: '35%',
				},
			},
			{
				Header: t('category'),
				accessor: 'category.name',
				filterable: false,
				style: {
					width: '20%',
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
					width: '15%',
				},
				Cell: ({ value }) =>
					moment(value, 'YYYY-MM-DD').format(DATE_FORMAT),
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

	const {
		mutate: deleteItem,
		isLoading: isDeleting,
		isError: isErrorDelete,
		error: errorDelete,
		isSuccess: isDeleted,
	} = useMutation(deleteArticle);
	useEffect(() => {
		if (isDeleted) {
			refetch();
			setShowDeleteDialog(false);
			dispatch(
				addMessage({
					message: tMessage(DELETE_SUCCESS),
					type: 'success',
				})
			);
		} else if (isErrorDelete) {
			let message = tMessage(ERROR_SERVER);
			message = extractMeaningfulMessage(errorDelete, message);
			dispatch(
				addMessage({
					message: message,
					type: 'error',
				})
			);
		}
	}, [dispatch, errorDelete, isDeleted, isErrorDelete, refetch]);

	const handleDelete = async () => {
		const dataToDelete = {
			articleId: item.id,
		};
		deleteItem(dataToDelete);
	};

	return (
		<>
			<div className="page-content">
				<Container fluid>
					<Row>
						<Col xxl={12}>
							<Card className="shadow">
								<CardHeaderGlobal
									title={t('article')}
									add={{
										action: crearArticulo,
										title: t('createArticle'),
									}}
								/>
								<CardBody className="pt-0">
									<div className="py-3 d-flex justify-content-end border border-dashed border-end-0 border-start-0">
										<div className="position-relative">
											<Input
												type="text"
												className="form-control me-1"
												placeholder={`${t(
													'search'
												)}...`}
												id="search-options"
												value={parameter}
												onChange={(e) =>
													setParameter(e.target.value)
												}
											/>
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
			<DeleteModal
				handleDelete={handleDelete}
				show={showDeleteDialog}
				setShow={setShowDeleteDialog}
				isDeleting={isDeleting}
			/>
			<BasicModal
				open={showModal}
				setOpen={setShowModal}
				title={`${item?.id ? t('editArticle') : t('newArticle')}`}
				size="lg"
				children={
					<FormArticle
						item={item}
						toggleModal={toggleDialog}
						refetch={refetch}
					/>
				}
			/>
		</>
	);
};

export default Article;
