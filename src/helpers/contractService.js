import { del, get, post, put } from './api_helper';
import * as url from './url';

const getSubServicesByReservation = (id) =>
	get(`${url.contractService}/subserviceList?reservationId=${id}`);

const createContractService = (data) =>
	post(`${url.contractService}/saveList`, data);

const updateService = (data) =>
	put(
		`${url.contractService}/${data.idBooking}/${data.isService}`,
		data.body
	);

const deleteService = (data) =>
	del(`${url.contractService}/${data.idBooking}/${data.idService}`);

const getService = (data) =>
	get(`${url.contractService}/${data.idBooking}/${data.idService}`);

export {
	getSubServicesByReservation,
	createContractService,
	deleteService,
	getService,
	updateService,
};
