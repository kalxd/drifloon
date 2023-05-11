import { curry, Either, Left, Right } from "purify-ts"

export const liftEitherA2 = <E, T1, T2, R>(
	f: (a1: T1, a2: T2) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.map(xs => f(...xs));

export const liftEitherA3 = <E, T1, T2, T3, R>(
	f: (a1: T1, a2: T2, a3: T3) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.map(xs => f(...xs))

export const liftEitherA4 = <E, T1, T2, T3, T4, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.map(xs => f(...xs));

export const liftEitherA5 = <E, T1, T2, T3, T4, T5, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.map(xs => f(...xs));

export const liftEitherA6 = <E, T1, T2, T3, T4, T5, T6, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.map(xs => f(...xs));

export const liftEitherA7 = <E, T1, T2, T3, T4, T5, T6, T7, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7] as [T1, T2, T3, T4, T5, T6, T7]))
		.map(xs => f(...xs));

export const liftEitherA8 = <E, T1, T2, T3, T4, T5, T6, T7, T8, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>,
	ma8: Either<E, T8>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7] as [T1, T2, T3, T4, T5, T6, T7]))
		.chain(xs => ma8.map(a8 => [...xs, a8] as [T1, T2, T3, T4, T5, T6, T7, T8]))
		.map(xs => f(...xs));

export const liftEitherA9 = <E, T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>,
	ma8: Either<E, T8>,
	ma9: Either<E, T9>
): Either<E, R> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7] as [T1, T2, T3, T4, T5, T6, T7]))
		.chain(xs => ma8.map(a8 => [...xs, a8] as [T1, T2, T3, T4, T5, T6, T7, T8]))
		.chain(xs => ma9.map(a9 => [...xs, a9] as [T1, T2, T3, T4, T5, T6, T7, T8, T9]))
		.map(xs => f(...xs));

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

export const callbackWhen = <T>(
	value: T | null | undefined,
	f: (v: T) => void
): void => {
	if (value === null || value === undefined) {
		return ;
	}
	else {
		return f(value);
	}
}

export const mkCallback = (
	f: ((e: MouseEvent) => void) | undefined
): (e: MouseEvent) => void => {
	return e => {
		if (f !== undefined) {
			f(e);
		}
	};
}
