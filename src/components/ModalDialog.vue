<template>
	<div :class="`root${$store.state.dialogBus.show ? ' show' : ''}`">
		<section :class="`pane${!$store.state.dialogBus.close ? ' show' : ''}`">
			<div :class="`icon ${$store.state.dialogBus.option.icon.toLowerCase()}`"></div>
			<h2 class="title" v-text="$store.state.dialogBus.option.title"></h2>
			<p class="content">
				<span v-text="content"></span>
				<span class="_"></span>
			</p>
			<div class="btns">
				<button
					v-text="$store.state.dialogBus.option.textOK"
					@click="ok()"
				></button>
				<button
					v-show="$store.state.dialogBus.option.useNO"
					v-text="$store.state.dialogBus.option.textNO"
					@click="no()"
				></button>
				<button
					v-show="$store.state.dialogBus.option.useCancel"
					v-text="$store.state.dialogBus.option.textCancel"
					@click="cancel()"
				></button>
			</div>
		</section>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Events from '@/helpers/Events';

export default defineComponent({
	data(): {
		content: string;
		} {
		return {
			content: ''
		}
	},
	computed: {
		isShow() {
			return this.$store.state.dialogBus.show;
		}
	},
	watch: {
		isShow(isShow) {
			if (isShow) {
				this.content = '';
				const data = this.$store.state.dialogBus.option.content;
				let i = 0;
				// 显示文本
				const timer = setInterval(() => {
					this.content += data[i++];
					if (i === data.length) {
						clearInterval(timer);
					}
				}, 20);
			}
		}
	},
	methods: {
		ok() {
			Events.emit('dialog-event', true);
		},
		no() {
			Events.emit('dialog-event', false);
		},
		cancel() {
			Events.emit('dialog-event', true);
		}
	}
})
</script>
<style scoped>
	.root {
		width: 100%;
		height: 100%;
		display: flex;
		position: fixed;
		visibility: hidden;
		align-items: center;
		justify-content: center;
	}
	.root.show {
		visibility: visible;
	}

	.pane {
		width: 400px;
		border: 2px solid #CCC;
		opacity: 0;
		padding: 0 8px 8px;
		display: flex;
		position: absolute;
		animation: dialog-open .3s cubic-bezier(.215, .61, .355, 1) 0s alternate forwards;
		transform: translateY(-100px) rotateX(-25deg) rotateY(16deg) scale(.985);
		background: #F6F6F6;
		transition: .5s;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .4);
		align-items: center;
		flex-direction: column;
	}

	.pane.show {
		opacity: 1;
		transform: translateY(-100px) rotateX(0) rotateY(0)  scale(1);
		transition: .8s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.icon {
		width: 66px;
		height: 64px;
		margin: 24px 0 16px 0;
		transform: translateX(2px);
	}

	.icon.error {
		background-position: 0 -448px;
	}

	.icon.warning {
		background-position: 0 -512px;
	}

	.icon.info {
		background-position: -66px -512px;
	}

	.icon.success {
		background-position: 0 -576px;
	}

	.title {
		font-weight: normal;
		margin-bottom: 16px;
	}

	.content {
		color: #333;
	}

	._ {
		width: 10px;
		display: inline-block;
		animation: flash 100ms linear 0s infinite alternate;
		transform: translate(2px, 1px);
		font-weight: bold;
		border-bottom: 2px solid #333;
	}

	.btns {
		padding: 24px 0 16px 0;
	}

	.btns button {
		margin: 0 12px;
		border: 1px solid #CCC;
		cursor: var(--default);
		padding: 6px 24px;
		font-size: 15px;
		box-shadow: 1px 1px 0px rgba(102, 102, 102, .3);
		border-radius: 0;
	}

	.btns button:hover {
		background: #E5E5E5;
	}

	.btns button:active {
		transform: translate(1px, 1px);
		box-shadow: none;
	}
</style>