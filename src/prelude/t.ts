/**
 * 类型定义。
 */
export type Nil<T> = T | undefined;

const isNotNil = <T>(value: T | null | undefined): value is T => {
	return !(value === undefined || value === null);
};

export interface Maybe<T> extends Promise<T> {
	map: <R>(f: (x: T) => R) => Maybe<R>;
	chain: <R>(f: (x: T) => Maybe<R>) => Maybe<R>;
}

class NilError {};

export const maybe = <T>(value: T | null | undefined): Maybe<T> => ({
	then: <TResult1 = T, TResult2 = never>(
		onfulfilled: ((x: T) => TResult1 | PromiseLike<TResult1>) ,
		onrejected: (reason: NilError) => TResult2 | PromiseLike<TResult2>
	): Promise<TResult1 | TResult2> => {
		return Promise.resolve(value)
			.then(value => {
				if (isNotNil(value)) {
					return value;
				}
				else {
					return Promise.reject(new NilError)
				}
			})
			.then(onfulfilled, onrejected);
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
			return maybe<R>(value);
		}
	},

	chain: <R>(f: (x: T) => Maybe<R>): Maybe<R> => {
		if (isNotNil(value)) {
			return f(value);
		}
		else {
			return maybe<R>(value);
		}
	}
});

export const maybeDo = async <T>(action: () => Maybe<T>): Promise<T | null | undefined> => {
	return action().catch(e => {
		if (e instanceof NilError) {
			return null;
		}
		else {
			return Promise.reject(e);
		}
	});
};
