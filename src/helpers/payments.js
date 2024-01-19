import { del, get, post, put } from './api_helper';
import * as url from './url';

const getPaymentsByReservation = (query) =>
	get(`${url.payment}/reservation?${query}`);
const deletePayment = (dataToDelete) =>
	del(
		`${url.payment}/reservation/${dataToDelete.idReservation}/${dataToDelete.idPayment}`
	);
const createPayment = (data) => post(`${url.payment}/reservation`, data);

export { getPaymentsByReservation, deletePayment, createPayment };
