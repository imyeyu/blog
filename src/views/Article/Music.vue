<template>
	<article v-show="article.id">
		<h2 class="title" v-text="article.title"></h2>
		<div class="info">
			<div v-text="article.label"></div>
			<div v-text="articleDate" @click="isCreatedAt = !isCreatedAt"></div>
		</div>
		<div class="cd" v-if="hasExtendData">
			<div class="cover">
				<img width="426" height="426" :src="resURL(article.extendData.cover)" alt="专辑封面" />
			</div>
			<div class="disk">
				<svg viewBox="0 0 100 100">
					<path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
					<text fill="#F4F4F4">
						<textPath xlink:href="#circle">{{ article.extendData.title }}</textPath>
					</text>
				</svg>
			</div>
		</div>
		<sections :data="article.data"></sections>
		<div class="cd-data" v-if="hasExtendData">
			<ul class="list">
				<li v-for="(item, i) in article.extendData.list" :key="i" :data-i="`${i + 1}.`">
					<p v-text="item.title"></p>
					<video v-if="item.video" :src="resURL(item.video)" controls></video>
					<audio v-if="item.audio" :src="resURL(item.audio)" controls></audio>
				</li>
			</ul>
			<ul class="infos">
				<li v-for="info in article.extendData.infos" :key="info">
					<span class="label" v-text="`${info.key}：`"></span>
					<span class="gray" v-text="info.value"></span>
				</li>
			</ul>
		</div>
	</article>
	<comment :aid="article.id"></comment>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import Sections from './components/Sections.vue';
import Comment from './components/Comment.vue';
import { resURL } from '@/helpers/Toolkit';

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
			article: {},
			isCreatedAt: true
		};
	},
	computed: {
		hasExtendData(): boolean {
			return this.article.extendData !== null && this.article.extendData !== undefined;
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
		resURL(url: string): string {
			return resURL(url);
		}
	},
	async mounted() {
		this.article = await ArticleAPI.getArticle(this.$route.params.id as unknown as number);
		if (this.article.updatedAt) {
			this.isCreatedAt = false;
		}
		this.$store.commit('webTitle', this.article.title);
		this.$store.commit('refreshArticleHot');
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

	.cd {
		width: 628px;
		height: 430px;
		margin: 12px auto;
		display: flex;
		position: relative;
		transition: .3s;
		align-items: center;
	}

	.cd::before {
		content: '';
		width: 458px;
		height: 430px;
		z-index: 3;
		position: absolute;
		background: url('~@/assets/img/cd.png') no-repeat;
	}

	.cd .cover {
		width: 456px;
		height: 428px;
		z-index: 2;
		padding: 2px 0 0 2px;
		position: absolute;
	}

	.cd img {
		box-shadow: 0 0 12px rgba(0, 0, 0, .4);
	}

	.cd .disk {
		top: 50%;
		right: 6rem;
		color: #F4F4F4;
		border: 3px solid #888;
		padding: 40px;
		z-index: 1;
		position: absolute;
		transform: rotateZ(50deg);
		transition: .3s;
		margin-top: calc(-43px - 8rem);
		background: #212121;
		border-radius: 50%;
	}

	.cd .disk::after {
		content: '';
		top: 50%;
		left: 50%;
		width: 30px;
		height: 30px;
		margin: -23px 0 0 -23px;
		border: 8px solid #BBB;
		position: absolute;
		background: #F4F4F4;
		border-radius: 50%;
	}

	.cd .disk:hover {
		right: 0;
		transform: rotateZ(120deg);
		transition: .6s cubic-bezier(.19, 1, .22, 1);
	}

	.cd .disk path {
		fill: none;
	}
	.cd .disk {
		width: 16rem;
		height: 16rem;
		font-size: .5rem;
	}

	.cd .disk svg {
		display: block;
		overflow: visible;
	}

	.cd-data {
		display: flex;
		padding: 12px 32px;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.cd-data ul {
		list-style: none;
	}

	.cd-data .list {
		width: 32rem;
		border: 1px solid #CDDEF0;
		position: relative;
		background: #FFF;
	}

	.cd-data .list li {
		padding: 4px 0;
		line-height: 1.5;
	}

	.cd-data .list li::before {
		content: attr(data-i);
		color: #525870;
		width: 32px;
		height: 32px;
		position: absolute;
		text-align: right;
		font-weight: bold;
	}

	.cd-data .list p {
		text-indent: 2.5em;
	}

	.cd-data .list li:nth-child(2n) {
		background: #F4F4F4;
	}

	.cd-data .infos {
		width: 250px;
	}

	.cd-data .infos li {
		padding: 6px 0;
		line-height: 1.5;
		border-bottom: 1px dashed #777;
	}

	.cd-data .label {
		color: #525870;
		font-weight: bold;
	}
</style>