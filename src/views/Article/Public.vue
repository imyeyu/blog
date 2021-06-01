<template>
	<article v-show="article.id">
		<h2 class="title zpix24" v-text="article.title"></h2>
		<div class="info">
			<div v-text="article.label"></div>
			<div v-text="articleDate" @click="isCreatedAt = !isCreatedAt"></div>
		</div>
		<sections :data="article.data"></sections>
	</article>
	<comment :aid="article.id"></comment>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import Sections from './components/Sections.vue';
import Comment from './components/Comment.vue';

import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';

export default defineComponent({
	components: {
		Sections,
		Comment
	},
	data(): {
		article: Article;
		isCreatedAt: boolean; // 显示的日期
		} {
		return {
			article: {
				id: undefined,
				title: '',
				type: '',
				clazz: '',
				label: '',
				data: '',
				reads: 0,
				likes: 0
			},
			isCreatedAt: true
		};
	},
	computed: {
		articleDate(): string {
			if (this.isCreatedAt || !this.article.updatedAt) {
				return '发布于 ' + toDateTime(this.article.createdAt);
			} else {
				return '编辑于 ' + toDateTime(this.article.updatedAt);
			}
		}
	},
	async mounted() {
		this.article = await ArticleAPI.getArticle(this.$route.params.id as unknown as number);
		if (this.article.updatedAt) {
			this.isCreatedAt = false;
		}
		this.$store.commit('refreshArticleHot');
	}
});
</script>
<style scoped>
	.title {
		/* sticky 会导致 Zpix 渲染模糊 */
		/* top: 0; */
		/* position: sticky; */

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