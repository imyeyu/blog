<template>
	<div class="content" v-html="data"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		data: {
			type: String,
			requied: true
		}
	}
});
</script>
<style scoped>
	.content {
		font-size: 15px;
		line-height: 1.8;
		word-spacing: 1px;
	}

	.content >>> h3 {
		margin: 6px 0;
		background: linear-gradient(to right, #CDDEF0 50%, #F4F4F4 100%);
		padding-left: 8px;
	}

	.content >>> section {
		padding-right: 12px;
	}

	.content >>> p {
		padding: 0 4px;
		line-height: 2;
		text-indent: 2em;
	}

	.content >>> table {
		margin: 6px 2em;
		text-indent: 0;
	}
	/* 代码区 */
	.content >>> .codeBox {
		width: 700px;
		margin: 20px auto;
		border: 1px solid #525870;
		font-size: 14px;
		background: #F7F7F7;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .4);
		line-height: 1;
	}

	.content >>> .codeTitle {
		border-bottom: 2px solid #6CE26C;
	}

	.content >>> .codeTitle span {
		display: inline-block;
		padding: 0 6px;
		line-height: 25px;
	}

	.content >>> .codeTitle span:first-child {
		font-weight: bold;
	}

	.content >>> .codeTitle span:last-child {
		color: #777;
		float: right;
		font-size: 12px;
	}

	.content >>> .codeContent {
		overflow: auto;
		transition: 800ms ease;
	}

	.content >>> .lineNum {
		color: #777;
		width: 26px;
		display: inline-block;
		font-size: 14px;
		text-align: right;
		background: #EDEDED;
		line-height: 18px;
		margin-right: 4px;
		border-right: 2px solid #6CE26C;
		padding-right: 6px;
	}

	.content >>> .lineNum:before {
		content: attr(data);
	}

	.content >>> .codes {
		cursor: var(--text);
	}

	.content >>> .codes code {
		height: 18px;
		display: block;
		white-space: pre;
		font-family: "Consolas", "sans-serif";
	}

	.content >>> .codes code:hover {
		background: #FBF2DB;
	}

	.content >>> .codes code:last-child,
	.content >>> .codes code:last-child span {
		height: 22px;
	}
</style>