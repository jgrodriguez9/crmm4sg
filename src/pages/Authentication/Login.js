import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import logoLight from "../../assets/images/logo-light.png";
import { loginUser } from '../../slices/auth/login/thunk';
//import images

const Login = (props) => {
    const dispatch = useDispatch();
    const { user, error, loading, errorMsg } = useSelector(state => ({
        user: state.Login.user,
        error: state.Login.error,
        loading: state.Login.loading,
        errorMsg: state.Login.errorMsg,
    }));

    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);

    useEffect(() => {
        if (user && user) {
            setUserLogin({
                email: user.user.email,
                password: user.user.confirm_password
            });
        }
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || "admin@admin.com" || '',
            password: userLogin.password || "123456" || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            //submit request
            console.log(values)
            sessionStorage.setItem("authUser", JSON.stringify({"status":"success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTliZWZjOWUzZGJjNWJhOWE0NzA4NyIsImlhdCI6MTY4MjYxNzQ3MCwiZXhwIjoxNjkwMzkzNDcwfQ.5Y7FjIcxYL6yUkFjYzhd3kvFcCeOWRzuDiSUprDksAQ","data":{"_id":"63e9befc9e3dbc5ba9a47087","first_name":"risso","last_name":"Mohammadi","email":"admin@themesbrand.com","phone":93353299096,"image":"","password":"$2a$12$OdX.AB8Oiz6PEXohnREMjOtIy8h4/Ha3wPMHVcA/J373tQ0afoco2","role":"0","confirm_password":"123456789","changePasswordAt":"2023-02-13T04:32:11.228Z","skills":["Photoshop","illustrator","HTML","CSS","Javascript","Php","Python"],"exp_year":["2018-01-01T00:00:00.000Z","2023-01-01T00:00:00.000Z"],"__v":0,"city":"California","company_name":"Themesbrand","country":"use","designation":"Lead Designer / Developer","job_title":"Developer","joining_date":"2023-01-01T00:00:00.000Z","website":"www.velzon.com","zipcode":"90011","description":"tehran","job_description":"You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. ","portfolio":[{"logo":"github","bg_color":"dark","link":"@daveadame","_id":"63eb4c2f356e48830e807dba"},{"logo":"global","bg_color":"primary","link":"www.velzon.com","_id":"63eb4c2f356e48830e807dbb"},{"logo":"dribbble","bg_color":"success","link":"@dave_adame","_id":"63eb4c2f356e48830e807dbc"},{"logo":"pinterest","bg_color":"danger","link":"Advance Dave","_id":"63eb4c2f356e48830e807dbd"}],"passwordtoken":"7f509dc18f2da94f0e367da9d8b49d625ba608f77e58f884639a71f47d5aae87","passwordtokenexp":"2023-02-21T12:34:15.964Z"}}));
            props.router.navigate("/dashboard")
            //dispatch(loginUser(values, props.router.navigate));
        }
    });

    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                //dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);

    document.title = "Iniciar sesión | CRM - M4S";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="100" />
                                        </Link>
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <p className="text-muted">Iniciar sesión para continuar en CRM - M4S.</p>
                                        </div>
                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Usuario</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            validation.touched.email && validation.errors.email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="password-input">Contraseña</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.password && validation.errors.password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>                                               

                                                <div className="mt-4">
                                                    <Button color="success" disabled={error ? null : loading ? true : false} className="btn btn-success w-100" type="submit">
                                                        {loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null}
                                                        Iniciar sesión
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>                              

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);