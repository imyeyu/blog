export class ScrollEvent {
	name: string;
	event: Function;

	constructor(name: string, event: Function) {
		this.name = name;
		this.event = event;
	}
}

export default class Scroller {

	public top: number = 0;

	events: ScrollEvent[];

	constructor() {
		this.events = [];

		window.addEventListener('scroll', () => {
			// 滚动距离
			this.top = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
			// 可视高度
			const wH = document.documentElement.clientHeight || document.body.clientHeight;
			// 滚动高度
			const sH = document.documentElement.scrollHeight || document.body.scrollHeight;
			// 遍历事件
			for (const e of this.events) {
				e.event(this.top, (this.top + wH === sH));
			}
		}, true);
	}

	// 添加事件
	add(name: string, event: Function) {
		const e = this.events.find((se) => se.name === name);
		if (e) {
			e.event = event;
		} else {
			this.events.push(new ScrollEvent(name, event));
		}
	}

	// 移除事件
	remove(name: string) {
		const e = this.events.findIndex(se => se.name === name);
		delete this.events[e];
	}

	// 滚动至顶
	toTop() {
		const timer = setInterval(() => {
			this.top -= this.top / 8;
			if (this.top > 3) {
				window.scrollTo(0, this.top);
			} else {
				window.scrollTo(0, 0);
				clearInterval(timer);
			}
		}, 1000 / 90);
	}
}