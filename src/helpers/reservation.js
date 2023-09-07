import { get } from './api_helper';
import * as url from './url';

const getReservationPaginate = (query) => get(`${url.reservation}${query}`);
const getReservation = (id) => get(`${url.reservation}/${id}`);
const getPaxesByReservation = (id) =>
	get(`${url.reservation}/getAllPaxes/${id}`);
const getServicesByReservation = (id) =>
	get(`${url.reservation}/getAllServices/${id}`);
const getPaymentsByReservation = (id) =>
	get(`${url.reservation}/getAllPayments/${id}`);

export {
	getReservationPaginate,
	getReservation,
	getPaxesByReservation,
	getServicesByReservation,
	getPaymentsByReservation,
};
