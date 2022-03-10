/**
 * 无法分类的函数们
 */

import { curry, Maybe, NonEmptyList } from "purify-ts";
import { Nil } from "./t";

type ThemeProcedure = (value: string) => string;

export const prependKlass = curry((prefix: string, value: string): string => {
	return `${prefix}-${value}`;
});

export const prependIs = prependKlass("is");

export const combineClass = (xs: Array<[Nil<string>, ThemeProcedure]>): Nil<string> => {
	const ys = xs.map(([name, f]) => {
		return Maybe.fromNullable(name)
			.map(name => f(name));
	});

	return NonEmptyList.fromArray(Maybe.catMaybes(ys))
		.map(xs => xs.join(" "))
		.extract();
};
