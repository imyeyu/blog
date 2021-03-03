<template>
	<div class="content">
		<h1 class="title icon zpix24">注册账号</h1>
		<div class="form">
			<text-field
				label="用户名"
				tips="支持中文、字母及数字组合，可用于登录"
				v-model:value="user.userName"
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
				tips="用于找回密码和回复提醒"
				v-model:value="user.userName"
			></text-field>
			<div class="captcha">
				<text-field
					label="验证码"
					v-model:value="captcha"
				></text-field>
				<div style="padding-top: 26px">
					<img src="https://www.imyeyu.net/ajax/getCheckCode?from=login&width=90&height=28" alt="验证码" />
				</div>
			</div>
		</div>
		<button class="run zpix24">注册</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '@/type/User.ts';
import TextField from '@/components/TextInput/TextField.vue';

export default defineComponent({
	components: {
		TextField
	},
	data(): {
		user?: User;
		title?: String;
		captcha: String;
		pwConfirm: String;
		} {
		return {
			user: {
				userName: '',
				password: '',
				email: '',
			},
			captcha: '',
			pwConfirm: ''
		};
	},
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
		padding-top: 30px;
		margin-bottom: 12px;
		border-bottom: 2px solid #BC9D9C;
		background-position: right -640px;
	}

	.form {
		width: 80%;
		margin: 0 auto;
	}

	.captcha {
		display: flex;
		justify-content: flex-start;
	}

	.run {
		width: 32%;
		margin: 32px auto;
		border: 2px solid #E1E1E1;
		box-shadow: 2px 2px 0px rgba(102, 102, 102, .6);
	}

	.run:hover {
		background: #E8E8E8;
	}

	.run:active {
		transform: translate(2px, 2px);
		box-shadow: none;
	}
</style>