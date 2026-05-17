import { z } from "zod";

export const strInt = z.string()
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

export const datetime = z.codec(z.iso.datetime(), z.date(), {
	decode: s => new Date(s),
	encode: d => d.toISOString()
});
