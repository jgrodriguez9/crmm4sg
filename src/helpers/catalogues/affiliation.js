import { get } from '../api_helper';
import * as url from '../url';

const getAffiliationAll = () => get(`${url.affiliation}`);

export { getAffiliationAll };
