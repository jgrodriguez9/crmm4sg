import React from 'react';
import ParticlesAuth from '../../AuthenticationInner/ParticlesAuth';
import { Col, Container, Row } from 'reactstrap';

const ErrorPage = () => {
	document.title = 'Error | CRM M4S';

	return (
		<React.Fragment>
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mt-sm-5 pt-4 mb-4">
									<div className="mb-5">
										<h1 className="display-2 coming-soon-text">
											Ocurrió un error por favor contacte
											al administrador
										</h1>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</ParticlesAuth>
		</React.Fragment>
	);
};

export default ErrorPage;
