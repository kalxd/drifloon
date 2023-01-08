export default class IORef<T> {
	private ref: T;

	constructor(value: T) {
		this.ref = value;
	}

	ask(): T {
		return this.ref;
	}

	asks<R>(f: (ref: T) => R): R {
		return f(this.ref);
	}

	put(other: T): this {
		this.ref = other;
		return this;
	}

	putAt<K extends keyof T>(key: K, value: T[K]): this {
		this.ref[key] = value;
		return this;
	}

	update(f: (ref: T) => T): this {
		this.ref = f(this.ref);
		return this;
	}

	updateAt<K extends keyof T>(key: K, f: (value: T[K]) => T[K]): this {
		this.ref[key] = f(this.ref[key]);
		return this;
	}
}
