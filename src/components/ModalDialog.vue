<template>
	<div :class="`dialog${$store.state.dialogBus.isShow ? ' show' : ''}`" @click="clickDialog">
		<section :class="`pane${!$store.state.dialogBus.isClose ? ' show' : ''}`">
			<div class="loading" v-if="$store.state.dialogBus.isLoading">
				<div
					:class="`line l${i} ${loadingI % 5 === i ? 'active' : ''}`"
					v-for="i in 4"
					:key="i"
				></div>
			</div>
			<div
				v-else
				:class="`icon ${$store.state.dialogBus.option.icon.toLowerCase()}`"
			></div>
			<h2 class="title" v-text="$store.state.dialogBus.option.title"></h2>
			<p class="title-sub" v-text="$store.state.dialogBus.option.titleSub"></p>
			<p class="content" v-html="$store.state.dialogBus.option.content"></p>
			<div class="btns" v-show="!$store.state.dialogBus.isLoading">
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
		loadingI: number;
		loadingTimer: any;
		} {
		return {
			loadingI: 0,
			loadingTimer: undefined
		};
	},
	methods: {
		clickDialog(e: any) {
			if (e.target.className === 'dialog show') {
				Events.emit('dialog-event', false);
			}
		},
		ok() {
			Events.emit('dialog-event', true);
		},
		no() {
			Events.emit('dialog-event', false);
		},
		cancel() {
			Events.emit('dialog-event', false);
		}
	},
	mounted() {
		clearInterval(this.loadingTimer);
		let flag = false;
		this.loadingTimer = setInterval(() => {
			if (flag) {
				this.loadingI--;
				flag = 1 < this.loadingI;
			} else {
				this.loadingI++;
				flag = this.loadingI === 4;
			}
		}, 120);
	}
});
</script>
<style scoped>
	.dialog {
		width: 100%;
		height: 100%;
		display: flex;
		z-index: 99;
		position: fixed;
		visibility: hidden;
		align-items: center;
		justify-content: center;
	}
	.dialog.show {
		visibility: visible;
	}

	.pane {
		width: 440px;
		border: 1px solid #DDD;
		opacity: 0;
		padding: 0 8px 8px;
		display: flex;
		position: absolute;
		animation: dialog-open .3s cubic-bezier(.215, .61, .355, 1) 0s alternate forwards;
		transform: translateY(-100px) scale(.8);
		background: rgba(255, 255, 255, .8);
		transition: .2s;
		min-height: 260px;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, .3);
		align-items: center;
		flex-direction: column;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.pane.show {
		opacity: 1;
		transform: translateY(-100px) scale(1);
		transition: .3s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.loading {
		height: 64px;
		margin: 24px 0 6px 0;
		display: flex;
		align-items: flex-end;
	}

	.loading .line {
		width: 8px;
		background: #BBB;
		margin-right: 4px;
	}

	.loading .line.active {
		background: #53BD93;
	}

	.loading .l1 {
		height: 10px;
	}

	.loading .l2 {
		height: 14px;
	}

	.loading .l3 {
		height: 18px;
	}

	.loading .l4 {
		height: 24px;
	}

	.icon {
		width: 66px;
		height: 64px;
		margin: 24px 0 6px 0;
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
		margin: 8px 0;
		font-weight: normal;
	}

	.title-sub {
		color: #777;
		font-size: 13px;
		margin-bottom: 12px;
	}

	.content {
		color: #333;
	}

	.btns {
		padding: 24px 0 16px 0;
	}

	.btns button {
		margin: 0 12px;
		border: 1px solid #EED7D7;
		cursor: var(--default);
		padding: 2px 24px;
		font-size: 15px;
		background: #F4F4F4;
	}

	.btns button:hover {
		background: #EED7D7;
	}
</style>