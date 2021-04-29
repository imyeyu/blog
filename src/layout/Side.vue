<template>
	<aside class="no-select">
		<div class="me">
			<div class="info">
				<div class="pic">
					<a :href="require('../assets/img/pic.png')" target="_blank">
						<img
							width="100"
							height="100"
							alt="头像"
							:src="require('../assets/img/picm.png')"
						/>
					</a>
				</div>
				<div class="name icon"></div>
				<p class="href">
					<router-link to="/">主页</router-link>
					<a href="https://old.imyeyu.net" target="_blank">返回旧版</a>
					<router-link to="/about">关于我</router-link>
					<a href="https://github.com/imyeyu" target="_blank">GitHub</a>
				</p>
			</div>
		</div>
		<div class="item user">
			<div class="title icon"></div>
			<div class="content">
				<div class="input-btn">
					<input id="username" type="text" placeholder="UID 或用户名" spellcheck="false" autocomplete="off" />
					<router-link to="/user/register">注册</router-link>
				</div>
				<div class="input-btn">
					<input id="password" type="password" placeholder="密码" spellcheck="false" autocomplete="off" />
					<a href="javascript:;" @click="$store.state.dialogBus.warning('暂时不可用')">找回密码</a>
				</div>
				<div class="input-btn">
					<img :src="require('../assets/img/captcha.png')" alt="验证码" autocomplete="off" />
					<input id="captcha" type="text" placeholder="验证码" spellcheck="false" />
					<button id="login" class="icon" @click="$store.state.dialogBus.warning('暂时不可用')"></button>
				</div>
			</div>
		</div>
		<div class="item clazz">
			<div class="title icon"></div>
			<ul class="first none-style" @click="$store.state.dialogBus.warning('暂时不可用')">
				<li>HTML / CSS</li>
				<li>Javascript</li>
				<li>Java</li>
				<li>Java Web</li>
				<li>Flutter</li>
				<li>Python</li>
				<li>PHP</li>
				<li>MySQL</li>
				<li>服务器</li>
				<li class="icon">
					<span>其他</span>
					<ul class="second none-style">
						<li>软件</li>
						<li>游戏</li>
						<li>音乐</li>
						<li>其他</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="item search">
			<div :class="`title${searchKey ? ' inputing' : ''}`">
				<input
					class="zpix24"
					spellcheck="false"
					autofocus
					v-model="searchKey"
					@keyup.enter="$store.state.dialogBus.warning('暂时不可用')"
				/>
			</div>
		</div>
		<div class="sticky">
			<div class="item hot">
				<div class="title icon"></div>
				<ul class="links none-style">
					<li class="link" v-for="(item, i) in $store.state.articleHot" :key="item">
						<router-link
							class="href"
							:data-i="`${i + 1}.`"
							:to="`/article/public/aid${item.id}.html`"
							v-text="item.title"
						>
						</router-link>
						<span class="value" v-text="item.count"></span>
					</li>
				</ul>
			</div>
			<div class="item friend">
				<div class="title icon"></div>
				<div class="hrefs">
					<a title="赵羿杰的博客" href="http://39.106.104.78:8080/blog/" target="_blank">赵羿杰</a>
				</div>
			</div>
			<div class="ctrls">
				<div class="ctrl to-top" @click="toTop"></div>
				<div class="ctrl home" @click="home"></div>
			</div>
		</div>
	</aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { sleep } from '@/helpers/Toolkit';

export default defineComponent({
	props: {
		title: {
			type: String,
			default: 'Title',
		},
	},
	data(): {
		searchKey: string;
		} {
		return {
			searchKey: ''
		}
	},
	methods: {
		toTop() {
			this.$store.state.scroller.toTop();
		},
		async home() {
			this.toTop();
			if (this.$route.name !== 'Home') {
				await sleep(600);
				this.$router.push('/');
			}
		}
	},
	mounted() {
		this.$store.commit('refreshArticleHot');
	}
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
		text-indent: 42px;
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
		background: #FFF;
	}

	.name {
		width: 48px;
		height: 24px;
		margin: 8px auto 4px auto;
		background-position: -102px 0;
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
		font-family: "Consolas";
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

	.search .title::before {
		content: "";
		top: 0;
		left: 0;
		width: 100px;
		height: 36px;
		overflow: hidden;
		position: absolute;
		background: var(--random-icon);
		pointer-events: none;
		background-position: 6px -220px;
	}

	.search .title.inputing::before {
		width: 36px;
	}

	.search input {
		width: calc(100% - 46px);
		border: none;
		display: inline-block;
		background: transparent;
	}

	.hot .title {
		background-position: 6px -268px;
	}

	.hot .links {
		width: 229px;
		padding: 4px 0;
	}

	.hot .link {
		color: #333;
		width: 229px;
		height: 24px;
		border: 1px solid transparent;
		z-index: 3;
		overflow: hidden;
		position: relative;
		font-size: 14px;
		transition: .2s;
		line-height: 24px;
		white-space: nowrap;
	}

	.hot .link:hover {
		width: 420px;
		border: 1px solid #525870;
		overflow: inherit;
		transition: .2s cubic-bezier(.19, .1, .22, 1);
		background: #F4F4F4;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .4);
	}

	.hot .href {
		color: #000;
		width: 350px;
		display: inline-block;
		overflow: hidden;
		padding-left: 1.8rem;
		text-overflow: ellipsis;
	}
	
	.hot .href::before {
		content: attr(data-i);
		left: 4px;
		width: 1.5rem;
		position: absolute;
		text-align: right;
	}

	.hot .href:hover {
		text-decoration: none;
	}

	.hot .value {
		color: #BC9D9C;
		right: 6px;
		position: absolute;
		visibility: hidden;
	}

	.hot .link:hover .value {
		visibility: visible;
	}

	.friend .title {
		background-position: 6px -312px;
	}

	.friend .hrefs {
		width: 90%;
		font-size: 13px;
		text-align: left;
		padding-top: 4px;
	}

	.ctrls {
		height: 64px;
		display: flex;
		margin-top: 3rem;
		align-items: flex-end;
		flex-direction: column;
		justify-content: space-between;
	}

	.ctrls .ctrl {
		width: 42px;
		height: 26px;
		cursor: var(--pointer);
		background: var(--random-icon);
	}

	.ctrls .ctrl:active {
		width: 39px;
	}

	.ctrls .to-top {
		background-position: 0 -896px;
	}

	.ctrls .home {
		background-position: 0 -928px;
	}

</style>
