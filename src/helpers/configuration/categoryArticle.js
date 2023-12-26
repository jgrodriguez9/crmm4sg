import { del, get, post, put } from '../api_helper';
import * as url from '../url';

const getCategoryArticlePaginate = (query) =>
	get(`${url.categoryArticle}?${query}`);

export { getCategoryArticlePaginate };
