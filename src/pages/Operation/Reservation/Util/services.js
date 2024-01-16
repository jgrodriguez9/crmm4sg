import {
	getPaxesByReservation,
	getReservation,
	getReservationPaginate,
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

export { fecthReservation, fecthReservationById, fecthPaxesByReservation };
