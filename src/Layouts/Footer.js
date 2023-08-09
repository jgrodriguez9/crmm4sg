import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import config from '../../package.json';

const Footer = () => {
	return (
		<React.Fragment>
			<footer className="footer">
				<Container fluid>
					<Row>
						<Col sm={6}>
							{new Date().getFullYear()} © CRM. Dearrollado por
							Byte Solutions
						</Col>
						<Col sm={6}>
							<div className="text-sm-end d-none d-sm-block">
								v.{config.version}
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</React.Fragment>
	);
};

export default Footer;
