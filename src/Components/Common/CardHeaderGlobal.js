import { CardHeader } from 'reactstrap';

const CardHeaderGlobal = ({
	title = 'Listado',
	add = null,
	extraActions = [],
}) => {
	return (
		<CardHeader className="border-0">
			<div className="d-flex align-items-center">
				<h5 className="card-title mb-0 flex-grow-1">{title}</h5>
				{extraActions.map((it, idx) => (
					<div key={`extra-action-${it.id}`}>{it.children}</div>
				))}
				{add && (
					<div className="flex-shrink-0">
						<div className="d-flex gap-2 flex-wrap">
							<button
								className="btn btn-primary"
								onClick={add.action}
							>
								<i className="ri-add-fill me-1 align-bottom"></i>{' '}
								{add.title}
							</button>
						</div>
					</div>
				)}
			</div>
		</CardHeader>
	);
};

export default CardHeaderGlobal;
