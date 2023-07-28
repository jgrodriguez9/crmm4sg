import { get } from "./api_helper";
import * as url from "./url";

const getReservationPaginate = (query) => get(`${url.reservation}${query}`);
const getReservation = (id) => get(`${url.reservation}/${id}`);


export {
    getReservationPaginate,
    getReservation
}