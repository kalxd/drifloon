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

// 专用于表单设计的可变结构。
export class FormData<T> {
	private initData: T;
	private data: IORef<T>;
	public err: Maybe<Array<string>> = Nothing;

	constructor(data: T) {
		this.initData = data;
		this.data = new IORef(data);
	}

	ask(): T {
		return this.data.ask();
	}

	asks<R>(f: (data: T) => R): R {
		return this.data.asks(f);
	}

	askAt<K extends keyof T>(key: K): T[K] {
		return this.data.asks(ref => ref[key]);
	}

	asksAt<K extends keyof T, R>(key: K, f: (value: T[K]) => R): R {
		return this.data.asks(ref => f(ref[key]));
	}

	put(data: T): this {
		this.data.put(data);
		return this;
	}

	putAt<K extends keyof T>(key: K, value: T[K]): this {
		this.data.putAt(key, value);
		return this;
	}

	update(f: (data: T) => T): this {
		this.data.update(f);
		return this;
	}

	updateAt<K extends keyof T>(key: K, f: (value: T[K]) => T[K]): this {
		this.data.updateAt(key, f);
		return this;
	}

	validate<R>(f: (data: T) => Either<Array<string>, R>): Either<Array<string>, R> {
		const v = this.data.asks(f);
		this.err = v.swap().toMaybe();
		return v;
	}

	reset(): this {
		this.data = new IORef(this.initData);
		return this;
	}

	resetErr(): this {
		this.err = Nothing;
		return this;
	}
}

export interface IMutable<T> {
	get: () => T;
	put: (state: T) => void;
	modify: (f: (state: T) => T) => void;
}

interface Op<T> {
	get: () => T;
	put: (value: T) => void;
}

export interface MutableRef<T> extends IMutable<T> {
}

const mutref = <T>(op: Op<T>): MutableRef<T> => {
	const get: MutableRef<T>["get"] = op.get;
	const put: MutableRef<T>["put"] = op.put;
	const modify: MutableRef<T>["modify"] = f => {
		const s = f(op.get());
		op.put(s);
	};

	return {
		get,
		put,
		modify
	};
};

export interface Mutable<T> extends IMutable<T> {
	gets: <K extends keyof T>(key: K) => T[K];
	prop: <K extends keyof T>(key: K) => MutableRef<T[K]>;
}

export const mut = <T>(state: T): Mutable<T> => {
	const get: Mutable<T>["get"] = () => state;

	const put: Mutable<T>["put"] = value => state = value;

	const modify: Mutable<T>["modify"] = f => {
		put(f(state));
	};

	const gets: Mutable<T>["gets"] = key => state[key];

	const prop = <K extends keyof T>(key: K): MutableRef<T[K]> => {
		const op: Op<T[K]> = {
			get: () => state[key],
			put: value => {
				state[key] = value;
			}
		};

		return mutref(op);
	};

	return {
		get,
		put,
		modify,
		gets,
		prop
	};
}
