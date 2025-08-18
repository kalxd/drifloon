abstract class MaybeTrait<T> {
	abstract isJust(): boolean;
	abstract map<R>(f: (value: T) => R): MaybeTrait<R>;
	abstract flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R>;
}

class Just<T> extends MaybeTrait<T> {
	constructor(public value: T) {
		super()
	}

	override isJust(): boolean {
		return true;
	}

	override map<R>(f: (value: T) => R): Just<R> {
		return new Just(f(this.value));
	}

	override flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R> {
		return f(this.value);
	}
}

class Nothing<T> extends MaybeTrait<T> {
	static Nothing: Nothing<any> = new Nothing;

	override isJust(): boolean {
		return false;
	}

	override map<R>(_: (value: T) => R): Nothing<R> {
		return Nothing.Nothing;
	}

	override flatMap<R>(_: (value: T) => Maybe<R>): Maybe<R> {
		return Maybe.Nothing;
	}
}

export class Maybe<T> extends MaybeTrait<T> {
	static Just<T>(value: T): Maybe<T> {
		return new Maybe(new Just(value));
	}

	static Nothing: Maybe<any> = new Maybe(Nothing.Nothing);

	constructor(private value: MaybeTrait<T>) {
		super();
	}

	override isJust(): boolean {
		return this.value.isJust();

	}

	isNothing(): boolean {
		return !this.isJust();
	}

	override map<R>(f: (value: T) => R): Maybe<R> {
		return new Maybe(this.value.map(f));
	}

	override flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R> {
		return this.value.flatMap(f);
	}

	unwrap(): T {
		if (this.value instanceof Just) {
			return this.value.value;
		}

		throw new Error("尝试从Nothing取值！");
	}

	unwrapOr(def: T): T {
		if (this.value instanceof Just) {
			return this.value.value;
		}

		return def;
	}

	unwrapOrOptional(): T | null {
		if (this.value instanceof Just) {
			return this.value.value;
		}

		return null;
	}
}
