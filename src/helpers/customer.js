import { get, post, put } from './api_helper';
import * as url from './url';

const getCustomerPaginate = (query) => get(`${url.customer}${query}`);
const getCustomer = (id) => get(`${url.customer}/${id}`);
const clickToCall = (data, config) =>
	post(`${url.customer}/clickToCall`, data, config);
const getOriginsByCustomer = (id) =>
	get(`${url.customer}/getAllCustomerOrigins/${id}`);
const updateCustomer = (id, data) => put(`${url.customer}/${id}`, data);
const updateAgentToClient = (data) =>
	put(`${url.customer}/chaneSalesOwner/${data.id}`, data.body);
const getAgentsBySupervisor = (user) =>
	get(`${url.customer}/listSalesAgents/${user}`);
const assignClientsRandom = (data) =>
	post(`${url.customer}/assignCustomersToAgents`, data);

export {
	getCustomerPaginate,
	getCustomer,
	clickToCall,
	getOriginsByCustomer,
	updateCustomer,
	updateAgentToClient,
	getAgentsBySupervisor,
	assignClientsRandom,
};
