import { get } from '../api_helper';
import * as url from '../url';

const getMaritalStatusAll = () => get(`${url.maritalStatus}`);

export { getMaritalStatusAll };
