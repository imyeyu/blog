<template>
	<div id="leafs" :style="`top: ${scrollTop}px`">
		<div :ref="`leaf${i - 1}`" class="leaf icon" v-for="i in leafSize" :key="i"></div>
	</div>
	<div id="main">
		<side id="aside" ref="aside"></side>
		<section id="content">
			<router-view :key="$route.path" />
		</section>
	</div>
	<modal-dialog />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Side from '@/layout/Side.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import { random } from '@/helpers/Toolkit';

class Leaf {
	x = 0;
	y = 0;
	bgI = 0;
}

export default defineComponent({
	components: {
		Side,
		ModalDialog
	},
    data(): {
		docEl: HTMLElement;
		scrollTop: number;
		// 叶子
		leafs: Leaf[];
		leafEls: HTMLElement[];
		leafSize: number;
		leafTimer?: number;
        } {
        return {
			docEl: document.documentElement,
			scrollTop: 0,
			// 叶子
			leafs: [],
			leafEls: [],
			leafSize: 12,
			leafTimer: undefined
        };
    },
	methods: {
		onScroll(top: number) {
			this.scrollTop = top;
		}
	},
    mounted() {
		// 初始化叶子
		for (let i = 0; i < this.leafSize; i++) {
			this.leafEls.push(this.$refs[`leaf${i}`] as HTMLElement);
			this.leafs[i] = new Leaf();
			this.leafs[i].x = random(-618, 0);
			this.leafs[i].y = random(-this.docEl.clientWidth * 0.618, this.docEl.clientWidth * 0.5);
		}
		// 掉落叶子
		this.leafTimer = setInterval(() => {
			for (let i = 0; i < this.leafSize; i++) {
				const leaf = this.leafs[i];
				if (this.docEl.clientWidth < leaf.x || this.docEl.clientHeight < leaf.y) {
					leaf.x = random(-this.docEl.clientWidth * 0.618, this.docEl.clientWidth * 0.5);
					leaf.y = -128;
				}
				leaf.x += random(16, 32);
				leaf.y += random(10, 25);

				const el = this.leafEls[i];
				el.style.top = `${leaf.y}px`;
				el.style.left = `${leaf.x}px`;
				el.style.backgroundPosition = `0 -${random(0, 3) * 32}px`;
			}
		}, 100);
		// 滚动监听（leafs 无法使用 fixed，需要 absolute 同步滚动）
		this.$store.state.scroller.add('App', this.onScroll);

		// 缩放监听（Zpix 渲染兼容性问题）! 暂时废除，偏移非整数能解决 Zpix 渲染问题，但会导致图像渲染模糊
		// this.offset = window.innerWidth % 2 === 0 ? 0 : -1.5;
		// window.addEventListener('resize', (e) => {
		// 	this.offset = window.innerWidth % 2 === 0 ? 0 : -1;
		// });
	}
});
</script>
<style>
	@import url(assets/css/public.css);

	#app {
  		color: #343749;
		width: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		scroll-behavior: smooth;
	}

	/* position: fixed 和 z-index: -1 同时使用会导致字体渲染模糊（不只是 Zpix） */
	#leafs {
		width: 100%;
		height: 100vh;
		z-index: -1;
		position: absolute; 
		overflow: hidden;
		background: url('~@/assets/img/bg.png');
		background-size: 1920px 1152px;
		background-position: right bottom;
		background-attachment: fixed;
	}

	#leafs .leaf {
		width: 32px;
		height: 32px;
		position: absolute;
	}

	#main {
		border: 3px solid #CDDEF0;
		margin: 64px 80px 128px 0;
		display: flex;
		background: #F4F4F4;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, .6);
	}

	#aside {
		width: 20rem;
		height: 100%;
		z-index: 1;
	}

	#content {
		width: 100%;
		border-left: 3px solid #CDDEF0;
	}
	/* 自适应 */
	@media screen and (max-width: 2560px) {
		#main {
			width: 1400px;
		}
	}
	@media screen and (max-width: 1920px) {
		#main {
			width: 1100px;
		}
	}
	@media screen and (max-width: 1200px) {
		#main {
			width: 100%;
			margin: 0;
			border: none;
			min-height: 100vh;
			background: rgba(255, 255, 255, .7);
			box-shadow: none;
		}
	}
	@media screen and (max-width: 900px) {
		#aside,
		#main .list-update {
			display: none;
		}
		#content {
			border: none;
		}
	}
</style>
