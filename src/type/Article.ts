import { Model } from './Model';

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