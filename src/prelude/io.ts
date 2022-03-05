/**
 * 所有副作用都在这里。
 */

export class IORef<T> {
	constructor(private ref: T) {}

	write(value: T) {
		this.ref = value;
	}

	writeWith(f: (ref: T) => T) {
		this.ref = f(this.ref);
	}

	read(): T {
		return this.ref;
	}

	readWith<R>(f: (ref: T) => R): R {
		return f(this.ref);
	}
}
