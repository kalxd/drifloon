export default class IORef<T> {
	private ref: T;

	constructor(value: T) {
		this.ref = value;
	}

	modify(f: (ref: T) => T): this {
		this.ref = f(this.ref);
		return this;
	}

	put(other: T): this {
		this.ref = other;
		return this;
	}

	asks<R>(f: (ref: T) => R): R {
		return f(this.ref);
	}

	ask(): T {
		return this.ref;
	}
}
