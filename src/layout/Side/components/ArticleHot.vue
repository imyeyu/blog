<template>
	<div class="item hot">
		<div class="title icon"></div>
		<ul class="links none-style">
			<li class="link" v-for="(item, i) in $store.state.articleHot" :key="item">
				<router-link
					class="link-href"
					:data-i="`${i + 1}.`"
					:to="`/article/${item.type}/aid${item.id}.html`"
					v-text="item.title"
				>
				</router-link>
				<span class="value" v-text="item.count"></span>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	mounted() {
		this.$store.commit('refreshArticleHot');
	}
});
</script>
<style scoped>
	.hot {
		font-family: var(--public-font-consolas);
	}
	
	.hot .title {
		text-indent: 2em;
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

	.hot .link-href {
		color: #000;
		width: 350px;
		display: inline-block;
		overflow: hidden;
		padding-left: 1.8rem;
		text-overflow: ellipsis;
	}
	
	.hot .link-href::before {
		content: attr(data-i);
		left: 4px;
		width: 1.5rem;
		position: absolute;
		text-align: right;
	}

	.hot .link-href:hover {
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
</style>