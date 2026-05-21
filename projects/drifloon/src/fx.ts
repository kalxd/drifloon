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
 * 该函数一般用于FromGroup的value格式化。
 * 对于不确定*input*是否为空值的情况下，都可以使用该函数进行处理。
 * 处理后的字符串会`trim`过，不会包含多余空格；如果为空字符串，返回`null`。
 *
 * @example
 * ```
 * normalizeString("  hell o "); // "hell o";
 * normalizeString(undefined); // null
 * ```
 */
export const normalizeString = (input: string | null | undefined): string | null => {
	if (input === null || input === undefined) {
		return null;
	}

	const s = input.trim();
	if (s.length === 0) {
		return null;
	}

	return s;
};

/**
 * 在运行时验证`input`必须不能为空。
 * 此处常用于延后初始化的情景，例如对话打开之后才开始初始化一些成员。
 */
export const assertNotNull = <T>(input: T | null | undefined): NonNullable<T> => {
	if (input === null || input === undefined) {
		throw new Error("input本当有值，此时却是个空！");
	}

	return input;
};
