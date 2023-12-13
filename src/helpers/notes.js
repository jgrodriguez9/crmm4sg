import { del, get, post, put } from './api_helper';
import * as url from './url';

const getNotesByClient = (clientId) =>
	get(`${url.customer}/getAllNotes/${clientId}`);
const getNotesByReservation = (reservationId) =>
	get(`${url.reservation}/getAllNotes/${reservationId}`);
const getListNotesTypes = () => get(`${url.customerNote}/listTypeNote`);
const getListEmotionsClients = () => get(`${url.customerNote}/listStatusNote`);
const updateNote = (data) =>
	put(`${url.customerNote}/${data.customerId}/${data.noteId}`, data.body);
const createNote = (data) => post(`${url.customerNote}`, data);
const deleteNote = (data) =>
	del(`${url.customerNote}/${data.customerId}/${data.noteId}`);

export {
	getNotesByClient,
	getNotesByReservation,
	getListNotesTypes,
	getListEmotionsClients,
	updateNote,
	createNote,
	deleteNote,
};
