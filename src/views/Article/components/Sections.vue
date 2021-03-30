<template>
	<div
		class="content line-numbers"
		v-html="dataHTML"
	></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import toHTML from '@/helpers/Markdown';
import Prism from 'prismjs';

export default defineComponent({
	props: {
		data: {
			type: String,
			requied: true
		}
	},
	data(): {
		dataHTML: string;
		} {
		return {
			dataHTML: ''
		}
	},
	watch: {
		data(newVlue) {
			this.dataHTML = toHTML(newVlue);
			this.$nextTick(() => {
				Prism.highlightAll();
			});
		}
	}
});
</script>
<style scoped>
	.content >>> h1,
	.content >>> h2,
	.content >>> h3,
	.content >>> h4,
	.content >>> h5,
	.content >>> h6 {
		margin: 12px 0 8px 0;
		font-size: 24px !important;
		background: linear-gradient(to right, #CDDEF0 50%, transparent 100%);
		line-height: 1.5;
		font-weight: normal;
		font-family: var(--zpix-font);
		padding-left: 8px;
		font-feature-settings: "tnum";
		-webkit-font-smoothing: none;
	}

	.content >>> a {
		color: #9B6D6C;
	}

	.content >>> p {
		padding: 0 6px;
		font-size: 15px;
		line-height: 1.6;
		text-indent: 2em;
	}

	.content >>> ul,
	.content >>> ol {
		margin-left: 2em;
		padding-left: 2em;
	}

	.content >>> img,
	.content >>> audio,
	.content >>> video,
	.content >>> iframe {
		margin: 10px auto;
		display: block;
		max-width: 95%;
	}

	.content >>> audio,
	.content >>> video,
	.content >>> iframe {
		border: 1px solid #B8BBC9;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .4);
	}

	.content >>> audio {
		height: 2.6em;
		border: 1px solid #B8BBC9;
		background: #F1F3F4;
	}
	
	.content >>> video {
		width: 95%;
	}

	.content >>> iframe {
		width: 780px;
		max-width: 95%;
		height: 520px;
	}

	.content >>> blockquote {
		color: #666;
		padding: 6px 0;
		background: #EEE;
		border-left: 3px solid #525870;
	}

	.content >>> blockquote p {
		text-indent: 0;
	}

	/* 代码容器 */
	.content >>> pre {
		width: 90%;
		margin: 8px auto 20px auto;
		border: 1px solid #B8BBC9;
		padding: 0;
		overflow: auto;
		font-size: 14px;
		max-height: 400px;
		background: #F7F7F7;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .6);
		transition: max-height .5s cubic-bezier(.215, .61, .355, 1);
		line-height: 1;
		border-radius: 0;
	}

	/* 盒子 */
	.content >>> pre code {
		color: #43475C;
		display: flex;
		text-shadow: none !important;
	}

	/* 行号 */
	.content >>> .line-numbers-rows {
		left: 0;
		position: relative;
		background: #EDEDED;
		border-right: 2px solid #A6ADC7;
		margin-right: 4px;
	}

	.content >>> .line-numbers-rows > span::before {
		padding-right: .5em;
	}

	/* 代码区 */
	.content >>> .codes {
		left: 3.6em;
		cursor: var(--text);
		position: absolute;
		min-width: calc(100% - 4.6em);
		padding-right: 1em;
	}

	/* 自定义着色 */
	.content >>> .token.function {
		color: #777;
	}
	.content >>> .token.class-name {
		color: #FF461F;
	}
	.content >>> .token.generics .class-name {
		color: #777;
		font-weight: bold;
	}
	.content >>> .token.comment {
		color: green;
	}
	.content >>> .token.string {
		color: #FF7A9B;
		font-weight: bold;
	}
	.content >>> .token.number {
		color: #CA6924;
	}
	.content >>> .token.keyword,
	.content >>> .token.boolean {
		color: #177CB0;
	}
	.content >>> .token.punctuation {
		color: purple;
	}
</style>