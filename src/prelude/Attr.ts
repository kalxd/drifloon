/**
 * 组件属性处理
 */

import { curry, identity, Maybe, NonEmptyList } from "purify-ts";
import { IsNil } from "./Type";

export const prependKlass = curry((
	prefix: string,
	value: string
): string => `${prefix}-${value}`);

export const prependIs = prependKlass("is");

export const selectKlassWhen = curry((
	cond: IsNil<boolean>,
	klass: string
): Maybe<string> =>
	Maybe.fromNullable(cond)
		.filter(identity)
		.map(_ => klass));

export const fmapKlass = curry(<T>(
	f: (name: T) => string,
	name: IsNil<T>,
): Maybe<string> => {
	return Maybe.fromNullable(name)
		.map(f);
});

export const fmapIsKlass = fmapKlass(prependIs);

export const pickKlass = (xs: Array<Maybe<string>>): string | undefined => {
	return NonEmptyList.fromArray(Maybe.catMaybes(xs))
		.map(xs => xs.join(" "))
		.extract();
};

export const pickEnumValue = curry(<K extends string | number | symbol>(
	data: Record<K, string>,
	key: K
): string => {
	return data[key];
});
