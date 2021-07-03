import { createStore } from 'vuex';
import Loader from '@/helpers/Loader';
import Storage from '@/helpers/Storage';
import Scroller from '@/helpers/Scroller';
import DialogBus from '@/helpers/DialogBus';
import ArticleAPI from '@/api/ArticleAPI';
import { UserSignedIn } from '@/type/User';

const store = createStore({
	state: {
		loader: new Loader(),
		storage: new Storage(),
		scroller: new Scroller(),
		dialogBus: new DialogBus(),
		articleHot: [],
		signedInUser: {},
		isLoadingError: false
	},
	mutations: {
		// 刷新热门文章
		async refreshArticleHot(state) {
			state.articleHot = await ArticleAPI.getArticleHot() as any;
		},
		signedInUser(state, user: UserSignedIn) {
			state.signedInUser = user;
			state.storage.set('signedInUser', {
				id: user.id,
				name: user.name,
				token: user.token,
				data: user.data
			});
		}
	}
});
export default store;