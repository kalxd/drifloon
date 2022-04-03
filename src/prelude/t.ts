/**
 * 类型定义。
 */
export type Nil<T> = T | undefined;

const isNotNil = <T>(value: T | null | undefined): value is T => {
	return !(value === undefined || value === null);
};

interface Maybe<T> extends Promise<T> {
	map: <R>(f: (x: T) => R) => Maybe<R>;
}

class NilError {};

const maybe = <T>(value: T | null | undefined): Maybe<T> => ({
	then: <TResult1 = T, TResult2 = never>(
		onfulfilled: ((x: T) => TResult1 | PromiseLike<TResult1>) ,
		onrejected: (reason: NilError) => TResult2 | PromiseLike<TResult2>
	): Promise<TResult1 | TResult2> => {
		if (isNotNil(value)) {
			return Promise.resolve(value)
				.then(onfulfilled, onrejected);
		}

		return Promise.reject(new NilError);
	},

	catch: () => {
		throw new NilError;
	},

	finally: () => {
		throw new NilError;
	},

	[Symbol.toStringTag]: "maybe",

	map: <R>(f: (a: T) => R): Maybe<R> => {
		if (isNotNil(value)) {
			return maybe(f(value));
		}
		else {
			return maybe(value as never as R);
		}
	}
});
