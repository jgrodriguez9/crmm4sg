import { get } from "../api_helper";
import * as url from "../url";

const getHotelAll = () => get(`${url.hotel}/all`);
const getHotelPaginate = (query) => get(`${url.hotel}${query}`);

export {
    getHotelAll,
    getHotelPaginate
}