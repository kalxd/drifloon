abstract class MaybeTrait<T> {
	abstract map<R>(f: (value: T) => R): MaybeTrait<R>;
}

class Just<T> extends MaybeTrait<T> {
	constructor(private value: T) {
		super()
	}

	map<R>(f: (value: T) => R): Just<R> {
		return new Just(f(this.value));
	}
}

class Nothing<T> extends MaybeTrait<T> {
	map<R>(_: (value: T) => R): Nothing<R> {
		return this as never as Nothing<R>;
	}
}

export class Maybe<T> {
	static just<T>(value: T): Maybe<T> {
		return new Maybe(new Just(value));
	}

	static Nothing: Maybe<any> = new Maybe(new Nothing);

	constructor(private value: MaybeTrait<T>) {}
}
