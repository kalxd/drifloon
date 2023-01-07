/**
 * 辅助类函数。
 */
import * as m from "mithril";
import { curry, identity, Maybe, NonEmptyList } from "purify-ts";
import { IsNil } from "./Type";

export type RenderFn<T> = (item: T) => m.Children;

export const selectKlass = curry((
	klass: string,
	cond: IsNil<boolean>
): Maybe<string> =>
	Maybe.fromNullable(cond)
		.filter(identity)
		.map(_ => klass));

export const fmapKlass = <T>(
	f: (name: T) => string,
	name: IsNil<T>,
): Maybe<string> => {
	return Maybe.fromNullable(name)
		.map(f);
};

export const pickKlass = (xs: Array<Maybe<string>>): string | undefined => {
	return NonEmptyList.fromArray(Maybe.catMaybes(xs))
		.map(xs => xs.join(" "))
		.extract();
};
