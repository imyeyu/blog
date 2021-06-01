<template>
	<article>
		<h2 class="title zpix24">关于我</h2>

		<sections :data="article.data"></sections>
		<p
			class="right light-gray"
			style="padding-right: 6px"
			v-text="toDateTime(article.createdAt, article.updatedAt)"
		>
		</p>
		<div class="spec center">
			<img class="inline-block" :src="require('@/assets/img/nagiasu.png')" alt="Nagiasu" />
			<div class="canvas" @click="toggleBGM">
				<canvas ref="canvas" width="520" height="80"></canvas>
			</div>
			<audio ref="player">
				<source :src="require('@/assets/media/fragile.mp3')" type="audio/mpeg" />
			</audio>
			<p class="survival-time light-gray" v-text="survivalTime"></p>
		</div>
	</article>
	<comment :aid="1"></comment>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { paddingZero } from '@/helpers/Toolkit';
import { toDateTime } from '@/helpers/UnixTime';
import ArticleAPI from '@/api/ArticleAPI';
import { Article } from '@/type/Article';
import Sections from './components/Sections.vue';
import Comment from './components/Comment.vue';

export default defineComponent({
	components: {
		Sections,
		Comment
	},
	data(): {
		article: Article;
		player?: HTMLAudioElement;
		specRender?: number;
		survivalTime: string;
		survivalTimer?: number;
		} {
		return {
			article: {},
			survivalTime: '网站已运行 0000 年 000 天 00 小时 00 分钟 00 秒'
		};
	},
	methods: {
		f(v : number) : number {
			return Math.floor(v);
		},
		toDateTime(unixCreated: number, unixUpdated: number) : string {
			if (unixCreated || unixUpdated) {
				return '最后编辑时间：' + toDateTime(unixUpdated ? unixUpdated : unixCreated);
			} else {
				return '';
			}
		},
		// 计时
		calSurvivalTime() {
			const begin = new Date('2017/10/9 22:32:52');
			this.survivalTimer = setInterval(() => {
				var now = new Date();

				let s = 1000, m = 6e4, h = 36e5, d = 864e5, y = 31536e6;
				let l = now.getTime() - begin.getTime();
				let ry = this.f(l / y),
					rd = this.f((l / d) - ry * 365),
					rh = this.f((l - (ry * 365 + rd) * d) / h),
					rm = this.f((l - (ry * 365 + rd) * d - rh * h) / m),
					rs = this.f((l - (ry * 365 + rd) * d - rh * h - rm * m) / s);

				this.survivalTime = `网站已运行 ${ry} 年 ${rd} 天 ${rh} 小时 ${paddingZero(rm)} 分钟 ${paddingZero(rs)} 秒`;
			}, 1000);
		},
		// 绘制频谱
		drawSpectrum() {
			let ctx : any = new AudioContext(),
				canvas = this.$refs.canvas as HTMLCanvasElement;

			ctx = new AudioContext();
			const analyser = ctx.createAnalyser();
			const audioSrc = ctx.createMediaElementSource(this.player);
			audioSrc.connect(analyser);
			analyser.connect(ctx.destination);

			const cWidth = canvas.width,
				cHeight = canvas.height - 2,
				meterWidth = 10,
				capHeight = 2,
				meterNum = 2400 / 12,
				capYPositionArray = [];
			ctx = canvas.getContext('2d');
			// 渐变
			const gradient = ctx.createLinearGradient(0, 0, 0, 100);
			gradient.addColorStop(1, '#A67D7B');
			gradient.addColorStop(0.5, '#A67D7B');
			gradient.addColorStop(0, '#A67D7B');

			const capStyle = '#A67D7B';
			
			const that = this;
			// 动画
			(function renderFrame() {
				const array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				const step = Math.round(array.length / meterNum);
				ctx.clearRect(0, 0, cWidth, cHeight);
				for (let i = 0; i < meterNum; i++) {
					const value = array[i * step];
					if (capYPositionArray.length < Math.round(meterNum)) {
						capYPositionArray.push(value);
					}
					ctx.fillStyle = capStyle;
					if (value < capYPositionArray[i]) {
						ctx.fillRect(4 + i * 12, cHeight - (--capYPositionArray[i] / 3.2), meterWidth, capHeight);
					} else {
						ctx.fillRect(4 + i * 12, cHeight - value / 3.2, meterWidth, capHeight);
						capYPositionArray[i] = value;
					}
					ctx.fillStyle = gradient;
					ctx.fillRect(4 + i * 12, cHeight - value / 3.2 + capHeight, meterWidth, cHeight);
				}
				that.specRender = requestAnimationFrame(renderFrame);
			})();
		},
		toggleBGM() {
			if (this.player) {
				if (this.player.paused) {
					this.player.play();
				} else {
					this.player.pause();
				}
			}
		}
	},
	async mounted() {
		this.article = await ArticleAPI.getArticle(1);

		// 计时
		this.calSurvivalTime();

		// 频谱
		this.player = this.$refs.player as HTMLAudioElement;
		this.player.volume = .1;
		this.player.play();
		this.drawSpectrum();
	},
	beforeUnmount() {
		clearInterval(this.survivalTimer);
		if (this.specRender) {
			cancelAnimationFrame(this.specRender);
		}
	}
});
</script>
<style scoped>
	.title {
		margin: 48px 0 32px 0;
		position: relative;
		text-align: center;
	}

	.title:before,
	.title:after {
		content: "";
		top: 50%;
		width: 90px;
		height: 2px;
		position: absolute;
		background: #CDDEF0;
	}

	.title:before {
		left: calc(50% - 160px);
	}

	.title:after {
		right: calc(50% - 160px);
	}

	.spec {
		position: relative;
		padding-bottom: 16px;
	}

	.canvas {
		left: 50%;
		bottom: 40px;
		position: absolute;
		margin-left: -260px;
	}

	.canvas::before {
		content: '点击 播放/暂停';
		left: 0;
		color: #F30;
		width: 100%;
		bottom: 10px;
		position: absolute;
		font-size: 13px;
		text-align: center;
		visibility: hidden;
	}

	.canvas:hover canvas {
		opacity: .5;
	}

	.canvas:hover::before {
		visibility: visible;
	}

	.survival-time {
		height: 16px;
		font-size: 13px;
	}
</style>