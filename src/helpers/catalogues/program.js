import { get } from "../api_helper";
import * as url from "../url";

const getProgramAll = () => get(`${url.program}/all`);
const getProgramPaginate = (query) => get(`${url.program}${query}`);

export {
    getProgramAll,
    getProgramPaginate
}