import { createStore } from 'vuex';
import Scroller from '@/helpers/Scroller';
import DialogBus from '@/helpers/DialogBus'
import ArticleAPI from '@/api/ArticleAPI';

export default createStore({
	state: {
		scroller: new Scroller(),
		dialogBus: new DialogBus(),
		articleHot: [],
	},
	mutations: {
		async refreshArticleHot(state) {
			state.articleHot = await ArticleAPI.getArticleHot() as any;
		}
	},
	actions: {
	},
	modules: {
	}
});
