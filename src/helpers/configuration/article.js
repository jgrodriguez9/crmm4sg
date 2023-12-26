import { del, get, post, put } from '../api_helper';
import * as url from '../url';

const getArticlePaginate = (query) => get(`${url.article}?${query}`);
const updateArticle = (data) =>
	put(`${url.article}/${data.articleId}`, data.body);
const createArticle = (data) => post(`${url.article}`, data);
const deleteArticle = (data) => del(`${url.article}/${data.articleId}`);
const helpArticleList = (query) => get(`${url.article}/listHelp?${query}`);

export {
	getArticlePaginate,
	updateArticle,
	createArticle,
	deleteArticle,
	helpArticleList,
};
