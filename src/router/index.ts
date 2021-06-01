import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Register from '@/views/User/Register.vue';
import About from '@/views/Article/About.vue';
import ArticleList from '@/views/Article/List.vue';
import ArticlePublic from '@/views/Article/Public.vue';
import ArticleSoftware from '@/views/Article/Software.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: ArticleList
	},
	{
		path: '/article/public/aid:id.html',
		alias: [ // 兼容性保留
			'/article/music/aid:id.html'
		],
		name: 'Public Article',
		component: ArticlePublic
	},
	{
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
	}
];

export default createRouter({
	history: createWebHistory(),
	routes
});
