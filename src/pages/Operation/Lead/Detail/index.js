import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import avatar1 from '../../../../assets/images/users/avatar-1.jpg';
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import classNames from "classnames";
import LeadInformation from "../../../../Components/Operation/Lead/Tab/LeadInformation";

const LeadProfile = () => {
    document.title="Detalle del Lead | CRM - M4S";
    const { id } = useParams();
    const [item, setItem] = useState({
        loading: true,
        data: []
    });
    const [activeTab, setActiveTab] = useState("1");

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <div className="page-content">
                <Container fluid>  
                    <BreadCrumb title="Detalle del Lead" pageTitle="Leads" />

                    <Row>
                        <Col xxl={3}>
                            <Card>
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <img src={avatar1}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile" />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Input id="profile-img-file-input" type="file"
                                                    className="profile-img-file-input" />
                                                <Label htmlFor="profile-img-file-input"
                                                    className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <h5 className="fs-16 mb-1">Anna Adame</h5>
                                        <p className="text-muted mb-0">Lead Designer / Developer</p>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Complete Your Profile</h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link to="#" className="badge bg-light text-primary fs-12"><i
                                                className="ri-edit-box-line align-bottom me-1"></i> Edit</Link>
                                        </div>
                                    </div>
                                    <div className="progress animated-progress custom-progress progress-label">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ "width": "30%" }}
                                            aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                                            <div className="label">30%</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Portfolio</h5>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <Link to="#" className="badge bg-light text-primary fs-12"><i
                                                className="ri-add-fill align-bottom me-1"></i> Add</Link>
                                        </div>
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                                <i className="ri-github-fill"></i>
                                            </span>
                                        </div>
                                        <Input type="email" className="form-control" id="gitUsername" placeholder="Username"
                                            defaultValue="@daveadame" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-primary">
                                                <i className="ri-global-fill"></i>
                                            </span>
                                        </div>
                                        <Input type="text" className="form-control" id="websiteInput"
                                            placeholder="www.example.com" defaultValue="www.velzon.com" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-success">
                                                <i className="ri-dribbble-fill"></i>
                                            </span>
                                        </div>
                                        <Input type="text" className="form-control" id="dribbleName" placeholder="Username"
                                            defaultValue="@dave_adame" />
                                    </div>
                                    <div className="d-flex">
                                        <div className="avatar-xs d-block flex-shrink-0 me-3">
                                            <span className="avatar-title rounded-circle fs-16 bg-danger">
                                                <i className="ri-pinterest-fill"></i>
                                            </span>
                                        </div>
                                        <Input type="text" className="form-control" id="pinterestName"
                                            placeholder="Username" defaultValue="Advance Dave" />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xxl={9}>
                            <Card>
                                <CardHeader>
                                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classNames({ active: activeTab === "1" })}
                                                onClick={() => {
                                                    tabChange("1");
                                                }}>
                                                Información del Lead
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "2" })}
                                                onClick={() => {
                                                    tabChange("2");
                                                }}
                                                type="button">
                                                Notas
                                            </NavLink>
                                        </NavItem>
                                        <NavItem >
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "3" })}
                                                onClick={() => {
                                                    tabChange("3");
                                                }}
                                                type="button">
                                                Referidos
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "4" })}
                                                onClick={() => {
                                                    tabChange("4");
                                                }}
                                                type="button">
                                                SMS
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "5" })}
                                                onClick={() => {
                                                    tabChange("5");
                                                }}
                                                type="button">
                                                Marketing
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "6" })}
                                                onClick={() => {
                                                    tabChange("6");
                                                }}
                                                type="button">
                                                Referidor
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classNames({ active: activeTab === "7" })}
                                                onClick={() => {
                                                    tabChange("7");
                                                }}
                                                type="button">
                                                Whatsapp
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody className="px-4 py-2">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <LeadInformation />
                                        </TabPane>
                                        <TabPane tabId="2"><h5>En desarollo</h5></TabPane>
                                        <TabPane tabId="3"><h5>En desarollo</h5></TabPane>
                                        <TabPane tabId="4"><h5>En desarollo</h5></TabPane>
                                        <TabPane tabId="5"><h5>En desarollo</h5></TabPane>
                                        <TabPane tabId="6"><h5>En desarollo</h5></TabPane>
                                        <TabPane tabId="7"><h5>En desarollo</h5></TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>            
        </>
    );
}

export default LeadProfile;