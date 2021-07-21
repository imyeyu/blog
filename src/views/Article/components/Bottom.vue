<template>
	<aside class="bottom">
		<div :class="`like${isActiveLike ? ' active' : ''}`">
			<div class="icon" @click="like"></div>
			<div class="text" v-text="likes"></div>
		</div>
		<div class="clazz">
			<span class="key">分类：</span>
			<a href="javascript:;" class="value" v-text="article.clazz.name"></a>
		</div>
		<div class="labels">
			<span class="key">标签：</span>
			<a
				class="value"
				href="javascript:;"
				v-for="label in article.labels"
				:key="label"
				v-text="label.name">
			</a>
		</div>
		<div class="read-comment">
			<span class="key">阅读：</span>
			<span class="value" v-text="article.reads"></span>
			<span class="key">评论：</span>
			<span class="value" v-text="article.comments"></span>
		</div>
	</aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { sleep } from '@/helpers/Toolkit';
import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';

export default defineComponent({
	props: {
		likes: {
			type: Number,
			requied: true
		},
		article: {
			type: Object as () => Article,
			requied: true
		}
	},
	data(): {
		isActiveLike: boolean;
		} {
		return {
			isActiveLike: false
		};
	},
	methods: {
		async like() {
			if (!this.isActiveLike && this.article && this.article.id !== undefined) {
				this.isActiveLike = true;
				try {
					// 请求喜欢
					const start = new Date().getTime();
					const likes = await ArticleAPI.like(this.article.id);
					const diff = new Date().getTime() - start; // 时差
					if (diff < 1150) {
						await sleep(1150 - diff);
					}
					if (this.likes !== undefined) {
						this.$emit('update:likes', likes);
					}
					await sleep(100);
				} catch (error) {
					this.isActiveLike = false;
				}
				this.isActiveLike = false;
			}
		}
	}
});
</script>
<style scoped>
	@keyframes likeIcon {
		0% {
			transform: translateY(0) rotateY(0);
		} 80% {
			transform: translateY(-32px) rotateY(720deg);
		} 90% {
			transform: translateY(8px) rotateY(720deg);
		} 100% {
			transform: translateY(0) rotateY(720deg);
		}
	}

	@keyframes likeText {
		0% {
			color: #333;
			transform: translateY(0);
		} 86% {
			color: #333;
			transform: translateY(0);
		} 90% {
			color: #FF7A9B;
			transform: translateY(8px);
		} 100% {
			color: #333;
			transform: translateY(0);
		}
	}

	.bottom {
		padding: 0 6px;
		border-bottom: 1px dashed #B0C8E4;
	}

	.like {
		margin: 48px 0 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.like .icon {
		width: 32px;
		height: 26px;
		cursor: pointer;
		background-position: -10px -998px;
	}

	.like.active .icon {
		animation: likeIcon 1250ms cubic-bezier(.645, .045, .355, 1) 0s normal forwards;
	}

	.like.active .text {
		animation: likeText 1250ms cubic-bezier(.645, .045, .355, 1) 0s normal forwards;
	}

	.key,
	.value {
		font-size: 13px;
	}

	.value {
		color: #777;
	}

	.labels {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.labels .key {
		margin-bottom: 6px;
	}

	.labels .value {
		color: #666;
		height: 16px;
		border: 1px solid #BC9D9C;
		margin: 0 12px 6px 0;
		padding: 1px 6px 2px 6px;
	}

	.read-comment {
		float: right;
	}

	.read-comment .value:nth-child(2) {
		margin-right: 18px;
	}
</style>