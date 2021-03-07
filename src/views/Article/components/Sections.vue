<template>
	<div
		class="content"
		v-html="data"
		@dblclick="toggleCodes"
	></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		data: {
			type: String,
			requied: true
		}
	},
	methods: {
		// 双击代码区事件（旧结构）
		toggleCodes(e: any) {
			const els = e.path;
			for (const el of els) {
				if (el.className === 'codeContent') {
					const height = el.style.maxHeight.replace("px", "");
					if (height != "") {
						if (400 < height) {
							el.style.maxHeight = '400px';
						} else {
							el.style.maxHeight = el.getElementsByTagName("code").length * 18.5 + "px";
						}
					}
					return;
				}
			}
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

	.content >>> p {
		padding: 0 4px;
		line-height: 2;
		text-indent: 2em;
	}

	.content >>> table {
		margin: 6px 2em;
		text-indent: 0;
	}

	.content >>> ul {
		list-style: disc;
		padding-left: 4em;
	}

	.content >>> ol {
		list-style: decimal;
		padding-left: 4em;
	}

	.content >>> img {
		border: 1px solid #CFD2E0;
		margin: 0 auto;
		max-width: 90%;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .3);
	}

	.content >>> dt,
	.content >>> dd,
	.content >>> ul li,
	.content >>> ol li {
		line-height: 1.6em;
	}

	.content >>> dl,
	.content >>> dd {
		font-size: 15px;
		padding-left: 2em;
	}

	.content >>> dl dt {
		font-weight: bold;
	}

	.content >>> dd ol {
		padding-left: 2em;
	}

	.content >>> iframe {
		margin: 0 auto;
		border: 1px solid #CFD2E0;
		display: block;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .3);
	}

	.content >>> audio,
	.content >>> video {
		width: 90%;
		margin: 16px 0;
		border: 1px solid #CFD2E0;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .3);
		border-radius: 4px;
	}

	/* 代码区（兼容性保留） */
	.content >>> .codeBox {
		margin: 20px auto;
		border: 1px solid #CFD2E0;
		font-size: 14px;
		background: #F7F7F7;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .3);
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