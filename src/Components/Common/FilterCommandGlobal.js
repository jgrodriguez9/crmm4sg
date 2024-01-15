import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';

const FilterCommandGlobal = ({ toggleFilter, onCleanFilter }) => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'components.filterCommandGlobal',
	});
	return (
		<div className="py-3 d-flex justify-content-end border border-dashed border-end-0 border-start-0">
			<div>
				<button className="btn btn-info me-1" onClick={toggleFilter}>
					<i className="ri-equalizer-fill me-1 align-bottom"></i>{' '}
					{t('filters')}
				</button>
				<Button
					color="danger"
					outline
					type="button"
					className="fw-500"
					onClick={onCleanFilter}
				>
					{t('cleanFilters')}
				</Button>
			</div>
		</div>
	);
};

export default FilterCommandGlobal;
