import * as R from "rxjs";

interface AsyncResultTrait<T, E> {
	map<R>(f: (value: T) => R): AsyncResultTrait<R, E>;
	flatMap<R>(f: (value: T) => AsyncResultTrait<R, E>): AsyncResultTrait<R, E>;
}

class AsyncLoading<T = never, E = never> implements AsyncResultTrait<T, E> {
	map<R>(_: (value: T) => R): AsyncResultTrait<R, E> {
		return new AsyncLoading();
	}

	flatMap<R>(_: (value: T) => AsyncResultTrait<R, E>): AsyncResultTrait<R, E> {
		return new AsyncLoading();
	}
}

class AsyncValue<T, E = never> implements AsyncResultTrait<T, E> {
	private readonly value: T;

	constructor(value: T) {
		this.value = value;
	}

	map<R>(f: (value: T) => R): AsyncResultTrait<R, E> {
		const nextValue = f(this.value);
		return new AsyncValue(nextValue);
	}

	flatMap<R>(f: (value: T) => AsyncResultTrait<R, E>): AsyncResultTrait<R, E> {
		return f(this.value);
	}
}

class AsyncFail<E, T = never> implements AsyncResultTrait<T, E> {
	private readonly err: E;

	constructor(err: E) {
		this.err = err;
	}

	map<R>(_: (value: T) => R): AsyncResultTrait<R, E> {
		return new AsyncFail(this.err);
	}

	flatMap<R>(_: (value: T) => AsyncResultTrait<R, E>): AsyncResultTrait<R, E> {
		return new AsyncFail(this.err);
	}
}

export class AsyncResult<T, E> implements AsyncResultTrait<T, E> {
	static loading<T = never, E = never>(): AsyncResult<T, E> {
		const value = new AsyncLoading();
		return new AsyncResult(value);
	}

	static of<T, E = never>(value: T): AsyncResult<T, E> {
		const x = new AsyncValue(value);
		return new AsyncResult(x);
	}

	static fail<E, T = never>(err: E): AsyncResult<T, E> {
		const value = new AsyncFail(err);
		return new AsyncResult(value);
	}

	static map<T, R, E>(f: (value: T) => R): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
		return source => source.pipe(
			R.map(x => x.map(f))
		);
	}

	private value: AsyncResultTrait<T, E>;

	private constructor(value: AsyncResultTrait<T, E>) {
		this.value = value;
	}

	map<R>(f: (value: T) => R): AsyncResult<R, E> {
		return new AsyncResult(this.value.map(f));
	}

	flatMap<R>(f: (value: T) => AsyncResult<R, E>): AsyncResult<R, E> {
		return new AsyncResult(this.value.flatMap(f));
	}
}
