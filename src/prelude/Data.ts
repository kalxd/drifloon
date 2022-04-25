/**
 * 一些常用数据
 */

type IsNil<T> = T | null | undefined;

const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

export interface AttrBuilder<V, T extends V> {
	attr: () => Partial<T> & V;

	field: <K extends keyof T>(key: K, value: T[K]) => AttrBuilder<V, T>;
	fieldOnly: <K extends keyof T>(key: K, value: IsNil<T[K]>) => AttrBuilder<V, T>;
	fieldWhen: <K extends keyof T>(cond: boolean, key: K, value: T[K]) => AttrBuilder<V, T>;
}

export const buildAttrWith = <V, T extends V>(base: V): AttrBuilder<V, T> => {
	const attr = () => base;

	const field = <K extends keyof T>(key: K, value: T[K]): AttrBuilder<V, T> =>
		buildAttrWith({
			...base,
			[key]: value
		});

	const fieldOnly = <K extends keyof T>(key: K, value: IsNil<T[K]>): AttrBuilder<V, T> => {
		if (isNil(value)) {
			return buildAttrWith(base);
		}
		else {
			return field(key, value);
		}
	};

	const fieldWhen = <K extends keyof T>(cond: boolean, key: K, value: T[K]): AttrBuilder<V, T> => {
		if (cond) {
			return buildAttrWith(base);
		}
		else {
			return field(key, value);
		}
	};

	return {
		attr,
		field,
		fieldOnly,
		fieldWhen
	};
};

export const buildAttr = <T>(): AttrBuilder<{}, T> => buildAttrWith({});
