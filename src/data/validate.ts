/**
 * 一大堆验证相关的数据结构
 */

import { Either, Left, Right } from "purify-ts";

export * from "./internal/validate";

export const isNotEmpty = (input: string): Either<string, string> => {
	if (input.length === 0) {
		return Left("字符串不能为空！");
	}
	else {
		return Right(input);
	}
};

export const isInt = (s: string): Either<string, number> => {
	const n = Number(s);
	if (Number.isInteger(n)) {
		return Right(n);
	}
	else {
		return Left(`${s}不是整数！`);
	}
};
