import { Card, CardBody } from 'reactstrap';

const Widget = ({ widget }) => {
	return (
		<Card className="card-animate overflow-hidden">
			<div className="position-absolute start-0" style={{ zIndex: '0' }}>
				<svg
					version="1.2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 200 120"
					width="200"
					height="120"
				>
					<path
						id="Shape 8"
						style={{ opacity: '.05', fill: '#0ab39c' }}
						d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
					/>
				</svg>
			</div>
			<CardBody style={{ zIndex: '1' }}>
				<div className="d-flex align-items-center">
					<div className="flex-grow-1 overflow-hidden">
						<p className="text-uppercase fw-medium text-muted text-truncate mb-3">
							{' '}
							{widget.label}
						</p>
						<h4 className="fs-22 fw-semibold ff-secondary mb-0">
							<span
								className={`counter-value ${widget.countClass}`}
								data-target="36894"
							>
								{widget.count}
							</span>
						</h4>
					</div>
					<div className="flex-shrink-0">
						<i className={widget.iconClass} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default Widget;
