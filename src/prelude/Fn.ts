/**
 * 内部辅助函数。
 */

import { curry } from "purify-ts";

export const genMapping = curry(<K extends string | number | symbol, V>(
	obj: Record<K, V>,
	key: K
): V => obj[key]);
