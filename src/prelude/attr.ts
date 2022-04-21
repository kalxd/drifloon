/**
 * 组件属性处理
 */

import { curry, identity, Maybe, NonEmptyList } from "purify-ts";
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
		.filter(identity)
		.map(_ => klass));

export const fmapKlass = curry((
	f: (name: string) => string,
	name: Nil<string>,
): Maybe<string> => {
	return Maybe.fromNullable(name)
		.map(f);
});

export const fmapIsKlass = fmapKlass(prependIs);

export const pickKlass = (xs: Array<Maybe<string>>): Nil<string> => {
	return NonEmptyList.fromArray(Maybe.catMaybes(xs))
		.map(xs => xs.join(" "))
		.extract();
};
