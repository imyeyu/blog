<template>
	<article>
		<h2 class="title zpix24">标题</h2>
		<sections :data="data"></sections>
	</article>
	<comment :aid="getId"></comment>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ArticleAPI from '@/api/ArticleAPI';
import Sections from './components/Sections.vue';
import Comment from './components/Comment.vue';

export default defineComponent({
	components: {
		Sections,
		Comment
	},
	data(): {
		data: string;
		} {
		return {
			data: ''
		}
	},
	computed: {
		getId(): number {
			return this.$route.params.id as unknown as number;
		}
	},
	async mounted() {
		const result = await ArticleAPI.getArticle(this.getId);
		this.data = result.data as string;
	}
});
</script>
<style>

</style>