import { updateCustomer } from '../helpers/customer';

const updateClientService = async (data) => {
	const response = await updateCustomer(data.id, data.body);
	return response;
};

export { updateClientService };
