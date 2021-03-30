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
/**
 * 图像渲染方式（添加兼容渲染媒体节点，仅支持 mp3 或 mp4）
 * 渲染为网页：![]($/html/index.html)
 * 渲染为视频：![](#/media/video.mp4)
 * 渲染为音频：![](~/media/music.mp3)
 * 渲染为图片：![](/image/photo.png)
 */
Renderer.image = (url, title, text) => {
	text = title ? title : text;
	if (url) {
		switch (url[0]) {
			case '~': // 音频
				return `<audio controls><source type="audio/mp3" src="${url.substring(1)}"></source></audio>`;
			case '#': // 视频
				return `<video controls><source type="video/mp4" src="${url.substring(1)}"></source></video>`;
			case '$': // 视频
				return `<iframe src="${url.substring(1)}" frameborder="0" allowfullscreen></iframe>`;
		}
		return `<img src="${url}" alt="${text}" />`; // 图片
	}
	throw `Renderer.image 无法解析（${url}, ${title}, ${text}）`;
}
/**
 * 重点内容扩展
 * 默认 `文本` 表现为红色
 * 使用 `[red bold]文本` 可以自定义类
 * 扩展 `---` 为渲染空行
 */
Renderer.codespan = (code) => {
	if (code === '---') {
		return '&nbsp;';
	} else {
		const clazz = code.match(/\[(.*)\]/);
		if (clazz) {
			return `<span class="${clazz[1]}">${code.substring(code.indexOf(']') + 1)}</span>`
		} else {
			return `<span class="red">${code}</span>`;
		}
	}
}

// Markdown 解析器配置
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

/**
 * Linux 会话着色
 * 用户属性（如：[root@VM-0-7-centos src]）显示为注释颜色
 * 用户属性后的命令显示为红色
 * 支持 MySQL 会话，原理同上（前缀为关键字色，命令为数字色）
 */
function linuxSession(code: string): string {
	const REG_LINUX_COMMAND = /\]\#(.*)/g,
		  REG_LINUX_PREFIX = /\[(.*)\]/g,
		  REG_MYSQL_COMMAND = /(mysql&gt;)(.*)/g;

	code = code.replaceAll(REG_LINUX_COMMAND, ']#<span class="red">$1</span>');
	code = code.replaceAll(REG_LINUX_PREFIX, '<span class="token comment">[$1]</span>');

	code = code.replaceAll(REG_MYSQL_COMMAND, 'mysql&gt;<span class="token number">$2</span>');
	code = code.replaceAll('mysql&gt;', '<span class="token keyword">mysql&gt;</span>');
	return code;
}

/**
 * 双击代码区域显示全部或显示部分
 * 
 * @param el    codes 对象
 * @param lines 行数
 * @returns 
 */
function dblClickEvent(el: HTMLElement, lines: number) {
	if (lines < 18) return;
	el.addEventListener('dblclick', (e) => {
		const isExpand = el.classList.contains('expand');
		if (isExpand) {
			el.style.maxHeight = '400px';
			el.classList.remove('expand');
		} else {
			el.style.maxHeight = lines * 22 + 'px';
			el.classList.add('expand');
		}
		const selection = window.getSelection();
		if (selection) {
			selection.removeAllRanges();
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

// Prism 着色完成事件
(() => {
	Prism.hooks.add('complete', env => {
		if (!env.code) return;
		
		// 行号渲染调整
		const el = env.element;
		const lineNumber:any = el.querySelector('.line-numbers-rows');
		if (lineNumber) {
			const clone = lineNumber.cloneNode(true);
			el.removeChild(lineNumber);
			
			// 其他着色方案（不是最优解，暂时这个解决方法）
			let elHTML = el.innerHTML;
			switch (env.language) {
				case 'linux-session': elHTML = linuxSession(elHTML); break;
			}

			el.innerHTML = `<span class="codes">${elHTML}</span>`;
			el.insertBefore(clone, el.firstChild);

			if (el.parentNode) {
				dblClickEvent(el.parentNode as HTMLElement, lineNumber.children.length)
			}
		}
	});
})();