/**
 * 辅助类函数。
 */
import { curry, Maybe, NonEmptyList } from "purify-ts";
import { IsNil } from "./function";

export const cmpDef = <T>(x: T, y: T): boolean => x === y;

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
