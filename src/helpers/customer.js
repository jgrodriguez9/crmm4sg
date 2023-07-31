import { get } from "./api_helper";
import * as url from "./url";

const getCustomerPaginate = (query) => get(`${url.customer}${query}`);
const getCustomer = (id) => get(`${url.customer}/${id}`);


export {
    getCustomerPaginate,
    getCustomer
}