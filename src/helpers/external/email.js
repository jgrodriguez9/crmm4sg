import { post } from '../api_helper';
import * as url from '../url';

const sendExternalEmail = (data) => post(`${url.externalEmail}`, data);
const getTemplateEmailByUser = (data) => post(url.externalEmailTemplate, data);

export { sendExternalEmail, getTemplateEmailByUser };
