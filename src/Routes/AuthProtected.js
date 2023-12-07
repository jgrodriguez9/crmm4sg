import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { setAuthorization } from '../helpers/api_helper';
import { useDispatch, useSelector } from 'react-redux';

import { useProfile } from '../Components/Hooks/UserHooks';
import { logoutUser } from '../slices/thunks';
import { ToastContainer, toast } from 'react-toastify';
import { clearMessage } from '../slices/messages/reducer';

const AuthProtected = (props) => {
	const dispatch = useDispatch();
	const { userProfile, loading, token } = useProfile();
	const { type, message } = useSelector((state) => state.Messages);

	useEffect(() => {
		if (userProfile && !loading && token) {
			setAuthorization(token);
		} else if (!userProfile && loading && !token) {
			dispatch(logoutUser());
		}
	}, [token, userProfile, loading, dispatch]);

	useEffect(() => {
		if (type) {
			switch (type) {
				case 'success':
					toast.success(message, {
						onClose: () => {
							dispatch(clearMessage());
						},
					});
					break;
				case 'error':
					toast.error(message, {
						onClose: () => {
							dispatch(clearMessage());
						},
					});
					break;
				case 'warning':
					toast.warning(message, {
						onClose: () => {
							dispatch(clearMessage());
						},
					});
					break;
				case 'info':
					toast.info(message, {
						onClose: () => {
							dispatch(clearMessage());
						},
					});
					break;
				default:
					return;
			}
		}
	}, [type, message, dispatch]);

	/*
    Navigate is un-auth access protected routes via url
    */

	if (!userProfile && loading && !token) {
		return (
			<Navigate
				to={{ pathname: '/login', state: { from: props.location } }}
			/>
		);
	}

	return (
		<>
			{props.children}
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="colored"
			/>
		</>
	);
};

const AccessRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return (
					<>
						{' '}
						<Component {...props} />{' '}
					</>
				);
			}}
		/>
	);
};

export { AuthProtected, AccessRoute };
