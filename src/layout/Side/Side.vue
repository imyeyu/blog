<template>
	<aside class="aside no-select">
		<div class="me">
			<div class="info">
				<div class="avatar">
					<a :href="require('@/assets/img/avatar.png')" target="_blank">
						<img
							width="100"
							height="100"
							alt="头像"
							:src="require('@/assets/img/avatarm.png')"
						/>
					</a>
				</div>
				<div class="name icon"></div>
				<p class="href">
					<router-link to="/">主页</router-link>
					<router-link to="/about">关于我</router-link>
					<a href="https://github.com/imyeyu" target="_blank">GitHub</a>
				</p>
			</div>
		</div>
		<account />
		<clazz />
		<div class="sticky">
			<article-top-ranking />
			<friend />
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

import Clazz from './components/Clazz.vue';
import Friend from './components/Friend.vue';
import Account from './components/Account.vue';
import ArticleTopRanking from './components/ArticleTopRanking.vue';

export default defineComponent({
	components: {
		Clazz,
		Friend,
		Account,
		ArticleTopRanking
	},
	props: {
		title: {
			type: String,
			default: 'Title'
		}
	},
	methods: {
		// 回滚至顶
		toTop() {
			this.$store.state.scroller.toTop();
		},
		// 主页
		async home() {
			this.toTop();
			if (this.$route.name !== 'Home') {
				await sleep(600);
				this.$router.push('/');
			}
		}
	},
	mounted() {
		this.$store.commit('refreshArticleTopRanking');
	}
});
</script>
<style scoped>
	.aside :deep(.item) {
		margin: 8px 0 4px 0;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.aside :deep(.title) {
		width: 90%;
		height: 32px;
		padding: 3px;
		position: relative;
		border-bottom: 2px solid #A67D7B;
	}

	.aside :deep(.href) {
		display: flex;
		font-size: 12px;
		margin-top: 4px;
		justify-content: center;
	}

	.aside :deep(.href a) {
		margin: 0 6px;
		display: block;
		position: relative;
		line-height: 1;
	}

	.aside :deep(.href a:nth-child(n + 2):before) {
		content: "";
		top: 0;
		left: -6px;
		width: 1px;
		height: 12px;
		position: absolute;
		background: #666;
	}

	.info {
		text-align: center;
		margin-bottom: 24px;
	}

	.avatar {
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