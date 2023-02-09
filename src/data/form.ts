import IORef from "./ioref";
import { Either, Maybe, Nothing, } from "purify-ts";

export class FormData<T> {
	private initData: T;
	private data: IORef<T>;
	public err: Maybe<string> = Nothing;

	constructor(data: T) {
		this.initData = data;
		this.data = new IORef(data);
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

	validate<R>(f: (data: T) => Either<string, R>): Either<string, R> {
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