import { useMemo } from 'react';
import TableContainer from '../../../../Common/TableContainer';
import { Link } from 'react-router-dom';
import {
	classBadgeStatusEmail,
	parseTextStatusMail,
} from '../../../../../util/utilStatusEmail';
import { useTranslation } from 'react-i18next';

const TableMarketingMailClient = ({ builtInfo }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.tableMarketingMailClient',
	});

	const columns = useMemo(
		() => [
			{
				Header: t('template'),
				accessor: 'template',
				filterable: false,
				style: {
					width: '30%',
				},
			},
			{
				Header: t('topic'),
				accessor: 'subject',
				filterable: false,
				style: {
					width: '20%',
				},
			},
			{
				Header: t('status'),
				accessor: 'status',
				filterable: false,
				Cell: ({ value }) => (
					<span className={`badge ${classBadgeStatusEmail(value)}`}>
						{parseTextStatusMail(value)}
					</span>
				),
				style: {
					width: '10%',
					textAlign: 'center',
				},
			},
			{
				Header: t('date'),
				accessor: 'date',
				filterable: false,
				style: {
					width: '10%',
				},
			},
			{
				id: 'action',
				style: {
					width: '10%',
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
										className="ri-file-search-fill fs-16"
										onClick={() => {
											const itemData =
												cellProps.row.original;
											builtInfo(itemData);
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

	return (
		<div>
			<TableContainer
				columns={columns}
				data={[]}
				isGlobalFilter={false}
				isAddUserList={false}
				customPageSize={8}
				className="custom-header-css"
				divClass="table-responsive table-card mb-3"
				tableClass="align-middle table-nowrap"
				theadClass="table-light"
				isContactsFilter={true}
				SearchPlaceholder={`${t('search')}...`}
			/>
		</div>
	);
};

export default TableMarketingMailClient;
