<template>
	<div class="item user">
		<div :class="`title${isSignedIn ? '': ' icon'}`">
			<div class="signed-in-user" v-if="isSignedIn">
				<img
					width="32"
					height="32"
					:src="`/img/user/${userSignedIn.data.avatar ? userSignedIn.data.avatar : 'avatar.png' }`"
					:alt="`${userSignedIn.name} 头像`"
				/>
				<h1 class="name zpix24" v-text="userSignedIn.name"></h1>
			</div>
		</div>
		<div class="content">
			<template v-if="isSignedIn">
				<p>欢迎登录，个人中心</p>
				<a href="#" @click="signOut()">退出登录</a>
			</template>
			<template v-else>
				<div class="input-btn">
					<input
						id="user"
						class="input"
						type="text"
						tabindex="10"
						spellcheck="false"
						placeholder="UID、邮箱或用户名"
						autocomplete="off"
						v-model="userSignIn.user"
					/>
					<span class="border-line"></span>
					<router-link to="/user/register">注册</router-link>
				</div>
				<div class="input-btn">
					<input
						id="password"
						class="input"
						type="password"
						tabindex="11"
						spellcheck="false"
						placeholder="密码"
						autocomplete="off"
						v-model="userSignIn.password"
					/>
					<span class="border-line"></span>
					<a href="javascript:;" @click="$store.state.dialogBus.warning('暂时不可用')">找回密码</a>
				</div>
				<div class="input-btn">
					<captcha ref="captcha" :width="74" :height="24" from="SIGNIN" />
					<input
						id="captcha"
						class="input"
						type="text"
						tabindex="12"
						spellcheck="false"
						placeholder="验证码"
						autocomplete="off"
						v-model="userSignIn.captcha"
						@keydown.enter="signIn()"
					/>
					<span class="border-line"></span>
					<button id="sign-in" @click="signIn()"></button>
				</div>
			</template>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Captcha from '@/components/Captcha.vue';
import { UserSignedIn, UserSignIn } from '@/type/User';
import UserAPI from '@/api/UserAPI';

export default defineComponent({
	components: {
		Captcha
	},
	data(): {
		userSignIn: UserSignIn;
		userSignedIn?: UserSignedIn;
		} {
		return {
			userSignIn: {
				user: '',
				password: '',
				captcha: ''
			}
		};
	},
	computed: {
		isSignedIn(): boolean {
			return this.userSignedIn && this.userSignedIn.id;
		},
		// 已登录用户
		userSignedIn: {
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
				this.userSignedIn = user;
			} else {
				(this.$refs.captcha as any).update();
			}
		},
		async signOut() {
			const isSuccessed = await UserAPI.signOut(this.userSignedIn.id, this.userSignedIn.token);
			if (isSuccessed) {
				this.$store.commit('signedInUser', {});
				this.$nextTick(() => {
					(this.$refs.captcha as any).update();
				});
			}
		}
	}
});
</script>
<style scoped>
	.user .title {
		background-position: 6px -172px;
	}

	.user .signed-in-user {
		display: flex;
	}

	.user .name {
		margin: 0;
	}

	.user .content {
		width: 80%;
		padding: 8px 0 16px 0;
	}

	.input-btn {
		width: 100%;
		height: 32px;
		display: flex;
		position: relative;
		font-size: 12px;
		align-items: center;
		justify-content: space-between;
	}

	.input-btn:nth-child(n + 3) {
		border-top: none;
	}

	.input-btn .input {
		height: 100%;
		border: none;
		padding: 0;
		font-size: 12px;
		background: transparent;
		text-indent: .5em;
	}

	.input-btn .input + .border-line {
		width: 100%;
		height: 1px;
		bottom: 0;
		position: absolute;
		background: #FAC7D4;
	}

	.input-btn .input:focus + .border-line {
		background: #525870;
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
		position: relative;
		box-sizing: content-box;
		background: transparent;
	}

	#sign-in::before {
		content: "";
		top: 0;
		left: 0;
		width: 32px;
		height: 32px;
		position: absolute;
		background: var(--random-icon);
		background-position: 7px -382px;
	}

	#sign-in:active::before {
		left: 4px;
	}
</style>