<template>
	<div class="item user">
		<div class="title icon"></div>
		<div class="content">
			<div class="input-btn">
				<input id="user" type="text" placeholder="UID、邮箱或用户名" spellcheck="false" autocomplete="off" v-model="userSignin.user" />
				<router-link to="/user/register">注册</router-link>
			</div>
			<div class="input-btn">
				<input id="password" type="password" placeholder="密码" spellcheck="false" autocomplete="off" v-model="userSignin.password" />
				<a href="javascript:;" @click="$store.state.dialogBus.warning('暂时不可用')">找回密码</a>
			</div>
			<div class="input-btn">
				<captcha :width="74" :height="24" from="SIGNIN" />
				<input id="captcha" type="text" placeholder="验证码" spellcheck="false" autocomplete="off" v-model="userSignin.captcha" />
				<button id="signin" class="icon" @click="signin()"></button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Captcha from '@/components/Captcha.vue';
import { UserSignin } from '@/type/User';

export default defineComponent({
	components: {
		Captcha,
	},
	data(): {
		searchKey: string;
		userSignin: UserSignin;
		} {
		return {
			searchKey: '',
			userSignin: {
				user: '',
				password: '',
				captcha: ''
			}
		}
	},
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

	#signin {
		width: 20%;
		height: 100%;
		border: none;
		box-sizing: content-box;
		background-position: 0 -382px;
	}

	#signin:active {
		transform: translateX(4px);
	}
</style>