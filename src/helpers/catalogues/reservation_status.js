import { get } from "../api_helper";
import * as url from "../url";

const getReservationStatusAll = () => get(`${url.reservationStatus}/all`);
const getReservationStatusPaginate = (query) => get(`${url.reservationStatus}${query}`);

export {
    getReservationStatusAll,
    getReservationStatusPaginate
}