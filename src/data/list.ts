import { Nothing, Maybe } from "purify-ts";
import { List as StdList } from "purify-ts/List";
import { NonEmptyList as StdNonEmptyList } from "purify-ts/NonEmptyList";

/** findMap */
const list_findMap = <T, R>(f: (item: T) => Maybe<R>, xs: Array<T>): Maybe<R> => {
	for (const x of xs) {
		const a = f(x);

		if (a.isJust()) {
			return a;
		}
	}

	return Nothing;
};

const nonlist_findMap = <T, R>(f: (item: T) => Maybe<R>, xs: StdNonEmptyList<T>): Maybe<R> =>
	list_findMap(f, xs);
/** end findMap */

/** takeWhile */
const list_takeWhile = <T>(f: (item: T) => boolean, xs: Array<T>): Array<T> => {
	let result = [];
	for (const x of xs) {
		if (f(x)) {
			result.push(x);
		}
		else {
			return result;
		}
	}

	return result;
};

const nonlist_takeWhile = <T>(f: (item: T) => boolean, xs: StdNonEmptyList<T>): Array<T> =>
	list_takeWhile(f, xs);
/** end takeWhile */

export const List = {
	...StdList,
	findMap: list_findMap,
	takeWhile: list_takeWhile
};

export const NonEmptyList = {
	...StdNonEmptyList,
	findMap: nonlist_findMap,
	takeWhile: nonlist_takeWhile
};
