<template>
	<div class="content">
		<h1 class="title zpix24">注册账号</h1>
		<div class="form">
			<text-field
				label="用户名"
				tips="支持中文、字母及数字组合，可用于登录"
				v-model:value="user.name"
			></text-field>
			<text-field
				label="密码"
				type="password"
				tips="支持字母、数字及基础符号组合"
				v-model:value="user.password"
			></text-field>
			<text-field
				label="确认密码"
				tips="两次密码不一致"
				type="password"
				:isVisibleTips="pwConfirm !== '' && pwConfirm !== user.password"
				v-model:value="pwConfirm"
			></text-field>
			<text-field
				label="邮箱（可选）"
				type="email"
				tips="用于登录、找回密码和回复提醒"
				v-model:value="user.email"
			></text-field>
			<div class="captcha-box">
				<text-field
					label="验证码"
					v-model:value="captcha"
				></text-field>
				<div style="padding-top: 26px">
					<captcha ref="captcha" :width="74" :height="24" from="REGISTER" />
				</div>
			</div>
		</div>
		<button class="run zpix24" @click="register()">注册</button>
	</div>
	<loading :isFinished="true" finishText="" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/type/User';
import store from '@/store/index';
import UserAPI from '@/api/UserAPI';
import Captcha from '@/components/Captcha.vue';
import TextField from '@/components/TextInput/TextField.vue';
import Loading from '@/components/Loading.vue';

export default defineComponent({
	components: {
		Loading,
		Captcha,
		TextField
	},
	data(): {
		user: User;
		title?: string;
		captcha: string;
		pwConfirm: string;
		} {
		return {
			user: {},
			captcha: '',
			pwConfirm: ''
		};
	},
	methods: {
		async register() {
			store.state.loader.run(async () => {
				const signedInUser = await UserAPI.register(this.user, this.captcha);
				(this.$refs.captcha as any).update();
				if (signedInUser && signedInUser.id) {
					// 自动登录
					signedInUser.data = await UserAPI.getData(signedInUser.id);
					this.$store.commit('signedInUser', signedInUser);
					
					await this.$store.state.dialogBus.success(`UID：${signedInUser.id}，已为你自动登录！`, `欢迎 ${signedInUser.name} ！`);
					this.$router.push('/');
				}
			});
		}
	}
});
</script>
<style scoped>
	.content {
		width: 80%;
		margin: 48px auto 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.title {
		width: 100%;
		position: relative;
		padding-top: 32px;
		margin-bottom: 12px;
		border-bottom: 2px solid #BC9D9C;
	}

	.title::after {
		content: "";
		top: 0;
		right: 0;
		width: 64px;
		height: 64px;
		position: absolute;
		background: var(--random-icon);
		background-position: left -640px;
	}

	.form {
		width: 80%;
		margin: 0 auto;
	}

	.captcha-box {
		width: 10rem;
		display: flex;
	}

	.run {
		color: #FFF;
		width: 32%;
		margin: 32px auto;
		border: none;
		padding: 2px 24px;
		font-size: 15px;
		background: #53BD93;
	}

	.run:hover {
		background: #5AC79B;
	}
</style>