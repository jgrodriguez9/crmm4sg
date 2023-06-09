import { useState } from "react";
import { useParams } from "react-router-dom";
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
                                        <h5 className="fs-16 mb-1">Daniel Maximiliano</h5>
                                        <p className="text-muted mb-0">Jesus Enrique</p>
                                        <p className="text-muted mb-0">Amigo(a)</p>
                                        <p className="text-muted mb-0">MIN, USA</p>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Cuenta</h5>
                                        </div>
                                    </div>
                                    <div className="table-card">
                                        <table className="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className="fw-medium">Contrato</td>
                                                    <td>REF 496615</td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-medium">Booking</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-medium">Membresía</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td className="fw-medium">Certificado</td>
                                                    <td></td>
                                                </tr>                                                                                           
                                            </tbody>
                                        </table>
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