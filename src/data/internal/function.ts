export type IsNil<T> = T | null | undefined;

export const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

export const compareEq = <T>(x: T, y: T): boolean => x === y;

export const propOf = <T, K extends keyof T>(
	k: K
): (obj: T) => T[K] =>
	obj => obj[k];

export const compareEqAtWith = <T, K extends keyof T>(
	f: (lhs: T[K], rhs: T[K]) => boolean,
	key: K
): (a1: T, a2: T) => boolean =>
	(a1, a2) => f(a1[key], a2[key]);

export const compareEqAt = <T, K extends keyof T>(
	k: K
): (a1: T, a2: T) => boolean =>
	compareEqAtWith(compareEq, k);

export const range = (a: number, b: number): Array<number> => {
	let xs = [];
	for (let i = a; i < b; ++i) {
		xs.push(i);
	}
	return xs;
};

export const times = <R>(a: number, f: (a: number) => R): Array<R> =>
	range(0, a).map(f);
