import { post } from '../api_helper';
import * as url from '../url';

const sendExternalSms = (data) => post(`${url.externalSms}`, data);

export { sendExternalSms };
