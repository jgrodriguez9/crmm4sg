import { get, post, put } from '../api_helper';
import * as url from '../url';

const getTemplateSmsPaginate = (query) => get(`${url.templateSms}?${query}`);
const updateTemplateSms = (data) =>
	put(`${url.templateSms}/${data.id}`, data.body);
const createTemplateSms = (data) => post(`${url.templateSms}`, data);
const getTemplateSmsByUser = (username) =>
	get(`${url.templateSms}/listAllByUser?username=${username}`);
// const helpArticleList = (query) => get(`${url.article}/listHelp?${query}`);

export {
	getTemplateSmsPaginate,
	createTemplateSms,
	updateTemplateSms,
	getTemplateSmsByUser,
};
