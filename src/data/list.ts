import { Nothing, Maybe } from "purify-ts";
import { List as StdList } from "purify-ts";

const findMap = <T, R>(f: (item: T) => Maybe<R>, xs: Array<T>): Maybe<R> => {
	for (const x of xs) {
		const a = f(x);

		if (a.isJust()) {
			return a;
		}
	}

	return Nothing;
};

export const List = {
	...StdList,
	findMap
};
