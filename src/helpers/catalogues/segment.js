import { get } from "../api_helper";
import * as url from "../url";

const getSegmentAll = () => get(`${url.segment}/all`);
const getSegmentPaginate = (query) => get(`${url.segment}${query}`);

export {
    getSegmentAll,
    getSegmentPaginate
}