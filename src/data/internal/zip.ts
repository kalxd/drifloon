import { Either, EitherAsync, Maybe, MaybeAsync } from "purify-ts"

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
	eitherZip(ma1, ma2)
		.chain(xs => ma3.map(x => [...xs, x]));

export const eitherZip4 = <E, T1, T2, T3, T4>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>
): Either<E, [T1, T2, T3, T4]> =>
	eitherZip3(ma1, ma2, ma3)
		.chain(xs => ma4.map(x => [...xs, x]));

export const eitherZip5 = <E, T1, T2, T3, T4, T5>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>
): Either<E, [T1, T2, T3, T4, T5]> =>
	eitherZip4(ma1, ma2, ma3, ma4)
		.chain(xs => ma5.map(x => [...xs, x]));

export const eitherZip6 = <E, T1, T2, T3, T4, T5, T6>(
	ma1: Either<E, T1>,
	ma2: Either<E, T2>,
	ma3: Either<E, T3>,
	ma4: Either<E, T4>,
	ma5: Either<E, T5>,
	ma6: Either<E, T6>
): Either<E, [T1, T2, T3, T4, T5, T6]> =>
	eitherZip5(ma1, ma2, ma3, ma4, ma5)
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
	eitherZip6(ma1, ma2, ma3, ma4, ma5, ma6)
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
	eitherZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7)
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
	eitherZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8)
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

export const maybeAsyncZip = <T1, T2>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>
): MaybeAsync<[T1, T2]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2]));

export const maybeAsyncZip3 = <T1, T2, T3>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>
): MaybeAsync<[T1, T2, T3]> =>
	maybeAsyncZip(ma1, ma2)
		.chain(xs => ma3.map(a3 => [...xs, a3]));

export const maybeAsyncZip4 = <T1, T2, T3, T4>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
): MaybeAsync<[T1, T2, T3, T4]> =>
	maybeAsyncZip3(ma1, ma2, ma3)
		.chain(xs => ma4.map(a4 => [...xs, a4]));

export const maybeAsyncZip5 = <T1, T2, T3, T4, T5>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>
): MaybeAsync<[T1, T2, T3, T4, T5]> =>
	maybeAsyncZip4(ma1, ma2, ma3, ma4)
		.chain(xs => ma5.map(a5 => [...xs, a5]));

export const maybeAsyncZip6 = <T1, T2, T3, T4, T5, T6>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>
): MaybeAsync<[T1, T2, T3, T4, T5, T6]> =>
	maybeAsyncZip5(ma1, ma2, ma3, ma4, ma5)
		.chain(xs => ma6.map(a6 => [...xs, a6]));

export const maybeAsyncZip7 = <T1, T2, T3, T4, T5, T6, T7>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>
): MaybeAsync<[T1, T2, T3, T4, T5, T6, T7]> =>
	maybeAsyncZip6(ma1, ma2, ma3, ma4, ma5, ma6)
		.chain(xs => ma7.map(a7 => [...xs, a7]));

export const maybeAsyncZip8 = <T1, T2, T3, T4, T5, T6, T7, T8>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>,
	ma8: MaybeAsync<T8>
): MaybeAsync<[T1, T2, T3, T4, T5, T6, T7, T8]> =>
	maybeAsyncZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7)
		.chain(xs => ma8.map(x => [...xs, x]));

export const maybeAsyncZip9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>,
	ma8: MaybeAsync<T8>,
	ma9: MaybeAsync<T9>
): MaybeAsync<[T1, T2, T3, T4, T5, T6, T7, T8, T9]> =>
	maybeAsyncZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8)
		.chain(xs => ma9.map(x => [...xs, x]));

export const maybeAsyncZipWith = <T1, T2, R>(
	f: (a1: T1, a2: T2) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>
): MaybeAsync<R> =>
	maybeAsyncZip(ma1, ma2).map(xs => f(...xs));

export const maybeAsyncZipWith3 = <T1, T2, T3, R>(
	f: (a1: T1, a2: T2, a3: T3) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>
): MaybeAsync<R> =>
	maybeAsyncZip3(ma1, ma2, ma3).map(xs => f(...xs));

export const maybeAsyncZipWith4 = <T1, T2, T3, T4, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>
): MaybeAsync<R> =>
	maybeAsyncZip4(ma1, ma2, ma3, ma4).map(xs => f(...xs));

export const maybeAsyncZipWith5 = <T1, T2, T3, T4, T5, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>
): MaybeAsync<R> =>
	maybeAsyncZip5(ma1, ma2, ma3, ma4, ma5).map(xs => f(...xs));

export const maybeAsyncZipWith6 = <T1, T2, T3, T4, T5, T6, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>
): MaybeAsync<R> =>
	maybeAsyncZip6(ma1, ma2, ma3, ma4, ma5, ma6).map(xs => f(...xs));

export const maybeAsyncZipWith7 = <T1, T2, T3, T4, T5, T6, T7, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>
): MaybeAsync<R> =>
	maybeAsyncZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7).map(xs => f(...xs));

export const maybeAsyncZipWith8 = <T1, T2, T3, T4, T5, T6, T7, T8, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>,
	ma8: MaybeAsync<T8>
): MaybeAsync<R> =>
	maybeAsyncZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8).map(xs => f(...xs));

export const maybeAsyncZipWith9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9) => R,
	ma1: MaybeAsync<T1>,
	ma2: MaybeAsync<T2>,
	ma3: MaybeAsync<T3>,
	ma4: MaybeAsync<T4>,
	ma5: MaybeAsync<T5>,
	ma6: MaybeAsync<T6>,
	ma7: MaybeAsync<T7>,
	ma8: MaybeAsync<T8>,
	ma9: MaybeAsync<T9>
): MaybeAsync<R> =>
	maybeAsyncZip9(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9).map(xs => f(...xs));

export const eitherAsyncZip = <E, T1, T2>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>
): EitherAsync<E, [T1, T2]> =>
	ma1.chain(a1 => ma2.map(a2 => [a1, a2]));

export const eitherAsyncZip3 = <E, T1, T2, T3>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
): EitherAsync<E, [T1, T2, T3]> =>
	eitherAsyncZip(ma1, ma2)
		.chain(xs => ma3.map(x => [...xs, x]));

export const eitherAsyncZip4 = <E, T1, T2, T3, T4>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>
): EitherAsync<E, [T1, T2, T3, T4]> =>
	eitherAsyncZip3(ma1, ma2, ma3)
		.chain(xs => ma4.map(x => [...xs, x]));

export const eitherAsyncZip5 = <E, T1, T2, T3, T4, T5>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>
): EitherAsync<E, [T1, T2, T3, T4, T5]> =>
	eitherAsyncZip4(ma1, ma2, ma3, ma4)
		.chain(xs => ma5.map(x => [...xs, x]));

export const eitherAsyncZip6 = <E, T1, T2, T3, T4, T5, T6>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>
): EitherAsync<E, [T1, T2, T3, T4, T5, T6]> =>
	eitherAsyncZip5(ma1, ma2, ma3, ma4, ma5)
		.chain(xs => ma6.map(x => [...xs, x]));

export const eitherAsyncZip7 = <E, T1, T2, T3, T4, T5, T6, T7>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>
): EitherAsync<E, [T1, T2, T3, T4, T5, T6, T7]> =>
	eitherAsyncZip6(ma1, ma2, ma3, ma4, ma5, ma6)
		.chain(xs => ma7.map(x => [...xs, x]));

export const eitherAsyncZip8 = <E, T1, T2, T3, T4, T5, T6, T7, T8>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>,
	ma8: EitherAsync<E, T8>
): EitherAsync<E, [T1, T2, T3, T4, T5, T6, T7, T8]> =>
	eitherAsyncZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7)
		.chain(xs => ma8.map(x => [...xs, x]));

export const eitherAsyncZip9 = <E, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>,
	ma8: EitherAsync<E, T8>,
	ma9: EitherAsync<E, T9>
): EitherAsync<E, [T1, T2, T3, T4, T5, T6, T7, T8, T9]> =>
	eitherAsyncZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8)
		.chain(xs => ma9.map(x => [...xs, x]));

export const eitherAsyncZipWith = <E, T1, T2, R>(
	f: (a1: T1, a2: T2) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>
): EitherAsync<E, R> =>
	eitherAsyncZip(ma1, ma2).map(xs => f(...xs));

export const eitherAsyncZipWith3 = <E, T1, T2, T3, R>(
	f: (a1: T1, a2: T2, a3: T3) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>
): EitherAsync<E, R> =>
	eitherAsyncZip3(ma1, ma2, ma3).map(xs => f(...xs));

export const eitherAsyncZipWith4 = <E, T1, T2, T3, T4, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>
): EitherAsync<E, R> =>
	eitherAsyncZip4(ma1, ma2, ma3, ma4).map(xs => f(...xs));

export const eitherAsyncZipWith5 = <E, T1, T2, T3, T4, T5, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>
): EitherAsync<E, R> =>
	eitherAsyncZip5(ma1, ma2, ma3, ma4, ma5).map(xs => f(...xs));

export const eitherAsyncZipWith6 = <E, T1, T2, T3, T4, T5, T6, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>
): EitherAsync<E, R> =>
	eitherAsyncZip6(ma1, ma2, ma3, ma4, ma5, ma6).map(xs => f(...xs));

export const eitherAsyncZipWith7 = <E, T1, T2, T3, T4, T5, T6, T7, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>
): EitherAsync<E, R> =>
	eitherAsyncZip7(ma1, ma2, ma3, ma4, ma5, ma6, ma7).map(xs => f(...xs));

export const eitherAsyncZipWith8 = <E, T1, T2, T3, T4, T5, T6, T7, T8, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>,
	ma8: EitherAsync<E, T8>
): EitherAsync<E, R> =>
	eitherAsyncZip8(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8).map(xs => f(...xs));

export const eitherAsyncZipWith9 = <E, T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
	f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9) => R,
	ma1: EitherAsync<E, T1>,
	ma2: EitherAsync<E, T2>,
	ma3: EitherAsync<E, T3>,
	ma4: EitherAsync<E, T4>,
	ma5: EitherAsync<E, T5>,
	ma6: EitherAsync<E, T6>,
	ma7: EitherAsync<E, T7>,
	ma8: EitherAsync<E, T8>,
	ma9: EitherAsync<E, T9>
): EitherAsync<E, R> =>
	eitherAsyncZip9(ma1, ma2, ma3, ma4, ma5, ma6, ma7, ma8, ma9).map(xs => f(...xs));
