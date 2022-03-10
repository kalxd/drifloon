/**
 * 无法分类的函数们
 */

import { curry, Maybe, NonEmptyList } from "purify-ts";
import { Nil } from "./t";

export const prependKlass = curry((
	prefix: string,
	value: string
): string => `${prefix}-${value}`);

export const prependIs = prependKlass("is");

export const selectKlassWhen = curry((
	cond: Nil<boolean>,
	klass: string
): Maybe<string> =>
	Maybe.fromNullable(cond)
		.chain(cond => Maybe.fromPredicate(_ => cond, klass)));

export const fmapKlass = curry((
	name: Nil<string>,
	f: (name: string) => string
): Maybe<string> => {
	return Maybe.fromNullable(name)
		.map(f);
});

export const pickKlass = (xs: Array<Maybe<string>>): Nil<string> => {
	return NonEmptyList.fromArray(Maybe.catMaybes(xs))
		.map(xs => xs.join(" "))
		.extract();
};
