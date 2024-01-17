import React, { useState } from 'react';
import {
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Label,
	Row,
	Button,
	Form,
	FormFeedback,
	Alert,
	Spinner,
} from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import withRouter from '../../Components/Common/withRouter';
// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import logoLight from '../../assets/images/logo-light.png';
import { authentication, loginUser } from '../../slices/auth/login/thunk';
import { useTranslation } from 'react-i18next';
//import images

const Login = (props) => {
	const dispatch = useDispatch();
	const { t } = useTranslation('translation', { keyPrefix: 'pages.login' });
	const { t: tMessage } = useTranslation();
	const { error, loading, errorMsg } = useSelector((state) => ({
		error: state.Login.error,
		loading: state.Login.loading,
		errorMsg: state.Login.errorMsg,
	}));

	const [passwordShow, setPasswordShow] = useState(false);

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			email: 'AGENTE_RVAS', //'anescolarde',
			password: 'he4ZfRc@IGA8#', //'zNiQ9i0CpR#FY2#zs',
		},
		validationSchema: Yup.object({
			email: Yup.string().required(t('usernameRequire')),
			password: Yup.string().required(t('passwordRequire')),
		}),
		onSubmit: (values) => {
			//submit request
			//dispatch(loginUser(values, props.router.navigate));
			dispatch(authentication(values, props.router.navigate));
		},
	});

	document.title = t('header');
	return (
		<React.Fragment>
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mt-sm-5 mb-4 text-white-50">
									<div>
										<Link
											to="/"
											className="d-inline-block auth-logo"
										>
											<img
												src={logoLight}
												alt=""
												height="100"
											/>
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
											<p className="text-muted">
												{t('title')}
											</p>
										</div>
										{errorMsg ? (
											<Alert color="danger">
												{tMessage(error)}
											</Alert>
										) : null}
										<div className="p-2 mt-4">
											<Form
												onSubmit={(e) => {
													e.preventDefault();
													validation.handleSubmit();
													return false;
												}}
												action="#"
											>
												<div className="mb-3">
													<Label
														htmlFor="email"
														className="form-label"
													>
														{t('user')}
													</Label>
													<Input
														name="email"
														className="form-control"
														placeholder="Usuario"
														type="text"
														onChange={
															validation.handleChange
														}
														onBlur={
															validation.handleBlur
														}
														value={
															validation.values
																.email || ''
														}
														invalid={
															validation.touched
																.email &&
															validation.errors
																.email
																? true
																: false
														}
													/>
													{validation.touched.email &&
													validation.errors.email ? (
														<FormFeedback type="invalid">
															{
																validation
																	.errors
																	.email
															}
														</FormFeedback>
													) : null}
												</div>

												<div className="mb-3">
													<Label
														className="form-label"
														htmlFor="password-input"
													>
														{t('password')}
													</Label>
													<div className="position-relative auth-pass-inputgroup mb-3">
														<Input
															name="password"
															value={
																validation
																	.values
																	.password ||
																''
															}
															type={
																passwordShow
																	? 'text'
																	: 'password'
															}
															className="form-control pe-5"
															placeholder="Enter Password"
															onChange={
																validation.handleChange
															}
															onBlur={
																validation.handleBlur
															}
															invalid={
																validation
																	.touched
																	.password &&
																validation
																	.errors
																	.password
																	? true
																	: false
															}
														/>
														{validation.touched
															.password &&
														validation.errors
															.password ? (
															<FormFeedback type="invalid">
																{
																	validation
																		.errors
																		.password
																}
															</FormFeedback>
														) : null}
														<button
															className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
															type="button"
															id="password-addon"
															onClick={() =>
																setPasswordShow(
																	!passwordShow
																)
															}
														>
															<i className="ri-eye-fill align-middle"></i>
														</button>
													</div>
												</div>

												<div className="mt-4">
													<Button
														color="success"
														disabled={
															error
																? null
																: loading
																? true
																: false
														}
														className="btn btn-success w-100"
														type="submit"
													>
														{loading ? (
															<Spinner
																size="sm"
																className="me-2"
															>
																{' '}
																{t('loading')}
																...{' '}
															</Spinner>
														) : null}
														{t('login')}
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
