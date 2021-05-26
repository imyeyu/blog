import { createStore } from 'vuex';
import Storage from '@/helpers/Storage'
import Scroller from '@/helpers/Scroller';
import DialogBus from '@/helpers/DialogBus'
import ArticleAPI from '@/api/ArticleAPI';
import { UserVO } from '@/type/User';

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
		signedInUser(state, user: UserVO) {
			console.log('update user', user);
			
			state.signedInUser = user;
			state.storage.set('signedInUser', {
				id: user.id,
				email: user.email,
				name: user.name,
				token: user.token,
				updatedAt: new Date().getTime()
			});
		}
	},
	actions: {
	},
	modules: {
	}
});
