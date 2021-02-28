<template>
	<div class="root zpix24 center">
		<div class="flex center" v-show="!isFinished && !isError">
			<div>加载中</div>
			<div class="_"></div>
		</div>
		<div v-show="isFinished && !isError" v-text="finishText"></div>
		<div v-show="isError">
			<span>加载失败 Σ(ﾟдﾟ;)，请尝试</span>
			<a href="javascript:;" @click="refreshEvent">刷新</a>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		isFinished: {
			type: Boolean,
			default: false
		},
		isError: {
			type: Boolean,
			default: false
		},
		refreshEvent: {
			type: Function,
			default: () => console.log('do refresh')
		},
		finishText: {
			type: String,
			default: '已加载所有内容 (◡ ᴗ ◡ ✿)'
		}
	}
});
</script>
<style scoped>
	.root {
		width: 100%;
		height: 160px;
		background: url('~@/assets/img/comment-bottom.png') no-repeat;
		padding-top: 24px;
		background-position: left bottom;
	}

	._ {
		width: 12px;
		height: 28px;
		animation: flash 100ms linear 0s infinite alternate;
		font-weight: bold;
		border-bottom: 2px solid #333;
	}
</style>