import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { getEventsLogs, getLogsClients } from '../../../../helpers/logsClient';
import { useEffect, useMemo, useState } from 'react';
import parseObjectToQueryUrl from '../../../../util/parseObjectToQueryUrl';
import { addMessage } from '../../../../slices/messages/reducer';
import showFriendlyMessafe from '../../../../util/showFriendlyMessafe';
import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../common/globalsProp';
import { Badge, Button, Col, Row } from 'reactstrap';
import TableContainer from '../../../Common/TableContainer';
import PaginationManual from '../../../Common/PaginationManual';
import Loader from '../../../Common/Loader';
import DatePicker from '../../../Common/DatePicker';
import Select from 'react-select';
import useUser from '../../../../hooks/useUser';
import { getAgentsBySupervisor } from '../../../../helpers/customer';

const initFilter = {
	userName: '',
	event: '',
	insertDateStart: '',
	insertDateEnd: '',
};

const LogsClient = ({ customerId }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.operation.LogsClient',
	});
	const user = useUser();
	const dispatch = useDispatch();
	const [query, setQuery] = useState({
		max: 10,
		page: 1,
		customerId,
		...initFilter,
	});
	const [queryFilter, setQueryFilter] = useState(
		parseObjectToQueryUrl(query)
	);
	const [event, setEvent] = useState(null);
	const [userName, setUserName] = useState(null);

	const { data, error, isLoading, isSuccess, isFetching } = useQuery(
		['getLogsClients', queryFilter],
		async () => {
			const response = await getLogsClients(queryFilter);
			return response;
		},
		{
			keepPreviousData: true,
		}
	);

	//events
	const { data: actionsOpt } = useQuery(
		['getEventsLogs'],
		() => getEventsLogs(),
		{
			select: (data) =>
				data.data?.historyLogsList.map((item) => ({
					value: item.key,
					label: item.value,
				})) ?? [],
		}
	);
	//agents
	const { data: agentsOpt } = useQuery(
		['getAgentsBySupervisor', user.usuario],
		() => getAgentsBySupervisor(user.usuario),
		{
			enabled: user !== null,
			select: (result) =>
				result.data.list.map((it) => ({
					value: it.id,
					label: it.id,
				})) ?? [],
		}
	);

	useEffect(() => {
		if (error?.code) {
			dispatch(
				addMessage({
					message: showFriendlyMessafe(error?.code),
					type: 'error',
				})
			);
		}
	}, [error, dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: t('description'),
				accessor: 'content',
				filterable: false,
				style: {
					width: '55%',
				},
			},
			{
				Header: t('action'),
				accessor: 'event',
				filterable: false,
				style: {
					width: '20%',
				},
				Cell: ({ value }) => (
					<Badge color="light" className="text-dark">
						{t(value)}
					</Badge>
				),
			},
			{
				Header: t('date'),
				accessor: 'eventDate',
				filterable: false,
				style: {
					width: '15%',
				},
				Cell: ({ value }) =>
					value
						? moment(value, 'YYY-MM-DDTHH:mm').format(
								DATE_TIME_FORMAT
						  )
						: '',
			},
			{
				Header: t('user'),
				accessor: 'userName',
				filterable: false,
				style: {
					width: '10%',
				},
			},
		],
		[t]
	);

	const buscar = () => {
		console.log(query);
		const copyQuery = { ...query, page: 1 };
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	return (
		<div>
			{!isLoading ? (
				<>
					<Row className="mt-2">
						<Col xs="12" md={3}>
							<div className="input-group">
								<DatePicker
									id="dateStart"
									className="form-control"
									date={
										query.insertDateStart
											? moment(
													query.insertDateStart,
													'YYYY-MM-DD'
											  ).format(DATE_FORMAT)
											: ''
									}
									onChangeDate={(value) => {
										if (value.length > 0) {
											setQuery((prev) => ({
												...prev,
												insertDateStart: moment(
													value[0]
												).format('YYYY-MM-DD'),
											}));
										} else {
											setQuery((prev) => ({
												...prev,
												insertDateStart: '',
											}));
										}
									}}
									placeholder={t('dateStart')}
									onClose={(selectedDates) => {
										if (selectedDates.length === 0)
											setQuery((prev) => ({
												...prev,
												insertDateStart: '',
											}));
									}}
								/>
								<div className="input-group-text bg-light text-dark">
									<i className="ri-calendar-2-line"></i>
								</div>
							</div>
						</Col>
						<Col xs="12" md={3}>
							<div className="input-group">
								<DatePicker
									id="dateEnd"
									className="form-control"
									date={
										query.insertDateEnd
											? moment(
													query.insertDateEnd,
													'YYYY-MM-DD'
											  ).format(DATE_FORMAT)
											: ''
									}
									onChangeDate={(value) => {
										if (value.length > 0) {
											setQuery((prev) => ({
												...prev,
												insertDateEnd: moment(
													value[0]
												).format('YYYY-MM-DD'),
											}));
										} else {
											setQuery((prev) => ({
												...prev,
												insertDateEnd: '',
											}));
										}
									}}
									placeholder={t('dateEnd')}
									onClose={(selectedDates) => {
										if (selectedDates.length === 0)
											setQuery((prev) => ({
												...prev,
												insertDateEnd: '',
											}));
									}}
								/>
								<div className="input-group-text bg-light text-dark">
									<i className="ri-calendar-2-line"></i>
								</div>
							</div>
						</Col>
						<Col xs="12" md={3}>
							<Select
								id="event"
								className="mb-0"
								value={event}
								onChange={(value) => {
									setQuery((prev) => ({
										...prev,
										event: value?.value ?? '',
									}));
									setEvent(value);
								}}
								options={actionsOpt}
								isClearable
								placeholder={t('selectAction')}
							/>
						</Col>
						<Col xs="12" md={3}>
							<Select
								id="event"
								className="mb-0"
								value={userName}
								onChange={(value) => {
									setQuery((prev) => ({
										...prev,
										userName: value?.value ?? '',
									}));
									setUserName(value);
								}}
								options={agentsOpt}
								isClearable
								placeholder={t('selectUser')}
							/>
						</Col>
					</Row>
					<div className="d-flex justify-content-end mt-2">
						<Button
							color="success"
							type="submit"
							size="sm"
							className="fw-500"
							onClick={buscar}
						>
							{t('search')}
						</Button>
					</div>
					<hr />
					<TableContainer
						columns={columns}
						data={isSuccess ? data?.data?.list ?? [] : []}
						className="custom-header-css"
						divClass="table-responsive mb-3"
						tableClass="align-middle table-wrap"
						theadClass=""
					/>
					<PaginationManual
						query={query}
						setQuery={setQuery}
						setQueryFilter={setQueryFilter}
						totalPages={data?.data?.pagination?.totalPages ?? 1}
						showTotal={true}
						totalCount={data?.data?.pagination?.totalCount ?? 0}
						isLoading={isFetching}
					/>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default LogsClient;
