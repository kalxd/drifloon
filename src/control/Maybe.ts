class DrifloonNilError {};

export interface Maybe<T> extends Promise<T> {
	isJust: boolean;
	isNothing: boolean;

	chain: <R>(f: (value: T) => Maybe<R>) => Maybe<R>;
	map: <R>(f: (value: T) => R) => Maybe<R>;

	filter: (f: (value: T) => boolean) => Maybe<T>;
	or: (other: Maybe<T>) => Maybe<T>;

	zipWith: <U, R>(f: (x: T, y: U) => R, other: Maybe<U>) => Maybe<R>;
	zip: <U>(other: Maybe<U>) => Maybe<[T, U]>;

	unwrap: () => T | null | undefined;
	unwrapOr: (value: T) => T;
}

const mkJust = <T>(a: T): Maybe<T> => {
	const isJust = true;
	const isNothing = false;

	const chain = <R>(f: (value: T) => Maybe<R>): Maybe<R> => {
		return f(a);
	};

	const map = <R>(f: (value: T) => R): Maybe<R> => {
		return mkJust(f(a));
	};

	const filter = (f: (value: T) => boolean): Maybe<T> => {
		if (f(a)) {
			return mkJust(a);
		}
		else {
			return Nothing as Maybe<T>;
		}
	};

	const or = (_: Maybe<T>): Maybe<T> => {
		return mkJust(a);
	};

	const zipWith = <U, R>(f: (x: T, y: U) => R, other: Maybe<U>): Maybe<R> => {
		return other.map(y => f(a, y));
	};

	const zip = <U>(other: Maybe<U>): Maybe<[T, U]> => {
		return other.map(y => ([a, y]) as [T, U]);
	};

	const unwrap = () => a;

	const unwrapOr = (_: T) => a;

	const then = <TResult1 = T, TResult2 = never>(
		ok?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
		bad?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined
	): Promise<TResult1 | TResult2> => {
		return Promise.resolve(a).then(ok, bad);
	};

	const catchP = <TResult = never>(
		_?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined
	): Promise<T | TResult> => {
		return Promise.resolve(a);
	};

	const finalP = (f?: (() => void) | null | undefined): Promise<T> => {
		return Promise.resolve(a).finally(f);
	};

	return {
		isJust,
		isNothing,

		chain,
		map,

		filter,
		or,

		zipWith,
		zip,

		unwrap,
		unwrapOr,

		then,
		catch: catchP,
		finally: finalP,
		[Symbol.toStringTag]: "Just"
	};
}

const mkNothing = <T>(): Maybe<T> => {
	const isJust = false;
	const isNothing = true;

	const chain = mkNothing;
	const map = mkNothing;
	const filter = mkNothing;
	const or = mkNothing;
	const zipWith = mkNothing;
	const zip = mkNothing;

	const unwrap = () => null;
	const unwrapOr = <T>(value: T) => value;

	const then = <TResult1 = T, TResult2 = never>(
		ok?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
		bad?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined
	): Promise<TResult1 | TResult2> => {
		return Promise.reject(new DrifloonNilError).then(ok, bad);
	};

	const catchP = <TResult = never>(
		bad?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined
	): Promise<T | TResult> => {
		return Promise.reject(new DrifloonNilError).catch(bad);
	};

	const finalP = (f: (() => void) | null | undefined): Promise<T> => {
		return Promise.reject(new DrifloonNilError).finally(f);
	};

	return {
		isJust,
		isNothing,

		chain,
		map,

		filter,
		or,

		zipWith,
		zip,

		unwrap,
		unwrapOr,

		then,
		catch: catchP,
		finally: finalP,
		[Symbol.toStringTag]: "Nothing"
	};
};

export const toMaybe = <T>(value: T | null | undefined): Maybe<T> => {
	if (value === null || value === undefined) {
		return mkNothing();
	}
	else {
		return mkJust(value);
	}
};

export const doMaybe = async <T>(f: () => Maybe<T>): Promise<T | null> => {
	return f().catch(e => {
		if (e instanceof DrifloonNilError) {
			return null;
		}
		return Promise.reject(e);
	});
};

export const Just = mkJust;
export const Nothing = mkNothing<any>();
