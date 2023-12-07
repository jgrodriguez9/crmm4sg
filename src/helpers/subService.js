import { get } from './api_helper';
import * as url from './url';

const getSubServices = (query) => get(`${url.subServices}/${query}`);

export { getSubServices };
