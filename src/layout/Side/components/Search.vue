<template>
	<div class="item search">
		<div :class="`title${searchKey ? ' inputing' : ''}`">
			<input
				spellcheck="false"
				autofocus
				v-model="searchKey"
				@keyup.enter="$store.state.dialogBus.warning('暂时不可用')"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data(): {
		searchKey: string;
		} {
		return {
			searchKey: ''
		};
	}
});
</script>
<style scoped>
	.search .title::before {
		content: "";
		top: 0;
		left: 0;
		width: 100px;
		height: 36px;
		overflow: hidden;
		position: absolute;
		background: var(--random-icon);
		pointer-events: none;
		background-position: 6px -220px;
	}

	.search .title.inputing::before {
		width: 36px;
	}

	.search input {
		width: calc(100% - 46px);
		border: none;
		display: inline-block;
		background: transparent;
	}
</style>