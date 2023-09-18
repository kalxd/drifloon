import { Maybe } from "purify-ts";
import { maybeZip, maybeZipWith } from "./zip";

interface Lens<T> {
	get: () => T;
	set: (value: T) => void;
}

export interface Prism<S, T> {
	get: (state: S) => Maybe<T>;
	set: (state: S, value: T) => Maybe<S>;
}

export interface Prismable<T> {
	get: () => Maybe<T>;
	set: (value: T) => void;
	lens: <K extends keyof T>(key: K) => Prismable<T[K]>;
	prism: <R>(prism: Prism<T, R>) => Prismable<R>;
}

const prismable = <T>(prismLens: Lens<Maybe<T>>): Prismable<T> => {
	const get: Prismable<T>["get"] = prismLens.get;
	const set: Prismable<T>["set"] = v => {
		const value = get().map(_ => v);
		prismLens.set(value);
	};
	const lens: Prismable<T>["lens"] = key => {
		type K = typeof key;
		const sublens: Lens<Maybe<T[K]>> = {
			get: () => get().map(s => s[key]),
			set: ma => {
				maybeZip(get(), ma)
					.map(([state, a]) => ({
						...state,
						[key]: a
					}))
					.ifJust(set);
			}
		};

		return prismable(sublens);
	};

	const prism: Prismable<T>["prism"] = op => {
		type R = ReturnType<(typeof op)["get"]>;
		const sublens: Lens<R> = {
			get: () => get().chain(op.get),
			set: ma => {
				maybeZipWith(op.set, get(), ma)
					.join()
					.ifJust(set);
			}
		};
		return prismable(sublens);
	};

	return {
		get,
		set,
		lens,
		prism
	};
};

export interface Mutable<T> {
	get: () => T;
	set: (value: T) => void;
	lens: <K extends keyof T>(key: K) => Mutable<T[K]>;
	prism: <R>(prism: Prism<T, R>) => Prismable<R>;
}

const mutableByLens = <T>(lensOp: Lens<T>): Mutable<T> => {
	const get: Mutable<T>["get"] = lensOp.get;
	const set: Mutable<T>["set"] = lensOp.set;

	const lens: Mutable<T>["lens"] = key => {
		type K = typeof key;
		const sublens: Lens<T[K]> = {
			get: () => get()[key],
			set: v => {
				const state = { ...get(), [key]: v };
				set(state);
			}
		};

		return mutableByLens(sublens);
	};

	const prism: Mutable<T>["prism"] = op => {
		type R = ReturnType<(typeof op)["get"]>;
		const subprism: Lens<R> = {
			get: () => op.get(get()),
			set: ma => {
				const state = get();
				ma.chain(a => op.set(state, a))
					.ifJust(set);
			}
		};
		return prismable(subprism);
	};

	return {
		get,
		set,
		lens,
		prism
	};
};

export const mutable = <T>(state: T): Mutable<T> => {
	const lens: Lens<T> = {
		get: () => state,
		set: s => { state = s; }
	};
	return mutableByLens(lens);
};
