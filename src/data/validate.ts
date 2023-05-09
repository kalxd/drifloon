/**
 * 一大堆验证相关的数据结构
 */

import { Either, Left, Right } from "purify-ts";

export const tryParseInt = (n: string): Either<string, number> => {
	const a = parseInt(n);

	if (isNaN(a)) {
		return Left(`${n}不是正常数字！`);
	}
	else {
		return Right(a);
	}
};
