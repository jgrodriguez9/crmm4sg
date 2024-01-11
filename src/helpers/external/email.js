import { post } from '../api_helper';
import * as url from '../url';

const sendExternalEmail = (data) => post(`${url.externalEmail}`, data);

export { sendExternalEmail };
