export type IsNil<T> = T | null | undefined;

export const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

export const compareEq = <T>(x: T, y: T): boolean => x === y;
