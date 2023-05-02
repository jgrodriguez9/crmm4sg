import React from 'react'
import { Col, Container,Row } from 'reactstrap'
import ParticlesAuth from "../../../pages/AuthenticationInner/ParticlesAuth";

//import images
import comingsoon from '../../../assets/images/comingsoon.png';

const ComingSoon = () => {

document.title ="Coming Soon | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>            
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 pt-4 mb-4">
                                    <div className="mb-sm-5 pb-sm-4 pb-5">
                                        <img src={comingsoon} alt="" height="120" className="move-animation" />
                                    </div>
                                    <div className="mb-5">
                                        <h1 className="display-2 coming-soon-text">Coming Soon</h1>
                                    </div>                                    
                                </div>
                            </Col>
                        </Row>

                    </Container>

                </div>
            </ParticlesAuth>
        </React.Fragment>
    )
}

export default ComingSoon