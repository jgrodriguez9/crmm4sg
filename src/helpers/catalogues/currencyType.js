import { get } from '../api_helper';
import * as url from '../url';

const getCurrencyAll = () => get(`${url.currencyType}/all`);

export { getCurrencyAll };
