import { get } from '../api_helper';
import * as url from '../url';

const getBankAll = () => get(`${url.bank}/all`);

export { getBankAll };
