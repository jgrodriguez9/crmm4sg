import { get } from './api_helper';
import * as url from './url';

const getNotesByClient = (clientId) =>
	get(`${url.customer}/getAllNotes/${clientId}`);
const getNotesByReservation = (reservationId) =>
	get(`${url.reservation}/getAllNotes/${reservationId}`);
const getListNotesTypes = () => get(`${url.customerNote}/listTypeNote`);

export { getNotesByClient, getNotesByReservation, getListNotesTypes };
