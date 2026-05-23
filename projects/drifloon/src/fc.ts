/**
 * 常用codec。
 */

import { z } from "zod";

/**
 * 字符串转成整数的schema。
 *
 * ```
 * strIntZ.parse("11"); // 11
 * strIntZ.parse("hello"); // Error!
 *  ```
 */
export const strIntZ = z.string()
	.transform((s, ctx) => {
		try {
			return Number.parseInt(s)
		}
		catch (e) {
			ctx.addIssue({
				code: "custom",
				message: `不是有效的整数！`,
				input: s
			});

			return z.NEVER;
		}
	});

/**
 * 与JSON日期格式的转化。
 */
export const datetimeZ = z.codec(z.iso.datetime(), z.date(), {
	decode: s => new Date(s),
	encode: d => d.toISOString()
});
