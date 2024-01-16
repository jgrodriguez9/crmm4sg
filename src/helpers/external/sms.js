import { post } from '../api_helper';
import * as url from '../url';

const getSmsListByCustomer = (data) => post(`${url.externalListSms}`, data);
const sendExternalSms = (data) => post(`${url.externalSms}`, data);

export { sendExternalSms, getSmsListByCustomer };
