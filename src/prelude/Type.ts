/**
 * 类型相关的定义
 */

import { curry } from "purify-ts";

/**
 * 最令人讨厌的空值！
 */
export type IsNil<T> = T | null | undefined;

/**
 * 检测是否为空值。
 */
export const isNil = <T>(value: IsNil<T>): value is null | undefined =>
	value === null || value === undefined;

/**
 * @example
 * ```
 * interface MyAttr {
 *   age: number;
 *   username?: string;
 * }
 *
 * PickRequired<MyAttr> // { age: number }
 * ```
 */
export type PickRequired<T> = {
	[K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
