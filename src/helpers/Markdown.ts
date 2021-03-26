import marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import store from '@/store';

// 渲染器
const Renderer = new marked.Renderer();
/**
 * 超链渲染方式
 * 1.链接前加 ~ 符号会被渲染为新标签打开。例：[text](~url)
 * 2.没有 title 的链接将使用 text 作为 title
 * 3.没有链接的会被渲染为 span 标签
 */
Renderer.link = (url, title, text) => {
	title = title ? title : text;
	if (url) {
		const isNewTabOpen = url.startsWith('~');
		url = isNewTabOpen ? url.substring(1) + '' : url;
		return `<a href="${url}"${ isNewTabOpen ? ' target="_blank"' : ''} title="${title}">${text}</a>`;
	} else {
		return `<span>${text}</span>`;
	}
}
marked.setOptions({
	renderer: Renderer,
	highlight: (code, lang) => {
		if (Prism.languages[lang]) {
			return Prism.highlight(code, Prism.languages[lang], lang);
		} else {
			return code;
		}
	},
	pedantic: false,
	gfm: true,
	breaks: true,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false
});

export default function toHTML(mkData: string | undefined): string {
	if (mkData) {
		return marked(mkData);
	} else {
		return '';
	}
}

// 行号渲染调整
(() => {
	Prism.hooks.add('complete', (env) => {
		if (!env.code) return;

		const el = env.element;
		const lineNumber:any = el.querySelector('.line-numbers-rows');
		if (lineNumber) {
			const clone = lineNumber.cloneNode(true);
			el.removeChild(lineNumber);
			el.innerHTML = `<span class="codes">${el.innerHTML}</span>`;
			el.insertBefore(clone, el.firstChild);
			
			const parent = el.parentNode as HTMLElement;
			if (parent) {
				// 双击切换显示全部或显示部分
				const l = clone.children.length;
				parent.addEventListener('dblclick', (e) => {
					if (18 < l) {
						const isExpand = parent.classList.contains('expand');
						if (isExpand) {
							parent.style.maxHeight = '400px';
							parent.classList.remove('expand');
						} else {
							parent.style.maxHeight = l * 22 + 'px';
							parent.classList.add('expand');
						}
						const selection = window.getSelection();
						if (selection) {
							selection.removeAllRanges();
						}
					}
				});
				// 第一次滚动提示
				if (store.state.config.get('codeTips')) {
					const event = () => {
						store.state.dialogBus.display({
							icon: 'INFO',
							title: '提示',
							titleSub: '本提示只显示一次',
							content: '双击代码区域显示全部或显示部分'
						});
						parent.removeEventListener('scroll', event);
						store.state.config.set('codeTips', false);
					};
					parent.addEventListener('scroll', event);
				}
			}
			return;
		}
	});
})();