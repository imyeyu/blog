<template>
	<img class="captcha" v-if="src" :width="width" :height="height" :src="src" alt="验证码" @click="update()" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { random } from '@/helpers/Toolkit';

export default defineComponent({
	props: {
		// 绘制宽度
		width: {
			type: Number,
			required: true
		},
		// 绘制高度
		height: {
			type: Number,
			required: true
		},
		// 来自模块
		from: {
			type: String,
			required: true
		}
	},
	data(): {
		src: string;
		} {
		return {
			src: ''
		};
	},
	methods: {
		update() {
			this.src = `${process.env.VUE_APP_API_HOST}/captcha?from=${this.from}&width=${this.width}&height=${this.height}&r=${random(999999)}`;
		}
	},
	mounted() {
		this.update();
	}
});
</script>
<style scoped>
	.captcha {
		pointer-events: all;
	}
</style>