<template>
	<article v-show="article.id">
		<h2 class="title" v-text="article.title"></h2>
		<div class="info">
			<div v-text="article.label"></div>
			<div v-text="articleDate" @click="isCreatedAt = !isCreatedAt"></div>
		</div>
		<sections :data="article.data"></sections>
	</article>
	<comment v-if="loadFinish" :aid="article.id"></comment>
	<loading v-if="!loadFinish" :isFinished="loadFinish" :refreshEvent="getArticle" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import Sections from './components/Sections.vue';
import Comment from './components/Comment.vue';
import Loading from '@/components/Loading.vue';

import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';

export default defineComponent({
	components: {
		Comment,
		Loading,
		Sections
	},
	data(): {
		article: Article;
		isCreatedAt: boolean; // 显示的日期
		} {
		return {
			article: {},
			isCreatedAt: true
		};
	},
	computed: {
		loadFinish(): boolean {
			return this.article.id !== undefined;
		},
		articleDate(): string {
			if (this.isCreatedAt || !this.article.updatedAt) {
				return '发布于 ' + toDateTime(this.article.createdAt);
			} else {
				return '编辑于 ' + toDateTime(this.article.updatedAt);
			}
		}
	},
	methods: {
		async getArticle() {
			this.article = await ArticleAPI.get(this.$route.params.id as unknown as number);
			if (this.article.updatedAt) {
				this.isCreatedAt = false;
			}
			this.$store.commit('webTitle', this.article.title);
			this.$store.commit('refreshArticleTopRanking');
		}
	},
	mounted() {
		this.getArticle();
	}
});
</script>
<style scoped>
	.title {
		padding: 48px 0 12px 0;
		text-align: center;
	}

	.info {
		color: #666;
		padding: 4px;
		font-size: 12px;
		text-align: center;
		line-height: 1.6;
		margin-bottom: 24px;
	}
</style>