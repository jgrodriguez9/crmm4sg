//Include Both Helper File with needed methods
import { authData } from '../../../common/authData';
import { loginService, postLogin } from '../../../helpers/auth';
import { decrypData, encryptData } from '../../../util/crypto';

import {
	loginSuccess,
	logoutUserSuccess,
	apiError,
	reset_login_flag,
	proccessLogin,
} from './reducer';
import showFriendlyMessafe from '../../../util/showFriendlyMessafe';

export const authentication = (user, history) => async (dispatch) => {
	try {
		dispatch(proccessLogin());
		const response = loginService({
			username: user.email,
			password: user.password,
		});

		var data = await response;
		const result = await data.json();
		console.log(result);
		if (result.activo) {
			//test until api is working good
			//const encryptedData = encryptData(JSON.stringify(authData));
			const encryptedData = encryptData(JSON.stringify(result));
			localStorage.setItem('authenticatication-crm', encryptedData);
			const descryptedData = decrypData(encryptedData);
			dispatch(loginSuccess(JSON.parse(descryptedData)));
			window.location.href = '/dashboard';
			//history('/dashboard');
		} else {
			dispatch(apiError(showFriendlyMessafe(404)));
		}
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const loginUser = (user, history) => async (dispatch) => {
	try {
		dispatch(proccessLogin());
		const response = postLogin({
			loginId: user.email,
			password: user.password,
			idApp: 'f7b3bafa-6fce-4f11-8c1e-0581599d212a',
			appName: 'M4SG',
		});

		var data = await response;
		const result = await data.json();
		if (result.status) {
			//test until api is working good
			const encryptedData = encryptData(JSON.stringify(authData));
			//const encryptedData = encryptData(JSON.stringify(result.data))
			localStorage.setItem('authenticatication-crm', encryptedData);
			const descryptedData = decrypData(encryptedData);
			dispatch(loginSuccess(JSON.parse(descryptedData)));
			window.location.href = '/dashboard';
			//history('/dashboard');
		} else {
			dispatch(apiError(showFriendlyMessafe(result.code)));
		}
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const logoutUser = () => async (dispatch) => {
	try {
		localStorage.removeItem('authenticatication-crm');

		if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
		} else {
			dispatch(logoutUserSuccess(true));
		}
	} catch (error) {
		dispatch(apiError(error));
	}
};

export const resetLoginFlag = () => async (dispatch) => {
	try {
		const response = dispatch(reset_login_flag());
		return response;
	} catch (error) {
		dispatch(apiError(error));
	}
};
