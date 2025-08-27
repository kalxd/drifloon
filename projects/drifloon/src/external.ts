/**
 * 仿Haskell的Maybe `fmap`函数。
 * @remarks
 * 该函数将`null`、`undefined`视为Nothing，其余为Just。
 *
 * @example
 * ```
 * fmap(1, inc); // 2
 * fmap(0, inc); // 2
 * fmap(null, inc); // null
 * fmap(undefined, inc); // undefined;
 * ```
 * 上述1和0都是正常，会经过`f`(即`inc`)转换，最后得到结果；`null`、`undefined`直接返回本身，不经过`f`。
 *
 * @param value 可能为空的值。
 * @param f 转换函数，只对非空的value进行转换。
 * @returns 经`f`转换后的值。
 */
export const fmap = <T, R>(
	value: T | null | undefined,
	f: (value: T) => R,
): R | null | undefined => {
	if (value === null) {
		return null;
	}
	else if (value === undefined) {
		return undefined;
	}

	return f(value);
};

/**
 * 类似{@link fmap}，只有`null`是Nothing，其余是Just。
 */
export const fmapNull = <T, R>(
	value: T | null,
	f: (value: T) => R
): R | null => {
	if (value === null) {
		return null;
	}

	return f(value);
};

/**
 * 类似{@link fmap}，只有`undefined`是Nothing，其余是Just。
 */
export const fmapUndefined = <T, R>(
	value: T | undefined,
	f: (value: T) => R
): R | undefined => {
	if (value === undefined) {
		return undefined;
	}

	return f(value);
};

/**
 * `trim`一条字符串`input`，
 * 如果trim后为空字符串，则返回undefined，反之返回trim后的结果。
 *
 * @example
 * ```
 * emptyStrToUndefined("  "); // undefined
 * emptyStrToUndefined("  abc"); // "abc"
 * ```
 */
export const emptyStrToUndefined = (input: string): string | undefined => {
	const s= input.trim();
	if (s.length === 0) {
		return undefined;
	}
	return s;
};

/**
 * 类似{@link emptyStrToUndefined}，
 * 空字符串返回`null`。
 */
export const emptyStrToNull = (input: string): string | null => {
	const s = input.trim();
	if (s.length === 0) {
		return null;
	}

	return s;
};
