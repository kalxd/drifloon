export type IsNil<T> = T | null | undefined;

export const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

export const eq = <T>(x: T, y: T): boolean => x === y;

export const fmap = <T, R>(
	f: (value: T) => R,
	value: IsNil<T>
): IsNil<R> => {
	if (isNil(value)) {
		return value;
	}
	else {
		return f(value);
	}
};

export const applyFn = <T, R>(
	f: IsNil<(value: T) => R>,
	value: T
): IsNil<R> => fmap(f => f(value), f);
