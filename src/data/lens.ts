import { Maybe, List, Nothing, Just } from "purify-ts";
import { mutable, Prism } from "./internal/lens";

export * from "./internal/lens";

export const _nil = <T>(): Prism<T | undefined, T> => ({
	get: Maybe.fromNullable,
	set: (state, v) => Maybe.fromNullable(state).map(_ => v)
});

export const _ix = <T>(index: number): Prism<Array<T>, T> => ({
	get: xs => List.at(index, xs),
	set: (xs, x) => Maybe.of(xs)
		.filter(xs => xs.length > index)
		.filter(_ => index >= 0)
		.map(xs => {
			const ys = [...xs];
			ys[index] = x;
			return ys;
		})
});

interface Address {
	name?: string;
	num: number;
}

interface User {
	name: string;
	address?: Address;
	info: Array<Address>;
}

const user: User = {
	name: "hello world",
	address: {
		name: "1111",
		num: 10
	},
	info: [
		{ name: "sss", num: 1 },
		{ num: 2 }
	]
};

const state = mutable<User>(user);

const l = state.lens("info").prism(_ix(1)).lens("name").prism(_nil());
// console.log(l.get());
l.set("xxxx");
// console.log(l.get().isJust());
console.log(state.get());
/*
l.set(0);
console.log(state.get());
*/
