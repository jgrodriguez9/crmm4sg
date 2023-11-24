import { get } from './api_helper';
import * as url from './url';

const getSubServicesByReservation = (id) =>
	get(`${url.contractService}/subserviceList?reservationId=${id}`);

export { getSubServicesByReservation };
