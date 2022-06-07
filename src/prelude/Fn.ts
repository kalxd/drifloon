/**
 * 辅助类函数。
 */
import { curry, identity, Maybe, NonEmptyList } from "purify-ts";
import { IsNil } from "./Type";

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

/**
 * 主要用于生成enum映射函数，少写一些代码。
 * @example
 * ```
 * enum Action { Stop, Running, Finish }
 * const f: (action: Action) => string = genMapping({
 *   [Action.Stop]: "stop",
 *   [Action.Running]: "doing",
 *   [Action.Finish]: "over"
 * });
 *
 * f(Action.stop) // "stop"
 * ```
 */
export const genMapping = <K extends string | number | symbol, V>(
	obj: Record<K, V>
): (key: K) => V =>
	key => obj[key];
