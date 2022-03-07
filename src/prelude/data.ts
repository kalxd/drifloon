/**
 * 基本常量定义。
 */

export type Color = "primary" | "info" | "success" | "warning" | "danger";

export type Size = "small" | "normal" | "medium" | "large";

/**
 * 转化成bulma基本的class形式。
 */
export type IsBulmaClass<T extends string> = `is-${T}`;

export const foldObject = <K extends number | string | symbol, V, R>(
	f: (acc: Record<K, R>, value: V, key: K) => Record<K, R>,
	acc: Record<K, R>,
	obj: Record<K, V>
): Record<K, R> => {
	for (const key in obj) {
		acc = f(acc, obj[key], key);
	}
	return acc;
}

export const mapObject = <K extends number | string | symbol, V, R>(
	f: (value: V) => R,
	obj: Record<K, V>
): Record<K, R> => {
	const g = (acc: Record<K, R>, value: V, k: K) => {
		acc[k] = f(value);
		return acc;
	};

	return foldObject(g, {} as Record<K, R>, obj);
}
