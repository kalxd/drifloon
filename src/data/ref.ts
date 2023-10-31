import { Either, Maybe, Nothing } from "purify-ts";

// 可变的数据。
export class IORef<T> {
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

	askAt<K extends keyof T>(key: K): T[K] {
		return this.asks(ref => ref[key]);
	}

	asksAt<K extends keyof T, R>(key: K, f: (value: T[K]) => R): R {
		return this.asks(ref => f(ref[key]));
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

	map<R>(f: (ref: T) => R): IORef<R> {
		const s = this.asks(f);
		return new IORef(s);
	}
}
