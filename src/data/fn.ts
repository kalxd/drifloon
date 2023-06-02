import { eq } from "../internal/function";

export const propOf = <T, K extends keyof T>(
	k: K
): (obj: T) => T[K] =>
	obj => obj[k];

export const cmpBy = <T, K extends keyof T>(
	f: (v1: T[K], v2: T[K]) => boolean,
	k: K
): (a1: T, a2: T) => boolean =>
	(a1, a2) => f(a1[k], a2[k]);

export const cmpOf = <T, K extends keyof T>(
	k: K
): (a1: T, a2: T) => boolean => cmpBy(eq, k);
