import { getCustomer, getCustomerPaginate } from '../../../../helpers/customer';

//get client promise
const fecthItem = async (id) => {
	const response = await getCustomer(id);
	return response;
};
//get list clients
//query filter
const fecthItems = async (q) => {
	const response = await getCustomerPaginate(`?${q}`);
	return response;
};

export { fecthItem, fecthItems };
