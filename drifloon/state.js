/** 全局状态管理 */
const Most = require("most");
const Observable = require("zen-observable");
const { makeValue } = require("./function");

class State {
	constructor(initValue) {
		this.value = makeValue(initValue);

		const o = new Observable(ob => {
			this.ob = ob;

			ob.next(initValue);
		});

		this.stream$ = Most.from(o).multicast();
	}

	put(v) {
		this.value(v);

		if (this.ob) {
			this.ob.next(v);
		}

		return v;
	}

	get() {
		return this.value();
	}

	modify(f) {
		const v = this.get();
		return this.put(f(v));
	}
}

const init = value => new State(value);

module.exports = {
	init
};
