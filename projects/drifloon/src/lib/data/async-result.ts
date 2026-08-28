import * as R from "rxjs";

interface AsyncRefresh {
	tag: "refresh";
}

interface AsyncFinish<T> {
	tag: "finish";
	value: T;
}

interface AsyncErr<E> {
	tag: "err";
	err: E;
}

export type AsyncResult<T, E> = AsyncRefresh | AsyncFinish<T> | AsyncErr<E>;

export const mkAsyncRefresh: AsyncResult<any, any> = {
	tag: "refresh"
};

export const mkAsyncFinish = <T, E = never>(value: T): AsyncResult<T, E> => ({
	tag: "finish",
	value
});

export const mkAsyncErr = <E, T = never>(err: E): AsyncResult<T, E> => ({
	tag: "err",
	err
});

export interface CaseOfOption<T, R, E> {
	refresh: () => R;
	finish: (value: T) => R;
	err: (err: E) => R
}

export const caseOfAsyncResult = <T, R, E>(
	input: AsyncResult<T, E>,
	option: CaseOfOption<T, R, E>
): R => {
	if (input.tag === "refresh") {
		return option.refresh();
	}
	else if (input.tag === "finish") {
		return option.finish(input.value);
	}
	else if (input.tag === "err") {
		return option.err(input.err);
	}
	else {
		const _: never = input;
		return _;
	}
};

export function mapOf<T, R>(
	f: (value: T, idx: number) => R
): R.OperatorFunction<T, AsyncResult<R, never>> {
	return source$ => source$.pipe(
		R.map((x, idx) => mkAsyncFinish(f(x, idx)))
	);
}

export function mapOfRefresh<T, R, E>(
	f: (value: T, idx: number) => R
): R.OperatorFunction<T, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		mapOf(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function flatMapOf<T, R, E>(
	f: (value: T, idx: number) => AsyncResult<R, E>
): R.OperatorFunction<T, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.map(f)
	);
}

export function flatMapOfRefresh<T, R, E>(
	f: (value: T, idx: number) => AsyncResult<R, E>
): R.OperatorFunction<T, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		flatMapOf(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function map<T, R, E>(
	f: (value: T, idx: number) => R
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.map((x, idx) => caseOfAsyncResult(x, {
			refresh: () => mkAsyncRefresh,
			finish: x => mkAsyncFinish(f(x, idx)),
			err: mkAsyncErr
		}))
	);
}

export function flatMap<T, R, E>(
	f: (value: T, idx: number) => AsyncResult<R, E>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.map((x, idx) => caseOfAsyncResult(x, {
			refresh: () => mkAsyncRefresh,
			finish: x => f(x, idx),
			err: mkAsyncErr
		}))
	)
}

export function concatMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.concatMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: v => f(v, idx).pipe(R.map(mkAsyncFinish))
		}))
	);
}

export function concatMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		concatMap(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function concatFlatMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.concatMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: x => f(x, idx)
		}))
	);
}

export function concatFlatMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		concatFlatMap(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function switchMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>,
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.switchMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: x => f(x, idx).pipe(R.map(mkAsyncFinish))
		}))
	);
}

export function switchMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		switchMap(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function switchFlatMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.switchMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: x => f(x, idx)
		}))
	);
}

export function switchFlatMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		switchFlatMap(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function exhaustMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.exhaustMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: x => f(x, idx).pipe(R.map(mkAsyncFinish))
		}))
	);
}

export function exhaustMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<R>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		exhaustMap(f),
		R.startWith(mkAsyncRefresh)
	);
}

export function exhaustFlatMap<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		R.exhaustMap((x, idx) => caseOfAsyncResult(x, {
			refresh: () => R.of(mkAsyncRefresh),
			err: e => R.of(mkAsyncErr(e)),
			finish: x => f(x, idx)
		}))
	);
}

export function exhaustFlatMapWithRefresh<T, R, E>(
	f: (value: T, idx: number) => R.Observable<AsyncResult<R, E>>
): R.OperatorFunction<AsyncResult<T, E>, AsyncResult<R, E>> {
	return source$ => source$.pipe(
		exhaustFlatMap(f),
		R.startWith(mkAsyncRefresh)
	);
}
