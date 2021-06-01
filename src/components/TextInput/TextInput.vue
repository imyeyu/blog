<template>
	<div :class="`input-box${!label ? ' not-label' : ''}`">
		<slot></slot>
		<span
			:class="`label${text !== '' ? ' active' : ''}`"
			v-if="label !== ''"
			v-text="label"
		></span>
		<span
			v-if="isEnableTips"
			:class="`tips ${tipsLevel}`"
			v-text="tips"
			:style="`visibility: ${isVisibleTips ? 'visible' : 'hidden'}`"
		></span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		// 输入值
		text: {
			type: String,
			default: ''
		},
		// 标签
		label: {
			type: String,
			default: null
		},
		// 提示文本
		tips: {
			type: String,
			default: ''
		},
		// 提示等级 ['info', 'warn', 'error']
		tipsLevel: {
			type: String,
			default: 'info'
		},
		// 是否渲染提示
		isEnableTips: {
			type: Boolean,
			default: true
		},
		// 是否显示提示，需要 isEnableTips 为 true
		isVisibleTips: {
			type: Boolean,
			default: true
		}
	}
});
</script>
<style scoped>
	.input-box {
		width: 100%;
		margin: 24px 0 16px 0;
		display: flex;
		position: relative;
		text-indent: .2em;
		flex-direction: column;
	}

	.input-box.not-label {
		margin-top: 0;
	}
	
	.input {
		border: none;
		padding: 4px 0 2px 0;
		font-size: 15px;
		background: transparent;
		text-indent: .2em;
		font-family: "Consolas", "sans-serif", "Arial";
		border-bottom: 1px solid #FAC7D4;
		margin-bottom: 4px;
		border-radius: 0;
	}

	.input.outlined {
		border: 1px solid #FAC7D4;
		border-radius: 1px;
	}

	.input:focus {
		border-color: #525870;
	}

	.label {
		top: 4px;
		color: #777;
		position: absolute;
		font-size: 15px;
		transition: .3s cubic-bezier(.215, .61, .355, 1);
		text-indent: .2em;
		pointer-events: none;
	}
	
	.input.outlined + .label {
		left: 2px;
	}

	.input:focus + .label,
	.label.active {
		top: -18px;
		font-size: 12px;
		transition: .3s cubic-bezier(.215, .61, .355, 1);
	}

	.tips {
		color: #BBB;
		height: 16px;
		display: block;
		font-size: 13px;
	}

	.tips.warn {
		color: #F3A557 !important;
	}

	.tips.error {
		color: #FF3030 !important;
	}
</style>
