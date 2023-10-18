import { del, get, post, put } from './api_helper';
import * as url from './url';

const getPaxByReservationAndId = (idPax, idReservation) =>
	get(`${url.pax}/${idPax}/${idReservation}`);
const createPax = (data) => post(`${url.pax}`, data);
const updatePax = (idPax, idReservation, data) =>
	put(`${url.pax}/${idPax}/${idReservation}`, data);
const deletePax = (idPax, idReservation) => del(`${url.pax}/${idPax}`);

export { getPaxByReservationAndId, createPax, updatePax, deletePax };
