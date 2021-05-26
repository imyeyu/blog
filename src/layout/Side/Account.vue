<template>
	<div class="item user">
		<div class="title icon"></div>
		<div class="content">
			<template v-if="signedInUser && signedInUser.id">
				<p>已登录，欢迎 {{ signedInUser.name }}</p>
			</template>
			<template v-else>
				<div class="input-btn">
					<input id="user" type="text" placeholder="UID、邮箱或用户名" spellcheck="false" autocomplete="off" v-model="userSignIn.user" />
					<router-link to="/user/register">注册</router-link>
				</div>
				<div class="input-btn">
					<input id="password" type="password" placeholder="密码" spellcheck="false" autocomplete="off" v-model="userSignIn.password" />
					<a href="javascript:;" @click="$store.state.dialogBus.warning('暂时不可用')">找回密码</a>
				</div>
				<div class="input-btn">
					<captcha :width="74" :height="24" from="SIGNIN" />
					<input id="captcha" type="text" placeholder="验证码" spellcheck="false" autocomplete="off" v-model="userSignIn.captcha" />
					<button id="sign-in" class="icon" @click="signIn()"></button>
				</div>
			</template>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { async } from '@/helpers/Toolkit';
import { calcDifference } from '@/helpers/UnixTime';
import Captcha from '@/components/Captcha.vue';
import { UserVO, UserSignIn } from '@/type/User';
import UserAPI from '@/api/UserAPI';

export default defineComponent({
	components: {
		Captcha,
	},
	data(): {
		userSignIn: UserSignIn;
		signedInUser?: UserVO;
		} {
		return {
			userSignIn: {
				user: '',
				password: '',
				captcha: ''
			}
		}
	},
	computed: {
		// 已登录用户
		signedInUser: {
			set(user) {
				this.$store.commit('signedInUser', user);
			},
			get() {
				return this.$store.state.signedInUser;
			}
		}
	},
	methods: {
		async signIn() {
			const user = await UserAPI.signIn(this.userSignIn);
			if (user) {
				this.signedInUser = user;
			} else {
				this.$store.state.dialogBus.error('登录失败');
			}
		}
	},
	mounted() {
		let signedInUser = this.$store.state.storage.get('signedInUser');
		if (signedInUser) {
			const diff = calcDifference(new Date(signedInUser.updatedAt));
			const day = 864 * 1E5;
			if (day < diff.l) {
				// 缓存登录用户超过一天，重新获取登录状态
				async(() => {
					if (UserAPI.isSignedIn(signedInUser.id, signedInUser.token)) {
						// 后端还是登录状态
						this.signedInUser.updatedAt = new Date().getTime();
						this.$store.commit('signedInUser', signedInUser);
					} else {
						this.$store.commit('signedInUser', {});
						delete this.signedInUser;
					}
				})
			} else {
				this.$store.commit('signedInUser', signedInUser);
			}
		}
	}
});
</script>
<style scoped>
	.user .title {
		background-position: 6px -172px;
	}

	.user .content {
		width: 80%;
		padding: 8px 0 16px 0;
	}

	.input-btn {
		width: 100%;
		height: 32px;
		display: flex;
		font-size: 12px;
		align-items: center;
		border-bottom: 2px solid #EED7D7;
		justify-content: space-between;
	}

	.input-btn:nth-child(n + 3) {
		border-top: none;
	}

	.input-btn input {
		height: 100%;
		border: none;
		padding: 0;
		font-size: 12px;
		background: transparent;
		text-indent: .5em;
		border-radius: 0;
	}

	#user,
	#password {
		width: 120px;
	}

	#captcha {
		width: 100%;
	}

	#sign-in {
		width: 20%;
		height: 100%;
		border: none;
		box-sizing: content-box;
		background-position: 0 -382px;
	}

	#sign-in:active {
		transform: translateX(4px);
	}
</style>