/**
 * 一大堆验证相关的数据结构
 */

import { curry, Either, Left, Right } from "purify-ts";

export const prefix = curry((
	prefix: string,
	input: string
): string => `${prefix}${input}`);

export const notEmpty = curry((input: string): Either<string, string> => {
	if (input.length === 0) {
		return Left("不能为空");
	}
	else {
		return Right(input);
	}
});

export const tryParseInt = (n: string): Either<string, number> => {
	const a = parseInt(n);

	if (isNaN(a)) {
		return Left(`${n}不是正常数字！`);
	}
	else {
		return Right(a);
	}
};
