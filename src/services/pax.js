import { createPax, deletePax, updatePax } from '../helpers/pax';

const createPaxService = async (data) => {
	const response = await createPax(data.body);
	return response;
};
const updatePaxService = async (data) => {
	const response = await updatePax(data.idPax, data.reservationId, data.body);
	return response;
};
const deletePaxService = async (data) => {
	const response = await deletePax(data.idPax, data.idReservation);
	return response;
};

export { createPaxService, updatePaxService, deletePaxService };
