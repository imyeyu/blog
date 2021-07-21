import axios from 'axios';
import { Article, ArticleTopRanking } from '@/type/Article';

/**
 * 获取最近更新文章
 *
 * @param offset 偏移
 * @returns 文章列表
 */
async function getMany(offset: number): Promise<Article[]> {
	return axios.get(`/article/list?offset=${offset}`);
}


/**
 * 根据分类获取文章
 *
 * @param cid    分类 ID
 * @param offset 偏移
 * @returns 文章列表
 */
async function getManyByClass(cid: number, offset: number): Promise<Article[]> {
	return axios.get(`/article/list/class?cid=${cid}&offset=${offset}`);
}

/**
 * 根据标签获取文章
 *
 * @param lid    标签 ID
 * @param offset 偏移
 * @returns 文章列表
 */
async function getManyByLabel(lid: number, offset: number): Promise<Article[]> {
	return axios.get(`/article/list/label?lid=${lid}offset=${offset}`);
}

/**
 * 获取文章
 *
 * @param id 文章 ID
 * @returns 文章数据
 */
async function get(id: number): Promise<Article> {
	return axios.get(`/article/${id}`);
}

/**
 * 喜欢文章
 *
 * @param id 文章 ID
 * @returns 最新喜欢数量
 */
async function like(id: number): Promise<number> {
	return axios.get(`/article/like/${id}`);
}

/** @returns 文章访问排行 */
async function getManyClasses(): Promise<Object> {
	return axios.get('/article/classes');
}

/** @returns 文章访问排行 */
async function getTopRanking(): Promise<ArticleTopRanking[]> {
	return axios.get('/article/top-ranking');
}

export default {
	get,
	like,
	getMany,
	getTopRanking,
	getManyByClass,
	getManyByLabel,
	getManyClasses
};