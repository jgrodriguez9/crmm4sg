import { get } from "../api_helper";
import * as url from "../url";

const getMerchantAll = () => get(`${url.merchant}/all`);
const getMerchantPaginate = (query) => get(`${url.merchant}${query}`);

export {
    getMerchantAll,
    getMerchantPaginate
}