export class ScrollEvent {
	name: string;
	event: Function;

	constructor(name: string, event: Function) {
		this.name = name;
		this.event = event;
	}
}

export default class Scroller {

	events: ScrollEvent[];

	constructor() {
		this.events = [];

		window.addEventListener('scroll', () => {
			// 滚动距离
			const top = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
			// 可视高度
			const wH = document.documentElement.clientHeight || document.body.clientHeight;
			// 滚动高度
			const sH = document.documentElement.scrollHeight || document.body.scrollHeight;
			for (const e of this.events) {
				e.event(top, (top + wH === sH));
			}
		}, true);
	}

	add(name: string, event: Function) {
		const e = this.events.find((se) => se.name === name);
		if (e) {
			e.event = event;
		} else {
			this.events.push(new ScrollEvent(name, event));
		}
	}

	remove(name: string) {
		const e = this.events.findIndex(se => se.name === name);
		delete this.events[e];
	}
}