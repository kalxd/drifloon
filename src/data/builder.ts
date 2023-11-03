import { Maybe } from "purify-ts/Maybe";

export interface AttrBuilder<T> {
	build: () => Partial<T>;
	set: <K extends keyof T>(key: K, value: T[K]) => AttrBuilder<T>;
	setWhenLazy: <K extends keyof T>(cond: () => boolean, key: K, value: T[K]) => AttrBuilder<T>;
	setWhen: <K extends keyof T>(cond: boolean, key: K, value: T[K]) => AttrBuilder<T>;

	setJust: <K extends keyof T>(key: K, value: Maybe<T[K]>) => AttrBuilder<T>;
}

export const buildAttr = <T>(base: Partial<T>): AttrBuilder<T> => {
	const build: AttrBuilder<T>["build"] = () => base;

	const set: AttrBuilder<T>["set"] = (key, value) =>
		buildAttr(({ ...base, [key]: value } as T));

	const setWhenLazy: AttrBuilder<T>["setWhenLazy"] = (cond, key, value) => {
		if (cond()) {
			return set(key, value);
		}
		else {
			return buildAttr(base);
		}
	};

	const setWhen: AttrBuilder<T>["setWhen"] = (cond, key, value) =>
		setWhenLazy(() => cond, key, value);

	const setJust: AttrBuilder<T>["setJust"] = (key, value) =>
		value.caseOf({
			Just: a => set(key, a),
			Nothing: () => buildAttr(base)
		});

	return {
		build,
		set,
		setWhenLazy,
		setWhen,
		setJust
	};
};
