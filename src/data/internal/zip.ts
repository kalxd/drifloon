import { Either, Maybe } from "purify-ts"

export const maybeZip = <T1, T2>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>
): Maybe<[T1, T2]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2]));

export const maybeZip3 = <T1, T2, T3>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>
): Maybe<[T1, T2, T3]> =>
	maybeZip(ma1, ma2)
		.chain(xs => ma3.map(a3 => [...xs, a3]));

export const maybeZip4 = <T1, T2, T3, T4>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>
): Maybe<[T1, T2, T3, T4]> =>
	maybeZip3(ma1, ma2, ma3)
		.chain(xs => ma4.map(a4 => [...xs, a4]));

export const maybeZip5 = <T1, T2, T3, T4, T5>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>
): Maybe<[T1, T2, T3, T4, T5]> =>
	maybeZip4(ma1, ma2, ma3, ma4)
		.chain(xs => ma5.map(a5 => [...xs, a5]));

export const maybeZip6 = <T1, T2, T3, T4, T5, T6>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>
): Maybe<[T1, T2, T3, T4, T5, T6]> =>
	maybeZip5(ma1, ma2, ma3, ma4, ma5)
		.chain(xs => ma6.map(a6 => [...xs, a6]));

export const maybeZip7 = <T1, T2, T3, T4, T5, T6, T7>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>,
): Maybe<[T1, T2, T3, T4, T5, T6, T7]> =>
	maybeZip6(ma1, ma2, ma3, ma4, ma5, ma6)
		.chain(xs => ma7.map(a7 => [...xs, a7]));

export const maybeZip8 = <T1, T2, T3, T4, T5, T6, T7, T8>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>,
	ma8: Maybe<T8>
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8]> =>
	maybeZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7)
		.chain(xs => ma8.map(a8 => [...xs, a8]));

export const maybeZip9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>,
	ma8: Maybe<T8>,
	ma9: Maybe<T9>
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8, T9]> =>
	maybeZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8)
		.chain(xs => ma9.map(a9 => [...xs, a9]));

export const maybeZipWith = <T1, T2, R>(
	f: (a1: T1, a2: T2) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>
): Maybe<R> =>
	maybeZip(ma1, ma2).map(xs => f(...xs));

export const maybeZipWith3 = <T1, T2, T3, R>(
	f: (a1: T1, a2: T2, a3: T3) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>
): Maybe<R> =>
	maybeZip3(ma1, ma2, ma3).map(xs => f(...xs));

export const maybeZipWith4 = <T1, T2, T3, T4, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>
): Maybe<R> =>
	maybeZip4(ma1, ma2, ma3, ma4).map(xs => f(...xs));

export const maybeZipWith5 = <T1, T2, T3, T4, T5, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>
): Maybe<R> =>
	maybeZip5(ma1, ma2, ma3, ma4, ma5).map(xs => f(...xs));

export const maybeZipWith6 = <T1, T2, T3, T4, T5, T6, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>
): Maybe<R> =>
	maybeZip6(ma1, ma2, ma3, ma4, ma5, ma6).map(xs => f(...xs));

export const maybeZipWith7 = <T1, T2, T3, T4, T5, T6, T7, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>
): Maybe<R> =>
	maybeZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7).map(xs => f(...xs));

export const maybeZipWith8 = <T1, T2, T3, T4, T5, T6, T7, T8, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>,
	ma8: Maybe<T8>
): Maybe<R> =>
	maybeZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8).map(xs => f(...xs));

export const maybeZipWith9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9) => R,
	ma1: Maybe<T1>,
	ma2: Maybe<T2>,
	ma3: Maybe<T3>,
	ma4: Maybe<T4>,
	ma5: Maybe<T5>,
	ma6: Maybe<T6>,
	ma7: Maybe<T7>,
	ma8: Maybe<T8>,
	ma9: Maybe<T9>
): Maybe<R> =>
	maybeZip9(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9).map(xs => f(...xs));

export const eitherZip = <E, T1, T2>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>
): Either<E, [T1, T2]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2]));

export const eitherZip3 = <E, T1, T2, T3>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>
): Either<E, [T1, T2, T3]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3]));

export const eitherZip4 = <E, T1, T2, T3, T4>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>
): Either<E, [T1, T2, T3, T4]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4]));

export const eitherZip5 = <E, T1, T2, T3, T4, T5>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>
): Either<E, [T1, T2, T3, T4, T5]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5]));

export const eitherZip6 = <E, T1, T2, T3, T4, T5, T6>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>
): Either<E, [T1, T2, T3, T4, T5, T6]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6]));

export const eitherZip7 = <E, T1, T2, T3, T4, T5, T6, T7>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>
): Either<E, [T1, T2, T3, T4, T5, T6, T7]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7]));

export const eitherZip8 = <E, T1, T2, T3, T4, T5, T6, T7, T8>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>,
	ma8: Either<E, T8>
): Either<E, [T1, T2, T3, T4, T5, T6, T7, T8]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7] as [T1, T2, T3, T4, T5, T6, T7]))
		.chain(xs => ma8.map(a8 => [...xs, a8]));

export const eitherZip9 = <E, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>,
	ma8: Either<E, T8>,
	ma9: Either<E, T9>
): Either<E, [T1, T2, T3, T4, T5, T6, T7, T8, T9]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2] as [T1, T2]))
		.chain(xs => ma3.map(a3 => [...xs, a3] as [T1, T2, T3]))
		.chain(xs => ma4.map(a4 => [...xs, a4] as [T1, T2, T3, T4]))
		.chain(xs => ma5.map(a5 => [...xs, a5] as [T1, T2, T3, T4, T5]))
		.chain(xs => ma6.map(a6 => [...xs, a6] as [T1, T2, T3, T4, T5, T6]))
		.chain(xs => ma7.map(a7 => [...xs, a7] as [T1, T2, T3, T4, T5, T6, T7]))
		.chain(xs => ma8.map(a8 => [...xs, a8] as [T1, T2, T3, T4, T5, T6, T7, T8]))
		.chain(xs => ma9.map(a9 => [...xs, a9]));

export const eitherZipWith = <E, T1, T2, R>(
	f: (a1: T1, a2: T2) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>
): Either<E, R> =>
	eitherZip(ma1, ma2).map(xs => f(...xs));

export const eitherZipWith3 = <E, T1, T2, T3, R>(
	f: (a1: T1, a2: T2, a3: T3) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>
): Either<E, R> =>
	eitherZip3(ma1, ma2, ma3).map(xs => f(...xs));

export const eitherZipWith4 = <E, T1, T2, T3, T4, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>
): Either<E, R> =>
	eitherZip4(ma1, ma2, ma3, ma4).map(xs => f(...xs));

export const eitherZipWith5 = <E, T1, T2, T3, T4, T5, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>
): Either<E, R> =>
	eitherZip5(ma1, ma2, ma3, ma4, ma5).map(xs => f(...xs));

export const eitherZipWith6 = <E, T1, T2, T3, T4, T5, T6, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>
): Either<E, R> =>
	eitherZip6(ma1, ma2, ma3, ma4, ma5, ma6).map(xs => f(...xs));

export const eitherZipWith7 = <E, T1, T2, T3, T4, T5, T6, T7, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R,
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>,
	ma7: Either<E, T7>
): Either<E, R> =>
	eitherZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7).map(xs => f(...xs));

export const eitherZipWith8 = <E, T1, T2, T3, T4, T5, T6, T7, T8, R>(
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
	eitherZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8).map(xs => f(...xs));

export const eitherZipWith9 = <E, T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
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
	eitherZip9(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9).map(xs => f(...xs));
