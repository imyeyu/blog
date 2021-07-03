<template>
	<div
		class="content line-numbers"
		v-html="dataHTML"
	></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { toHTML, parseGithubCommits } from '@/helpers/Markdown';
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
			this.$nextTick(async () => {
				Prism.highlightAll();
				const gits = document.querySelectorAll('.git-history');
				for (const git of gits) {
					await parseGithubCommits(git);
				}
			});
		}
	}
});
</script>
<style scoped>
	.content {
		font-family: var(--public-font-consolas);
	}

	.content ::v-deep h1,
	.content ::v-deep h2,
	.content ::v-deep h3,
	.content ::v-deep h4,
	.content ::v-deep h5,
	.content ::v-deep h6 {
		margin: 12px 0 8px 0;
		font-size: 20px;
		background: linear-gradient(to right, #CDDEF0 50%, transparent 100%);
		line-height: 1.5;
		font-family: var(--public-font);
		padding-left: 8px;
	}

	.content ::v-deep a {
		color: #9B6D6C;
	}

	.content ::v-deep p {
		padding: 0 6px;
		font-size: 15px;
		line-height: 1.8;
		text-indent: 2em;
	}

	.content ::v-deep ul,
	.content ::v-deep ol {
		margin-left: 2em;
		padding-left: 2em;
	}

	.content ::v-deep li {
		line-height: 1.8;
	}

	.content ::v-deep img,
	.content ::v-deep audio,
	.content ::v-deep video,
	.content ::v-deep iframe {
		margin: 4px auto 14px auto;
		display: block;
		max-width: calc(100% - 4rem);
	}

	.content ::v-deep audio {
		height: 2.6em;
		background: #F1F3F4;
	}

	.content ::v-deep table {
		margin: 12px auto;
		max-width: calc(100% - 4rem);
	}
	
	.content ::v-deep table tr:nth-child(n + 1):hover {
		background: #E5E5E5;
	}

	.content ::v-deep table tr th {
		font-size: 17px;
		background: #CDDEF0;
		white-space: nowrap;
	}

	.content ::v-deep table tr th,
	.content ::v-deep table tr td {
		border: 1px solid #525870;
		padding: 0 6px;
		line-height: 25px;
	}
	
	.content ::v-deep video {
		width: 100%;
	}

	.content ::v-deep iframe {
		width: 100%;
		height: 520px;
		max-width: calc(100% - 4rem);
	}

	.content ::v-deep blockquote {
		color: #666;
		margin: 1rem 2.4em;
		padding: 6px 0;
		background: #EEE;
		border-left: 3px solid #525870;
		padding-left: 6px;
	}

	.content ::v-deep blockquote ul,
	.content ::v-deep blockquote ol {
		margin-left: 0;
	}

	.content ::v-deep li blockquote {
		margin: 1rem 0;
	}

	/* Github 提交历史 */
	.content ::v-deep .git-history table {
		width: 100%;
	}

	.content ::v-deep .git-history th,
	.content ::v-deep .git-history td {
		border: none;
		padding: 0 3px;
		font-size: 13px;
	}

	.content ::v-deep .git-history th {
		background: transparent;
		border-bottom: 1px solid #3572B0;
	}

	.content ::v-deep .git-history td:nth-child(1) {
		width: 150px;
	}
	
	.content ::v-deep .git-history td:nth-child(2) {
		width: 120px;
	}
	
	.content ::v-deep .git-history td:nth-child(3) {
		padding: 0 12px;
		position: relative;
	}

	.content ::v-deep .git-history td:nth-child(3)::before {
		content: '';
		left: 50%;
		width: 3px;
		height: 100%;
		position: absolute;
		background: #3572B0;
		margin-left: -1.5px;
	}

	.content ::v-deep .git-history td:nth-child(3)::after {
		content: '';
		top: 50%;
		left: 50%;
		width: 9px;
		height: 9px;
		margin: -5px 0 0 -6.5px;
		border: 2px solid #F4F4F4;
		position: absolute;
		background: #3572B0;
		border-radius: 50%;
	}

	/* 自定义类 */
	.content ::v-deep .border {
		border: 1px solid #B8BBC9;
	}

	.content ::v-deep .dl {
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
	.content ::v-deep pre {
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
	.content ::v-deep pre code {
		color: #43475C;
		display: flex;
		text-shadow: none !important;
	}

	/* 代码行号 */
	.content ::v-deep .line-numbers-rows {
		left: 0;
		position: relative;
		background: #EDEDED;
		border-right: 2px solid #A6ADC7;
		margin-right: 4px;
	}

	.content ::v-deep .line-numbers-rows > span::before {
		padding-right: .5em;
	}

	/* 代码区 */
	.content ::v-deep .codes {
		left: 3.6em;
		cursor: var(--text);
		position: absolute;
		min-width: calc(100% - 4.6em);
		padding-right: 1em;
	}

	/* 自定义代码着色 */
	.content ::v-deep .token.function {
		color: #777;
	}
	.content ::v-deep .token.class-name {
		color: #FF461F;
	}
	.content ::v-deep .token.generics .class-name {
		color: #777;
		font-weight: bold;
	}
	.content ::v-deep .token.comment {
		color: green;
	}
	.content ::v-deep .token.string {
		color: #FF7A9B;
		font-weight: bold;
	}
	.content ::v-deep .token.number {
		color: #CA6924;
	}
	.content ::v-deep .token.keyword,
	.content ::v-deep .token.boolean {
		color: #177CB0;
	}
	.content ::v-deep .token.punctuation {
		color: purple;
	}
	
	@media screen and (max-width: 900px) {
		.content ::v-deep img,
		.content ::v-deep audio,
		.content ::v-deep video,
		.content ::v-deep table,
		.content ::v-deep iframe {
			max-width: calc(100% - 1rem);
		}

		.content ::v-deep pre {
			width: calc(100% - 1rem - 12px);
		}
	}
</style>