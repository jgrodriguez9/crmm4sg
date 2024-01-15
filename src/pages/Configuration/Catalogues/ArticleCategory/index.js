import { Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

//Import actions
import {
	deleteCategoryArticles,
	getCategoryArticlesPaginate,
} from '../../../../helpers/catalogues/categoryArticles';
import FormCategoriaArticles from '../../../../Components/Configuration/Catalogue/CategoriaArticles/FormCategoriaArticles';
import parseObjectToQueryUrl from '../../../../util/parseObjectToQueryUrl';
import { useMutation, useQuery } from 'react-query';
import { addMessage } from '../../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import {
	deleteIconClass,
	editIconClass,
} from '../../../../Components/constants/icons';
import moment from 'moment';
import { DATE_FORMAT } from '../../../../common/globalsProp';
import CellActions from '../../../../Components/Common/CellActions';
import {
	DELETE_SUCCESS,
	ERROR_SERVER,
} from '../../../../Components/constants/messages';
import extractMeaningfulMessage from '../../../../util/extractMeaningfulMessage';
import CardHeaderGlobal from '../../../../Components/Common/CardHeaderGlobal';
import PaginationManual from '../../../../Components/Common/PaginationManual';
import DeleteModal from '../../../../Components/Common/DeleteModal';
import BasicModal from '../../../../Components/Common/BasicModal';
import TableContainer from '../../../../Components/Common/TableContainer';
import Loader from '../../../../Components/Common/Loader';
import { useTranslation } from 'react-i18next';

const initFilter = {
	name: '',
};

const ArticleCategory = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'pages.articleCategory.list',
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
		['getCategoryArticlesPaginate', queryFilter],
		() => getCategoryArticlesPaginate(queryFilter),
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
		const copyQuery = { ...query, page: 1, name: parameter };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const editItem = (row) => {
		const { original } = row;
		setItem({
			id: original.id ?? '',
			name: original.name ?? '',
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
			click: editItem,
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
				Header: t('name'),
				accessor: 'name',
				filterable: false,
				style: {
					width: '60%',
				},
			},
			{
				Header: t('creationDate'),
				accessor: 'dateCreated',
				filterable: false,
				style: {
					width: '35%',
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
	const createItem = () => {
		setItem(null);
		toggleDialog();
	};

	const {
		mutate: deleteItem,
		isLoading: isDeleting,
		isError: isErrorDelete,
		error: errorDelete,
		isSuccess: isDeleted,
	} = useMutation(deleteCategoryArticles);
	useEffect(() => {
		if (isDeleted) {
			refetch();
			setShowDeleteDialog(false);
			dispatch(
				addMessage({
					message: DELETE_SUCCESS,
					type: 'success',
				})
			);
		} else if (isErrorDelete) {
			let message = ERROR_SERVER;
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
			id: item.id,
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
									title={t('articleCategory')}
									add={{
										action: createItem,
										title: t('createArticleCategory'),
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
				title={`${
					item?.id
						? t('editArticleCategory')
						: t('newArticleCategory')
				}`}
				size="lg"
				children={
					<FormCategoriaArticles
						item={item}
						toggleModal={toggleDialog}
						refetch={refetch}
					/>
				}
			/>
		</>
	);
};

export default ArticleCategory;
