import { curry } from "purify-ts";

export const add = curry((a: number, b: number): number => {
	return a + b;
});
