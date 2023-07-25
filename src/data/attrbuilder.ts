import { Maybe } from "purify-ts/Maybe";

export default class AttrBuilder<T> {
	private attr: Partial<T>;

	constructor(attr: Partial<T>) {
		this.attr = attr;
	}

	build(): Partial<T> {
		return this.attr;
	}

	put<K extends keyof T>(key: K, value: T[K]): this {
		this.attr[key] = value;
		return this;
	}

	putWhen<K extends keyof T>(cond: boolean, key: K, value: T[K]): this {
		if (cond) {
			return this.put(key, value);
		}
		else {
			return this;
		}
	}

	putMaybe<K extends keyof T>(key: K, value: Maybe<T[K]>): this {
		value.ifJust(a => this.put(key, a));
		return this;
	}
}
