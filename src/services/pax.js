import { deletePax } from '../helpers/pax';

const deletePaxService = async (data) => {
	const response = await deletePax(data.idPax, data.idReservation);
	return response;
};

export { deletePaxService };
