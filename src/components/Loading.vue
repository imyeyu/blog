<template>
	<div class="root center">
		<div>
			<div class="flex center" v-show="!isFinished && !$store.state.isLoadingError">
				<div>加载中</div>
				<div class="_"></div>
			</div>
			<div v-show="isFinished && !$store.state.isLoadingError" v-text="finishText"></div>
			<div v-show="$store.state.isLoadingError">
				<span>加载失败 Σ(ﾟдﾟ;)，请尝试</span>
				<a href="javascript:;" @click="refreshEvent()">刷新</a>
			</div>
		</div>
		<div class="copyright">
			<p>朝朝频顾惜，夜夜不相忘</p>
			<p>
				<span>Copyright © 2017 - </span>
				<span v-text="new Date().getFullYear()"></span>
				<span> 夜雨 All Rights Reserved 版权所有</span>
			</p>
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
		refreshEvent: {
			type: Function,
			required: true
		},
		finishText: {
			type: String,
			default: '已加载所有内容 (◡ ᴗ ◡ ✿)'
		}
	}
});
</script>
<style scoped>
	@keyframes flash {
		0% {
			visibility: hidden;
		}
		49% {
			visibility: hidden;
		}
		50% {
			visibility: visible;
		}
		100% {
			visibility: visible;
		}
	}

	.root {
		width: 100%;
		height: 160px;
		background: url('~@/assets/img/comment-bottom.png') no-repeat;
		padding-top: 24px;
		line-height: 20px;
		background-position: left bottom;
	}

	._ {
		width: 10px;
		height: 18px;
		animation: flash 160ms linear 0s infinite alternate;
		font-weight: bold;
		border-bottom: 1px solid #333;
	}

	.copyright {
		color: #777;
		font-size: 12px;
		margin-top: 32px;
	}
</style>