/**
 * 一些常用数据
 */

import { isNil, IsNil, PickRequired } from "./Type";

export interface AttrBuilder<T> {
	attr: () => T;

	field: <K extends keyof T>(key: K, value: T[K]) => AttrBuilder<T>;
	fieldOnly: <K extends keyof T>(key: K, value: IsNil<T[K]>) => AttrBuilder<T>;
	fieldWhen: <K extends keyof T>(cond: boolean, key: K, value: T[K]) => AttrBuilder<T>;
}

export const buildAttrWith = <T>(base: PickRequired<T>): AttrBuilder<T> => {
	const attr = () => base as T;

	const field = <K extends keyof T>(key: K, value: T[K]): AttrBuilder<T> =>
		buildAttrWith({
			...base,
			[key]: value
		});

	const fieldOnly = <K extends keyof T>(key: K, value: IsNil<T[K]>): AttrBuilder<T> => {
		if (isNil(value)) {
			return buildAttrWith(base);
		}
		else {
			return field(key, value);
		}
	};

	const fieldWhen = <K extends keyof T>(cond: boolean, key: K, value: T[K]): AttrBuilder<T> => {
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

export const buildAttr = <T>(): AttrBuilder<T> => buildAttrWith({} as PickRequired<T>);
