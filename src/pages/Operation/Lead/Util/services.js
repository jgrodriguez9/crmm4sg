import {
	getCustomer,
	getCustomerPaginate,
	getOriginsByCustomer,
} from '../../../../helpers/customer';

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

//get origin de clients
const fecthOriginClients = async (id) => {
	const response = await getOriginsByCustomer(id);
	return response;
};

export { fecthItem, fecthItems, fecthOriginClients };
