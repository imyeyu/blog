import { createStore } from 'vuex';
import Config from '@/helpers/Config'
import Scroller from '@/helpers/Scroller';
import DialogBus from '@/helpers/DialogBus'
import ArticleAPI from '@/api/ArticleAPI';

export default createStore({
	state: {
		config: new Config(),
		scroller: new Scroller(),
		dialogBus: new DialogBus(),
		articleHot: [],
	},
	mutations: {
		// 刷新热门文章
		async refreshArticleHot(state) {
			state.articleHot = await ArticleAPI.getArticleHot() as any;
		}
	},
	actions: {
	},
	modules: {
	}
});
