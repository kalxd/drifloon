/**
 * 无法分类的函数们
 */

import { Maybe, NonEmptyList } from "purify-ts";
import { Nil } from "./t";

type ThemeProcedure = (value: string) => string;

export const appendPrefix = (prefix: string): (value: string) => string => {
	return s => `${prefix}-${s}`;
};

export const appendIsPrefix = appendPrefix("is");

export const combineClass = (xs: Array<[Nil<string>, ThemeProcedure]>): Nil<string> => {
	const ys = xs.map(([name, f]) => {
		return Maybe.fromNullable(name)
			.map(name => f(name));
	});

	return NonEmptyList.fromArray(Maybe.catMaybes(ys))
		.map(xs => xs.join(" "))
		.extract();
};
