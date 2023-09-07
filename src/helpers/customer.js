import { get, post } from './api_helper';
import * as url from './url';

const getCustomerPaginate = (query) => get(`${url.customer}${query}`);
const getCustomer = (id) => get(`${url.customer}/${id}`);
const clickToCall = (data, config) =>
	post(`${url.customer}/clickToCall`, data, config);
const getOriginsByCustomer = (id) =>
	get(`${url.customer}/getAllCustomerOrigins/${id}`);

export { getCustomerPaginate, getCustomer, clickToCall, getOriginsByCustomer };
