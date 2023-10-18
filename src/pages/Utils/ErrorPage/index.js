import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import config from '../../../../package.json';

const ErrorPage = () => {
	document.title = 'Error | CRM M4S';

	return (
		<React.Fragment>
			<div className="auth-page-wrapper pt-5">
				<Container>
					<Row>
						<Col lg={12}>
							<div className="text-center mt-sm-5 pt-4 mb-4">
								<div className="mb-5">
									<h1 className="display-2 text-danger">
										Ocurrió un error por favor contacte al
										administrador
									</h1>
								</div>
							</div>
						</Col>
					</Row>
				</Container>

				<footer className="footer">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="text-center">
									<p className="mb-0 text-muted">
										&copy; {new Date().getFullYear()}{' '}
										Desarrollado por Byte Solutions
									</p>
								</div>
								<div className="text-center text-muted">
									<small>v.{config.version}</small>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</React.Fragment>
	);
};

export default ErrorPage;
