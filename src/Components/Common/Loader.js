import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = ({ size = 'lg' }) => {
	return (
		<React.Fragment>
			<div className="d-flex justify-content-center mx-2 mt-2">
				<Spinner color="primary" size={size}>
					{' '}
					Loading...{' '}
				</Spinner>
			</div>
		</React.Fragment>
	);
};

export default Loader;
