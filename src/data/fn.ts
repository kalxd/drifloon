import { compareEq } from "../internal/function";

export * from "./internal/zip";
export { compareEq } from "../internal/function";

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
): (a1: T, a2: T) => boolean => compareEqAtWith(compareEq, k);
