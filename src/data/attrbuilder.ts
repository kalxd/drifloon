import { Maybe } from "purify-ts/Maybe";

export default class AttrBuilder<T> {
	private attr: Partial<T>;

	constructor(attr: Partial<T>) {
		this.attr = attr;
	}

	build(): Partial<T> {
		return this.attr;
	}

	update<K extends keyof T>(key: K, value: T[K]): this {
		this.attr[key] = value;
		return this;
	}

	updateWhen<K extends keyof T>(cond: boolean, key: K, value: T[K]): this {
		if (cond) {
			return this.update(key, value);
		}
		else {
			return this;
		}
	}

	updateMaybe<K extends keyof T>(key: K, value: Maybe<T[K]>): this {
		return value.caseOf({
			Just: a => this.update(key, a),
			Nothing: () => { return this; }
		});
	}
}
