//Include Both Helper File with needed methods
import { postLogin } from "../../../helpers/auth";
import {
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import { decrypData, encryptData } from "../../../util/crypto";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag, proccessLogin } from './reducer';

export const loginUser = (user, history) => async (dispatch) => {
  try {

    dispatch(proccessLogin())

    const response =  postLogin({
      loginId: user.email, 
      password: user.password,
      idApp: "f7b3bafa-6fce-4f11-8c1e-0581599d212a",
      appName: "M4SG"
    });     

    var data = await response;
    const result = await data.json()
    if (result.status) {
      const encryptedData = encryptData(JSON.stringify(result.data))
      localStorage.setItem("authenticatication-crm", encryptedData);
      const descryptedData = decrypData(encryptedData)
      dispatch(loginSuccess(JSON.parse(descryptedData)));
      history('/dashboard')
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("authenticatication-crm");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (data, history, type) => async (dispatch) => {
  try {
    let response;

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      
    } else {
      response = postSocialLogin(data);
    }

    const socialdata = await response;

    if (socialdata) {
      localStorage.setItem("authenticatication-crm", JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/dashboard')
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