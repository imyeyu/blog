import axios from 'axios';
import { Article, ArticleHot } from '@/type/Article';

async function getArticles(offset: number): Promise<Article[]> {
    return axios.get(`/article?offset=${offset}`);
}

async function getArticle(id: number): Promise<Article> {
    return axios.get(`/article/${id}`);
}

async function getArticleHot(): Promise<ArticleHot[]> {
	return axios.get('/article/hot');
}

export default {
	getArticles,
	getArticle,
	getArticleHot
};