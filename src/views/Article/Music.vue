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
		<bottom v-if="loadFinish" v-model:likes="article.likes" :article="article" />
	</article>
	<comment v-if="loadFinish" :aid="article.id"></comment>
	<loading v-if="!loadFinish" :isFinished="loadFinish" :refreshEvent="getArticle" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toDateTime } from '@/helpers/UnixTime';
import Sections from './components/Sections.vue';
import Bottom from './components/Bottom.vue';
import Comment from './components/Comment.vue';
import { resURL } from '@/helpers/Toolkit';
import Loading from '@/components/Loading.vue';

import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';

export default defineComponent({
	components: {
		Bottom,
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
		},
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

	.cd {
		width: 628px;
		height: 430px;
		margin: 12px auto;
		display: flex;
		position: relative;
		align-items: center;
	}

	.cd .cover::after {
		content: '';
		top: 0;
		left: 0;
		width: 458px;
		height: 430px;
		z-index: 3;
		position: absolute;
		background: url('~@/assets/img/cd.png') no-repeat;
	}

	.cd .cover {
		left: 3rem;
		width: 456px;
		height: 428px;
		z-index: 2;
		padding: 2px 0 0 2px;
		position: absolute;
		transition: .3s;
	}

	.cd img {
		box-shadow: 0 0 12px rgba(0, 0, 0, .4);
	}

	.cd .disk {
		top: 50%;
		right: 3rem;
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

	.cd:hover .cover {
		left: 0;
		transition: .6s cubic-bezier(.19, 1, .22, 1);
	}

	.cd:hover .disk {
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
		padding: 12px 20px;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.cd-data ul {
		flex: 10;
		min-width: 440px;
		list-style: none;
	}

	.cd-data .list {
		border: 1px solid #CDDEF0;
		position: relative;
		background: #FFF;
		margin-right: 1.5rem;
	}

	.cd-data .list li {
		padding: 4px 0;
		display: flex;
		line-height: 1.5;
		flex-direction: column;
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

	.cd-data .list audio {
		width: calc(100% - 5em);
		margin: 4px auto;
	}

	.cd-data .list video {
		width: calc(100% - 2rem);
		margin: 12px auto;
		box-shadow: 0 0 6px rgba(0, 0, 0, .3);
	}

	.cd-data .list li:nth-child(2n) {
		background: #F4F4F4;
	}

	.cd-data .infos {
		flex: 2;
		min-width: 220px;
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