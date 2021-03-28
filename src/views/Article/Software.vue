<template>
	<article v-show="article.id">
		<div class="header">
			<div class="logo">
				<img :src="software.logo" alt="程序 Logo" />
			</div>
			<div class="info">
				<h2 class="title zpix24" v-text="article.title"></h2>
				<div class="labels">
					<span class="label" v-for="label in labels" :key="label" v-text="label"></span>
				</div>
				<p class="digests">
					<span class="digest">
						<span>官网：</span>
						<a :href="software.url" v-text="software.url"></a>
					</span>
					<span class="digest" v-text="`版本：${software.version}`"></span>
				</p>
				<p class="digests">
					<span class="digest" v-text="`文件格式：${software.format}`"></span>
					<span class="digest" v-text="`运行环境：${software.runtime}`"></span>
				</p>
				<p class="digests">
					<button class="download">下载</button>
					<span class="digest" v-text="`大小：${size} MB`"></span>
					<span class="digest" v-text="`解压密码：${software.password ? software.password : '无'}`"></span>
				</p>
			</div>
			<!-- <div v-text="article.label"></div> -->
			<!-- <div v-text="articleDate" @click="isCreatedAt = !isCreatedAt"></div> -->
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
import { Software } from '@/type/Software';

export default defineComponent({
	components: {
		Sections,
		Comment
	},
	data(): {
		article: Article;
		software: Software;
		isCreatedAt: boolean; // 显示的日期
		} {
		return {
			article: {},
			software: {},
			isCreatedAt: true
		}
	},
	computed: {
		articleDate(): string {
			if (this.isCreatedAt || !this.article.updatedAt) {
				return '发布于 ' + toDateTime(this.article.createdAt);
			} else {
				return '编辑于 ' + toDateTime(this.article.updatedAt);
			}
		},
		labels(): string[] {
			if (this.article.label) {
				return this.article.label.split(' ').filter(label => label);
			} else {
				return [];
			}
		},
		size(): string {
			if (this.software.size) {
				return (this.software.size / 1024 / 1024).toFixed(2);
			} else {
				return 'N/A';
			}
		}
	},
	async mounted() {
		const article = await ArticleAPI.getArticle(this.$route.params.id as unknown as number);
		if (article.data) {
			const split = article.data.split('jsonend');
			this.software = JSON.parse(split[0]) as Software;
			article.data = split[1];
		}
		this.article = article;
		
		if (this.article.updatedAt) {
			this.isCreatedAt = false;
		}
		this.$store.commit('refreshArticleHot');
	},
});
</script>
<style scoped>
	.header {
		display: flex;
		padding: 12px 0 12px 12px;
	}

	.logo {
		padding: 16px;
	}

	.logo img {
		width: 140px;
	}

	.info {
		font-size: 13px;
	}

	.title {
		margin-bottom: 6px;
	}

	.labels {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 4px;
	}

	.label {
		color: #666;
		height: 16px;
		border: 1px solid #BC9D9C;
		padding: 1px 6px;
		display: block;
		margin: 0 12px 6px 0;
	}

	.digests {
		color: #666;
		padding: 2px 0;
	}

	.digest {
		position: relative;
		margin-right: 16px;
	}

	.digests .digest:nth-last-child(n + 2)::after {
		content: "";
		top: 2px;
		right: -8px;
		height: 12px;
		position: absolute;
		border-right: 1px solid #AAA;
	}

	.download {
		border: 1px solid #FF7A9B;
		padding: 1px 14px;
		background: transparent;
		margin-right: 6px;
	}

	.download:hover {
		color: #FFF;
		background: #FF7A9B;
	}

	.download:active {
		background: #FFAAC0;
	}
</style>