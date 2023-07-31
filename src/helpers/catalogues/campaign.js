import { get } from "../api_helper";
import * as url from "../url";

const getCampaingAll = () => get(`${url.campaing}/all`);
const getCampaingPaginate = (query) => get(`${url.campaing}${query}`);

export {
    getCampaingAll,
    getCampaingPaginate
}