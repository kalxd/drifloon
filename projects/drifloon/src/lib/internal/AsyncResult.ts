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
	readonly value: T;

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

type CaseOfOption<T, E, R> = {
	loading: () => R;
	fail: (err: E) => R;
	value: (value: T) => R;
};

const caseOfAsyncResult = <T, E, R>(
	input: AsyncResultTrait<T, E>,
	option: CaseOfOption<T, E, R>
): R => {
	if (input instanceof AsyncLoading) {
		return option.loading();
	}
	else if (input instanceof AsyncFail) {
		return option.fail(input.err);
	}
	else if (input instanceof AsyncValue) {
		return option.value(input.value);
	}

	throw new Error(`{input}不是有效的AsyncResultTrait子类！`);
};

const rewrapOfAsyncResult = <T, E>(
	input: AsyncResult<R.Observable<T>, E>
): R.ObservableInput<AsyncResult<T, E>> => {
	return input.caseOf({
		loading: () => R.of(AsyncResult.loading()),
		fail: err => R.of(AsyncResult.fail(err)),
		value: s$ => s$.pipe(
			R.map(s => AsyncResult.of(s))
		)
	});
}

class AsyncFail<E, T = never> implements AsyncResultTrait<T, E> {
	readonly err: E;

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

	// static concatMap<
	// 	T,
	// 	R,
	// 	O extends R.ObservableInput<R>,
	// 	E
	// >(f: (value: T) => O): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	// 	return source => source.pipe(
	// 		R.concatMap(value => {
	// 			const v = value.map(f);
	// 			return v;
	// 		})
	// 	);
	// }

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

	caseOf<R>(option: CaseOfOption<T, E, R>): R {
		return caseOfAsyncResult(this.value, option);
	}
}
