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
		};
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
		padding-left: 7.5px;
		font-feature-settings: "tnum";
		-webkit-font-smoothing: none;
	}

	.content >>> a {
		color: #9B6D6C;
	}

	.content >>> p {
		padding: 0 6px;
		font-size: 15px;
		line-height: 1.8;
		text-indent: 2em;
	}

	.content >>> ul,
	.content >>> ol {
		margin-left: 2em;
		padding-left: 2em;
	}

	.content >>> li {
		line-height: 1.8;
	}

	.content >>> img,
	.content >>> audio,
	.content >>> video,
	.content >>> iframe {
		margin: 4px auto 14px auto;
		display: block;
		max-width: calc(100% - 4rem);
	}

	.content >>> audio {
		height: 2.6em;
		background: #F1F3F4;
	}

	.content >>> table {
		margin: 12px auto;
		max-width: calc(100% - 4rem);
	}
	
	.content >>> table tr:hover {
		background: #E5E5E5;
	}

	.content >>> table tr th {
		font-size: 17px;
		background: #CDDEF0;
		white-space: nowrap;
	}

	.content >>> table tr th,
	.content >>> table tr td {
		border: 1px solid #525870;
		padding: 0 6px;
		line-height: 25px;
	}
	
	.content >>> video {
		width: 100%;
	}

	.content >>> iframe {
		width: 100%;
		height: 520px;
		max-width: calc(100% - 4rem);
	}

	.content >>> blockquote {
		color: #666;
		margin: 1rem 2.4em;
		padding: 6px 0;
		background: #EEE;
		border-left: 3px solid #525870;
		padding-left: 6px;
	}

	.content >>> blockquote ul,
	.content >>> blockquote ol {
		margin-left: 0;
	}

	.content >>> li blockquote {
		margin: 1rem 0;
	}

	/* 自定义类 */
	.content >>> .border {
		border: 1px solid #B8BBC9;
	}

	.content >>> .dl {
		margin: .5em;
		border: 1px solid #D6BE96;
		display: inline-block;
		padding: 2px 4px 0 22px;
		background: var(--random-icon);
		font-size: 13px;
		font-family: var(--public-font);
		font-weight: bold;
		text-indent: 0;
		background-position: 6px -955px;
	}

	/* 代码容器 */
	.content >>> pre {
		width: calc(100% - 4rem - 12px);
		margin: 8px auto 20px auto;
		border: 1px solid #B8BBC9;
		padding: 0;
		overflow: auto;
		font-size: 14px;
		max-height: 400px;
		background: #F7F7F7;
		transition: max-height .5s cubic-bezier(.215, .61, .355, 1);
		line-height: 1;
		border-radius: 0;
	}

	/* 代码盒子 */
	.content >>> pre code {
		color: #43475C;
		display: flex;
		text-shadow: none !important;
	}

	/* 代码行号 */
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

	/* 自定义代码着色 */
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
	
	@media screen and (max-width: 900px) {
		.content >>> img,
		.content >>> audio,
		.content >>> video,
		.content >>> table,
		.content >>> iframe {
			max-width: calc(100% - 1rem);
		}

		.content >>> pre {
			width: calc(100% - 1rem - 12px);
		}
	}
</style>