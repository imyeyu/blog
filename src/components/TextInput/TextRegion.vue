<template>
	<text-input
		:label="label"
		:tips="tips"
		:tipsLevel="tipsLevel"
		:isVisibleTips="isVisibleTips"
		:text="text"
	>
		<textarea
			ref="input"
			class="input outlined"
			spellcheck="false"
			autocomplete="off"
			v-model="text"
			rows="5"
			@input="onInput"
			:placeholder="placeholder"
		>
		</textarea>
	</text-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextInput from './TextInput.vue';

export default defineComponent({
	components: {
		TextInput
	},
	props: {
		// 标签
		label: {
			type: String,
			default: null
		},
		// 值
		value: {
			type: String,
			default: ''
		},
		// INPUT 提示
		placeholder: {
			type: String,
			default: ''
		},
		// 是否圆角矩形
		outlined: {
			type: Boolean,
			default: false
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
		// 是否显示提示
		isVisibleTips: {
			type: Boolean,
			default: true
		}
	},
	data(): {
		text: string
		} {
		return {
			text: this.value
		};
	},
	watch: {
		value() {
			this.text = this.value;
		}
	},
	mounted() {
		this.text = this.value;
	},
	methods: {
		onInput() {
			this.$emit('update:value', this.text);
		},
		requestFocus() {
			const input = this.$refs.input as HTMLTextAreaElement;
			input.focus();
		}
	}
});
</script>
