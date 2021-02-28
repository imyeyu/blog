<template>
	<aside class="no-select">
		<div class="me">
			<div class="info">
				<div class="pic">
					<a href="../assets/img/pic.png" target="_blank">
						<img :src="require('../assets/img/pic.jpg')" alt="头像" />
					</a>
				</div>
				<h4 class="name zpix24">夜雨</h4>
				<p class="href">
					<router-link to="/">主页</router-link>
					<router-link to="/">返回旧版</router-link>
					<router-link to="/about">关于我</router-link>
					<router-link to="/about">GitHub</router-link>
				</p>
			</div>
		</div>
		<div class="item user">
			<h2 class="title icon zpix24">账号</h2>
			<div class="content">
				<div class="input-btn">
					<input id="username" type="text" placeholder="UID 或用户名" spellcheck="false" autocomplete="off" />
					<router-link to="/user/register">注册</router-link>
				</div>
				<div class="input-btn">
					<input id="password" type="password" placeholder="密码" spellcheck="false" autocomplete="off" />
					<router-link to="/user/register">找回密码</router-link>
				</div>
				<div class="input-btn">
					<img src="https://www.imyeyu.net/ajax/getCheckCode?from=login&width=76&height=22" alt="验证码" autocomplete="off" />
					<input id="captcha" type="text" placeholder="验证码" spellcheck="false" />
					<button id="login" class="icon"></button>
				</div>
			</div>
		</div>
		<div class="item clazz">
			<h2 class="title icon zpix24">分类</h2>
			<ul class="first">
				<li onclick="Router.to('/test')">HTML / CSS</li>
				<li onclick="Router.to('/article')">Javascript</li>
				<li>Java</li>
				<li>Java Web</li>
				<li>Flutter</li>
				<li>Python</li>
				<li>PHP</li>
				<li>MySQL</li>
				<li>服务器</li>
				<li class="icon">
					<span>其他</span>
					<ul class="second">
						<li>软件</li>
						<li>游戏</li>
						<li>音乐</li>
						<li>其他</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="item search">
			<div class="title icon">
				<input class="zpix24" placeholder="搜索" spellcheck="false" autofocus />
			</div>
		</div>
		<div class="sticky">
			<div class="item top">
				<h2 class="title icon zpix24">周排行</h2>
			</div>
			<div class="item friend">
				<h2 class="title icon zpix24">友链</h2>
			</div>
		</div>
	</aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: 'Title',
		},
	},
});
</script>
<style scoped>
	.item {
		margin: 8px 0 4px 0;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.title {
		width: 90%;
		height: 32px;
		padding: 3px;
		position: relative;
		text-indent: 46px;
		border-bottom: 2px solid #A67D7B;
	}

	.info {
		text-align: center;
	}

	.pic {
		width: 100px;
		height: 100px;
		border: 2px solid #FBC7D4;
		margin: 24px auto 2px auto;
		padding: 5px;
		background: #FFF;
	}

	.me .href {
		display: flex;
		font-size: 12px;
		margin-top: 4px;
		justify-content: center;
	}

	.me .href a {
		margin: 0 6px;
		display: block;
		position: relative;
		line-height: 1;
	}

	.me .href a:nth-child(n + 2):before {
		content: "";
		top: 0;
		left: -6px;
		width: 1px;
		height: 12px;
		position: absolute;
		background: #666;
	}

	.user .title {
		background-position: 6px -172px;
	}

	.user .content {
		width: 80%;
		padding: 8px 0 16px 0;
	}

	.input-btn {
		width: 100%;
		height: 32px;
		display: flex;
		font-size: 12px;
		align-items: center;
		border-bottom: 2px solid #EED7D7;
		justify-content: space-between;
	}

	.input-btn:nth-child(n + 3) {
		border-top: none;
	}

	.input-btn input {
		height: 100%;
		border: none;
		padding: 0;
		font-size: 12px;
		background: transparent;
		text-indent: .5em;
		border-radius: 0;
	}

	#username,
	#password {
		width: 120px;
	}

	#captcha {
		width: 100%;
	}

	#login {
		width: 20%;
		height: 100%;
		border: none;
		box-sizing: content-box;
		background-position: 0 -382px;
	}

	#login:active {
		transform: translateX(4px);
	}

	.clazz .title {
		background-position: 6px -126px;
	}

	.clazz .first {
		width: 80%;
		padding: 8px 0;
		display: flex;
		flex-wrap: wrap;
	}

	.clazz .second {
		left: 90%;
		width: 100%;
		bottom: -2px;
		border: 2px solid #CCC;
		padding: 6px 10px;
		opacity: 0;
		position: absolute;
		visibility: hidden;
		transition: 200ms;
		background: #F4F4F4;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .7);
	}

	.clazz li {
		border: 2px solid transparent;
		height: 26px;
		position: relative;
		font-size: 14px;
		line-height: 26px;
		text-indent: 6px;
	}

	.first > li {
		width: calc(50% - 4px);
	}

	.second > li {
		width: calc(100% - 4px);
	}

	.clazz li:before {
		content: "";
		top: 50%;
		left: -3px;
		width: calc(100% - 2px);
		height: 12px;
		position: absolute;
		margin-top: -6px;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
	}

	.clazz li:after {
		content: "";
		top: -3px;
		left: 50%;
		width: 78px;
		height: calc(100% - 2px);
		position: absolute;
		border-top: 4px solid transparent;
		margin-left: -39px;
		border-bottom: 4px solid transparent;
	}

	.clazz li:hover {
		border: 2px solid #CA9381;
	}

	.clazz li:hover:before {
		border-left: 4px solid #F4F4F4;
		border-right: 4px solid #F4F4F4;
	}

	.clazz li:hover:after {
		border-top: 4px solid #F4F4F4;
		border-bottom: 4px solid #F4F4F4;
	}

	.second > li:active,
	.first > li:nth-last-child(n + 2):active {
		height: 22px;
		margin: 2px;
		line-height: 22px;
		text-indent: 4px;
	}

	.first > li:nth-last-child(n + 2):active {
		width: calc(50% - 8px);
	}

	.second > li:active {
		width: calc(100% - 8px);
	}

	.first > li:last-child {
		transition: background 200ms;
		background-position: 64px -361px;
	}

	.first > li:last-child:hover {
		transition: background 200ms;
		background-position: 70px -361px;
	}

	.first > li:last-child:hover .second {
		left: calc(100% + 2px);
		opacity: 1;
		transition: 200ms;
		visibility: visible;
	}

	.search .title {
		background-position: 6px -220px;
	}

	.search input {
		width: calc(100% - 46px);
		border: none;
		display: inline-block;
		background: transparent;
	}

	.top .title {
		background-position: 6px -268px;
	}

	.friend .title {
		background-position: 6px -312px;
	}
</style>
