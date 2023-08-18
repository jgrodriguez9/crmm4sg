import { get, post } from './api_helper';
import * as url from './url';

const getCustomerPaginate = (query) => get(`${url.customer}${query}`);
const getCustomer = (id) => get(`${url.customer}/${id}`);
const clickToCall = (data) => post(`${url.customer}/clickToCall`, data);

export { getCustomerPaginate, getCustomer, clickToCall };
