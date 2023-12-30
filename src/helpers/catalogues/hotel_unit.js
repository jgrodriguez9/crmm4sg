import { get } from '../api_helper';
import * as url from '../url';

const getHotelUnitAll = () => get(`${url.hotelUnit}/all`);
const getHotelUnitByHotelPaginate = (query) => get(`${url.hotelUnit}${query}`);

export { getHotelUnitAll, getHotelUnitByHotelPaginate };
