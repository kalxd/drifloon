import { Maybe } from "purify-ts";
import { maybeZip, maybeZipWith } from "./zip";

interface PropLens<T> {
	get: () => T;
	set: (value: T) => void;
}

export interface Lens<S, T> {
	get: (state: S) => T;
	set: (state: S, value: T) => S;
}

export interface Prism<S, T> {
	get: (state: S) => Maybe<T>;
	set: (state: S, value: T) => Maybe<S>;
}

interface Prismable<T> {
	get: () => Maybe<T>;
	set: (value: T) => void;
	prop: <K extends keyof T>(key: K) => Prismable<T[K]>;
	prism: <R>(prism: Prism<T, R>) => Prismable<R>;
}

const prismable = <T>(prismLens: PropLens<Maybe<T>>): Prismable<T> => {
	const get: Prismable<T>["get"] = prismLens.get;
	const set: Prismable<T>["set"] = v => {
		const value = get().map(_ => v);
		prismLens.set(value);
	};

	const prop: Prismable<T>["prop"] = key => {
		type K = typeof key;
		const sublens: PropLens<Maybe<T[K]>> = {
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
		const sublens: PropLens<R> = {
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
		prop,
		prism
	};
};

export interface Mutable<T> {
	get: () => T;
	set: (value: T) => void;
	lens: <R>(lens: Lens<T, R>) => Mutable<R>;
	prop: <K extends keyof T>(key: K) => Mutable<T[K]>;
	prism: <R>(prism: Prism<T, R>) => Prismable<R>;
}

const mutableByProp = <T>(lensOp: PropLens<T>): Mutable<T> => {
	const get: Mutable<T>["get"] = lensOp.get;
	const set: Mutable<T>["set"] = lensOp.set;

	const lens: Mutable<T>["lens"] = lensOp => {
		type R = ReturnType<(typeof lensOp)["get"]>;
		const subprop: PropLens<R> = {
			get: () => lensOp.get(get()),
			set: v => {
				const state = get();
				set(lensOp.set(state, v));
			}
		};
		return mutableByProp(subprop);
	};

	const prop: Mutable<T>["prop"] = key => {
		type K = typeof key;
		const sublens: Lens<T, T[K]> = {
			get: state => state[key],
			set: (state, v) => ({ ...state, [key]: v })
		};
		return lens(sublens);
	};

	const prism: Mutable<T>["prism"] = op => {
		type R = ReturnType<(typeof op)["get"]>;
		const subprism: PropLens<R> = {
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
		prop,
		prism
	};
};

export const mutable = <T>(state: T): Mutable<T> => {
	const lens: PropLens<T> = {
		get: () => state,
		set: s => { state = s; }
	};
	return mutableByProp(lens);
};
