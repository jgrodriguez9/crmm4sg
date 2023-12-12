import { updateReservation } from '../helpers/reservation';

const updateReservationService = async (data) => {
	const response = await updateReservation(data.id, data.body);
	return response;
};

export { updateReservationService };
