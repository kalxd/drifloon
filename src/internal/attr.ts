/**
 * 辅助类函数。
 */
import * as m from "mithril";
import { curry, Maybe, NonEmptyList } from "purify-ts";

export type RenderFn<T> = (item: T) => m.Children;

export type MouseCallback = (e: MouseEvent) => void;

type IsNil<T> = T | null | undefined;

/**
 * 检测是否为空值。
 */
export const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

export const selectKlass = curry((
	klass: string,
	cond: IsNil<boolean>
): Maybe<string> =>
	Maybe.fromFalsy(cond)
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
