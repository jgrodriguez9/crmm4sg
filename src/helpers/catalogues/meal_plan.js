import { get } from "../api_helper";
import * as url from "../url";

const getMealPlanAll = () => get(`${url.mealPlan}/all`);
const getMealPlanPaginate = (query) => get(`${url.mealPlan}${query}`);

export {
    getMealPlanAll,
    getMealPlanPaginate
}