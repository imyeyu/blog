import axios from 'axios';
import { Article } from '@/type/Article';

async function getArticles(offset: number): Promise<Article[]> {
    return axios.get(`/article?offset=${offset}`);
}

async function getArticle(id: number): Promise<Article> {
    return axios.get(`/article/${id}`);
}

export default {
	getArticles,
	getArticle
};