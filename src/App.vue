<template>
	<div id="leafs" :style="`top: ${scrollTop}px`">
		<div :ref="`leaf${i - 1}`" class="leaf icon" v-for="i in leafSize" :key="i"></div>
	</div>
	<div id="main">
		<side id="aside" ref="aside"></side>
		<section id="content">
			<router-view />
		</section>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Side from '@/layout/Side.vue';
import random from '@/helpers/Random';

class Leaf {
	x = 0;
	y = 0;
	bgI = 0;
}

export default defineComponent({
	components: {
		Side,
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
	}
});
</script>
<style>
	@import url(assets/css/public.css);

	#app {
		width: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		scroll-behavior: smooth;
	}

	/* position: fixed 和 z-index: -1 同时使用会导致字体渲染模糊 */
	#leafs {
		width: 100%;
		height: 100vh;
		z-index: -1;
		position: absolute; 
		overflow: hidden;
	}
	
	#leafs .leaf {
		width: 32px;
		height: 32px;
		position: absolute;
	}

	#main {
		border: 3px solid #CDDEF0;
		margin: 32px 16px 128px 16px;
		display: flex;
		background: #F4F4F4;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, .6);
	}

	#aside {
		width: 20rem;
		height: 100%;
	}

	#content {
		width: 100%;
		border-left: 3px solid #CDDEF0;
	}
	/* 自适应 */
	@media screen and (max-width: 3840px) {
		#main {
			width: 1024px;
		}
		.codeBox {
			width: 680px;
		}
	}
	@media screen and (max-width: 1440px) {
		#main {
			width: 1024px;
		}
	}
	@media screen and (max-width: 1200px) {
		#main {
			width: 820px;
		}
		.codeBox {
			width: 560px;
		}
	}
	@media screen and (max-width: 960px) {
		#main {
			width: 100%;
			margin: 0;
			border: none;
			opacity: .8;
		}
		.codeBox {
			width: 600px;
		}
	}
	@media screen and (max-width: 860px) {
		#leafs {
			display: none;
		}
		#aside {
			display: none;
		}
		.codeBox {
			width: 90%;
		}
	}
</style>
