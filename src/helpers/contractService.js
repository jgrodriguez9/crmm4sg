import { get } from './api_helper';
import * as url from './url';

const getServicesByReservation = (id) =>
	get(`${url.contractService}?reservationId=${id}`);

export { getServicesByReservation };
