<template>
	<div class="root">
		<section class="header">
			<h4 class="title icon">
				<span class="list-update" v-text="`最近更新（${toDateTime(updateTime)}）`"></span>
				<span class="light-gray">下午好，欢迎访问 imyeyu.net</span>
			</h4>
		</section>
		<article class="article" v-for="item in article" :key="item">
			<div class="content">
				<div class="abstract">
					<h3 class="title">
						<router-link
							:to="`/article/${item.type}/aid${item.id}.html`"
							v-text="item.title"
						></router-link>
					</h3>
					<p class="digest" v-text="`${item.digest}..`"></p>
				</div>
			</div>
			<footer class="footer">
				<div>
					<span class="icon reads" v-text="`阅读（${item.reads}）`"></span>
					<span class="icon likes" v-text="`喜欢（${item.likes}）`"></span>
					<span class="icon comments" v-text="`评论（${item.comments}）`"></span>
				</div>
				<span class="icon update-at" v-text="toDate(item.createdAt, item.updatedAt)"></span>
			</footer>
		</article>
		<loading
			:isFinished="isLoadFinished"
			:isError="isLoadError"
			:finishText="'已加载所有文章 (◡ ᴗ ◡ ✿)'"
		></loading>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toDate, toDateTime } from '@/helpers/UnixTime';
import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';
import Loading from '@/components/Loading.vue';

export default defineComponent({
	components: {
		Loading
	},
	data(): {
		article: Article[];
		updateTime?: string;

		isLoadError: boolean;
		isLoadFinished: boolean;
		} {
		return {
			article: [],

			isLoadError: false,
			isLoadFinished: false
		}
	},
	methods: {
		toDate(unixCreated: number, unixUpdated: number) : string {
			return toDate(unixUpdated ? unixUpdated : unixCreated);
		},
		toDateTime(unix: number) : string {
			if (unix) {
				return toDateTime(unix);
			} else {
				return '';
			}
		},
		async getArticles() {
			const offset = this.article.length === 0 ? 0 : this.article.length + 1;
			let result = await ArticleAPI.getArticles(offset);
			result = result.filter(a => !a.isHide);
			this.article = this.article.concat(result);
			this.updateTime = toDateTime(this.article[0].createdAt);
			if (result.length === 0) {
				this.isLoadFinished = true;
			}
		},
		onScroll(top: number, wasBottom: boolean) {
			if (wasBottom) {
				this.getArticles();
			}
		}
	},
	async mounted() {
		this.getArticles();
		this.$store.state.scroller.add('ArticleList', this.onScroll);
		this.$store.commit('refreshArticleHot');
	}
});
</script>
<style scoped>
	.root {
		letter-spacing: 1px;
	}

	.tips {
		text-align: center;
	}

	.header {
		top: 0;
		position: sticky;
		font-size: 12px;
		background: rgba(244, 244, 244, .9);
	}

	.header .title {
		margin: 0;
		padding: 14px 12px 8px 36px;
		display: flex;
		border-bottom: 2px solid #CDDEF0;
		justify-content: space-between;
		background-position: 6px -704px;
	}

	.article {
		display: flex;
		min-height: 150px;
		flex-direction: column;
		justify-content: space-between;
	}

	.content .title {
		margin: 0;
		padding: 4px 0 4px 6px;
		font-size: 16px;
		background: linear-gradient(to right, #CDDEF0 50%, transparent 100%);
		letter-spacing: 2px;
	}

	.content .title a {
		color: #333;
	}

	.digest {
		color: #333;
		padding: 4px 4px 8px 4px;
		font-size: 14px;
		text-indent: 2em;
		line-height: 1.5;
	}

	.footer {
		color: #777;
		display: flex;
		padding: 0 8px 4px 0;
		font-size: 12px;
		justify-content: space-between;
	}

	.footer span {
		display: inline-block;
		margin-left: 8px;
		padding-left: 24px;
		justify-content: space-between;
	}

	.reads {
		background-position: 0 -755px;
	}

	.likes {
		background-position: 0 -785px;
	}

	.comments {
		background-position: 0 -816px;
	}

	.update-at {
		background-position: 0 -849px;
	}
</style>