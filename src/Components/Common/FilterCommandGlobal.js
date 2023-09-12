import { Button } from 'reactstrap';

const FilterCommandGlobal = ({ toggleFilter, onCleanFilter }) => {
	return (
		<div className="py-3 d-flex justify-content-end border border-dashed border-end-0 border-start-0">
			<div>
				<button className="btn btn-info me-1" onClick={toggleFilter}>
					<i className="ri-equalizer-fill me-1 align-bottom"></i>{' '}
					Filtros
				</button>
				<Button
					color="danger"
					outline
					type="button"
					className="fw-500"
					onClick={onCleanFilter}
				>
					Limpiar filtros
				</Button>
			</div>
		</div>
	);
};

export default FilterCommandGlobal;
