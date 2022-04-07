const isNotNil = <T>(value: T | null | undefined): value is T => {
	return value !== null && value !== undefined;
};

export interface Maybe<T> {
	isJust: () => boolean;
	isNothing: () => boolean;

	chain: <R>(f: (value: T) => Maybe<R>) => Maybe<R>;
	map: <R>(f: (value: T) => R) => Maybe<R>;

	filter: (f: (value: T) => boolean) => Maybe<T>;
	or: (other: Maybe<T>) => Maybe<T>;

	zipWith: <U, R>(f: (x: T, y: U) => R, other: Maybe<U>) => Maybe<R>;
	zip: <U>(other: Maybe<U>) => Maybe<[T, U]>;

	unwrap: () => T | null | undefined;
	unwrapOr: (value: T) => T;
}

export const maybe = <T>(a: T | null | undefined): Maybe<T> => {
	const isJust = () => isNotNil(a);
	const isNothing = () => !isJust();


	const chain = <R>(f: (value: T) => Maybe<R>): Maybe<R> => {
		if (isNotNil(a)) {
			return f(a);
		}
		else {
			return maybe<R>(a);
		}
	};

	const map = <R>(f: (value: T) => R): Maybe<R> => {
		return chain(x => maybe(f(x)));
	};

	const filter = (f: (value: T) => boolean): Maybe<T> => {
		return chain(a => {
			if (f(a)) {
				return maybe<T>(null)
			}
			else {
				return maybe(a);
			}
		});
	};

	const or = (other: Maybe<T>): Maybe<T> => {
		if (isJust()) {
			return maybe(a);
		}
		else {
			return other;
		}
	};

	const zipWith = <U, R>(f: (x: T, y: U) => R, other: Maybe<U>): Maybe<R> => {
		return other.chain(
			other => map(
				x => f(x, other)
			)
		);
	};

	const zip = <U>(other: Maybe<U>): Maybe<[T, U]> => {
		return zipWith((x, y) => ([x, y] as [T, U]), other);
	};

	const unwrap = () => a;

	const unwrapOr = (value: T) => {
		if (isNotNil(a)) {
			return a;
		}
		else {
			return value;
		}
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
		unwrapOr
	};
};
