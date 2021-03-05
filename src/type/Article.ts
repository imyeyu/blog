import { Model } from './Model';

// 文章
export type Article = {
	title?: string;
	type?: string;
	clazz?: string;
	label?: string;
	digest?: string;
	data?: string;
	reads?: number;
	likes?: number;
	comments?: number;
	isHide?: boolean;
} & Model

// 每周排行
export type ArticleHot = {
	title?: string;
	count?: number;
	recentAt?: number;
} & Model