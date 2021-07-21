import { Model } from './Model';

// 文章
export type Article = {
	title?: string;
	type?: string;
	clazz?: ArticleClass;
	labels?: ArticleLabel[];
	digest?: string;
	data?: string;
	extendData?: object;
	reads?: number;
	likes?: number;
	comments?: number;
} & Model

// 文章分类
export type ArticleClass = {
	name?: string;
	isOther?: boolean;
	order?: number;
} & Model

// 文章标签
export type ArticleLabel = {
	name?: string;
} & Model

// 每周排行
export type ArticleTopRanking = {
	title?: string;
	count?: number;
	recentAt?: number;
} & Model