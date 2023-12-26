import { get } from '../api_helper';
import * as url from '../url';

const getDepartamentList = () => get(`${url.article}/listAllDepartment`);

export { getDepartamentList };
