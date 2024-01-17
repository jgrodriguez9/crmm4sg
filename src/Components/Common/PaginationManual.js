import { Button, Col, Input, Row, Spinner } from 'reactstrap';
import parseObjectToQueryUrl from '../../util/parseObjectToQueryUrl';
import { useTranslation } from 'react-i18next';

const PaginationManual = ({
	query,
	setQuery,
	setQueryFilter,
	totalPages,
	isLoading = false,
}) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.paginationManual',
	});
	const onChangeInInput = (event) => {
		const page = event.target.value ? Number(event.target.value) : 1;
		const copyQuery = { ...query };
		copyQuery.page = page;
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const goPrev = (page) => {
		const copyQuery = { ...query };
		copyQuery.page = page;
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	const goNext = (page) => {
		const copyQuery = { ...query };
		copyQuery.page = page;
		setQueryFilter(parseObjectToQueryUrl(copyQuery));
		setQuery(copyQuery);
	};

	return (
		<Row className="justify-content-md-end justify-content-center align-items-center p-1 fs-7">
			{isLoading && (
				<Col className="col-md-auto">
					<Spinner color="primary"> Loading... </Spinner>
				</Col>
			)}
			<Col className="col-md-auto">
				<div className="d-flex gap-1">
					<Button
						color="primary"
						size="sm"
						onClick={() => goPrev(query.page - 1)}
						disabled={query.page === 1}
					>
						{'<'}
					</Button>
				</div>
			</Col>
			<Col className="col-md-auto d-none d-md-block">
				{t('page')}{' '}
				<strong>
					{query.page} {t('from')} {totalPages}
				</strong>
			</Col>
			<Col className="col-md-auto">
				<Input
					type="number"
					min={1}
					style={{ width: 70 }}
					max={totalPages}
					defaultValue={query.page}
					onChange={onChangeInInput}
					size="sm"
				/>
			</Col>

			<Col className="col-md-auto">
				<div className="d-flex gap-1">
					<Button
						color="primary"
						size="sm"
						onClick={() => goNext(query.page + 1)}
						disabled={query.page === totalPages}
					>
						{'>'}
					</Button>
				</div>
			</Col>
		</Row>
	);
};

export default PaginationManual;
