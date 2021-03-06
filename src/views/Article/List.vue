<template>
	<div class="root">
		<section class="header" v-if="article.length !== 0">
			<h4 class="title icon">
				<span class="list-update" v-text="`最近更新（${toDateTime(updateTime)}）`"></span>
				<span class="light-gray" v-text="sayHello"></span>
			</h4>
		</section>
		<article class="article" v-for="item in article" :key="item">
			<div class="content">
				<div class="abstract">
					<h3 class="title">
						<router-link
							:to="`/article/${item.type.toLowerCase()}/aid${item.id}.html`"
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
				</div>
				<span class="icon update-at" v-text="toDate(item.createdAt, item.updatedAt)"></span>
			</footer>
		</article>
		<loading :isFinished="isLoadFinished" :finishText="'已加载所有文章 (◡ ᴗ ◡ ✿)'" :refreshEvent="getArticles" />
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
		isLoadFinished: boolean;
		} {
		return {
			article: [],
			isLoadFinished: false
		};
	},
	computed: {
		sayHello(): string {
			const hour = new Date().getHours();
			const statiz = '，欢迎访问 imyeyu.net';
			if (0  <= hour && hour <= 4 ) return '夜深了，注意休息' + statiz;
			if (5  <= hour && hour <= 10) return '早上好' + statiz;
			if (11 <= hour && hour <= 13) return '中午好' + statiz;
			if (14 <= hour && hour <= 17) return '下午好' + statiz;
			if (18 <= hour && hour <= 19) return '傍晚好' + statiz;
			return '晚上好' + statiz;
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
			let result = await ArticleAPI.getMany(this.article.length);
			if (result) {
				this.article = this.article.concat(result);
				this.updateTime = toDateTime(this.article[0].updatedAt || this.article[0].createdAt);
				this.$store.commit('webTitle');
			}
			if (!result || result.length < 16) {
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
		this.$store.commit('refreshArticleTopRanking');
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
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
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