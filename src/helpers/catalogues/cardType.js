import { get } from '../api_helper';
import * as url from '../url';

const getCardTypesAll = () => get(`${url.cardType}/all`);

export { getCardTypesAll };
