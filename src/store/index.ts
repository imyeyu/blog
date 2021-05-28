import { createStore } from 'vuex';
import Storage from '@/helpers/Storage'
import Scroller from '@/helpers/Scroller';
import DialogBus from '@/helpers/DialogBus'
import ArticleAPI from '@/api/ArticleAPI';
import { UserToken } from '@/type/User';

export default createStore({
	state: {
		storage: new Storage(),
		scroller: new Scroller(),
		dialogBus: new DialogBus(),
		articleHot: [],
		signedInUser: {},
	},
	mutations: {
		// 刷新热门文章
		async refreshArticleHot(state) {
			state.articleHot = await ArticleAPI.getArticleHot() as any;
		},
		signedInUser(state, user: UserToken) {
			state.signedInUser = user;
			state.storage.set('signedInUser', {
				id: user.id,
				name: user.name,
				token: user.token
			});
		}
	},
	actions: {
	},
	modules: {
	}
});
