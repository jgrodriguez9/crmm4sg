import { getMaritalStatusAll } from '../helpers/catalogues/maritalStatus';

const fetchMaritalStatus = async (id) => {
	const response = await getMaritalStatusAll();
	return response;
};

export { fetchMaritalStatus };
