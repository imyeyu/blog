<template>
	<div class="content">
		<h1 class="title icon zpix24">注册账号</h1>
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
				tips="用于找回密码和回复提醒"
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
			user: {
				name: '',
				password: '',
				email: '',
			},
			captcha: '',
			pwConfirm: ''
		};
	},
	methods: {
		async register() {
			const user = await UserAPI.register(this.user, this.captcha);
			if (user) {
				this.$store.state.dialogBus.success(`UID：${user.id}\n用户名${user.name}\n现在你可以登录了！`, '注册成功');
			} else {
				(this.$refs.captcha as any).update();
			}
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
		padding-top: 30px;
		margin-bottom: 12px;
		border-bottom: 2px solid #BC9D9C;
		background-position: right -640px;
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