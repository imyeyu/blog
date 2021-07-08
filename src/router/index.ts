import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Register from '@/views/User/Register.vue';
import About from '@/views/Article/About.vue';
import ArticleList from '@/views/Article/List.vue';
import ArticleMusic from '@/views/Article/Music.vue';
import ArticlePublic from '@/views/Article/Public.vue';
import ArticleSoftware from '@/views/Article/Software.vue';

import Space from '@/views/User/Space.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: ArticleList
	},
	{
		// 公版
		path: '/article/public/aid:id.html',
		name: 'Public Article',
		component: ArticlePublic
	},
	{
		// 音乐类型排版
		path: '/article/music/aid:id.html',
		name: 'Music Article',
		component: ArticleMusic
	},
	{
		// 软件类型排版
		path: '/article/software/aid:id.html',
		name: 'Software Article',
		component: ArticleSoftware
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/user/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/user/space',
		name: 'Space',
		component: Space
	}
];

export default createRouter({
	history: createWebHistory(),
	routes
});
