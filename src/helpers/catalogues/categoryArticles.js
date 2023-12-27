import { del, get, post, put } from '../api_helper';
import * as url from '../url';

const getCategoryArticlesPaginate = (query) =>
	get(`${url.categoryArticle}?${query}`);
const updateCategoryArticles = (data) =>
	put(`${url.categoryArticle}/${data.id}`, data.body);
const createCategoryArticles = (data) => post(`${url.categoryArticle}`, data);
const deleteCategoryArticles = (data) =>
	del(`${url.categoryArticle}/${data.id}`);

export {
	getCategoryArticlesPaginate,
	updateCategoryArticles,
	createCategoryArticles,
	deleteCategoryArticles,
};
