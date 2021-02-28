import { createStore } from 'vuex';
import Scroller from '@/helpers/Scroller';

export default createStore({
	state: {
		scroller: new Scroller(),
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
});
