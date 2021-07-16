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
		ArticleTopRanking: [],
		signedInUser: {},
		isLoadingError: false
	},
	mutations: {
		// 刷新热门文章
		async refreshArticleTopRanking(state) {
			state.ArticleTopRanking = await ArticleAPI.getTopRanking() as any;
		},
		// 缓存登录用户
		signedInUser(state, user: UserSignedIn) {
			state.signedInUser = user;
			state.storage.set('signedInUser', {
				id: user.id,
				name: user.name,
				token: user.token,
				data: user.data
			});
		},
		// 修改标签标题（自动加后缀，当为空是无后缀）
		webTitle(state, title: string) {
			if (title) {
				document.title = title + ' - 夜雨博客';
			} else {
				document.title = '夜雨博客';
			}
		}
	}
});
export default store;