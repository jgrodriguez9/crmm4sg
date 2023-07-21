import { get } from "../api_helper";
import * as url from "../url";

const getCallCenterAll = () => get(`${url.callCenter}/all`);
const getCallCenterPaginate = (query) => get(`${url.callCenter}${query}`);

export {
    getCallCenterAll,
    getCallCenterPaginate
}