import {
	getPaxesByReservation,
	getPaymentsByReservation,
	getReservation,
	getReservationPaginate,
	getServicesByReservation,
} from '../../../../helpers/reservation';

//query filter
const fecthReservation = async (q) => {
	const response = await getReservationPaginate(`?${q}`);
	return response;
};

const fecthReservationById = async (id) => {
	const response = await getReservation(id);
	return response;
};

const fecthPaxesByReservation = async (id) => {
	const response = await getPaxesByReservation(id);
	return response;
};
const fecthPaymentByReservation = async (id) => {
	const response = await getPaymentsByReservation(id);
	return response;
};
export {
	fecthReservation,
	fecthReservationById,
	fecthPaxesByReservation,
	fecthPaymentByReservation,
};
