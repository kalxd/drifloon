import { Either, Left } from "purify-ts";

const concatError = (name: string, e: string): Array<string> =>
	[`${name}：${e}`];

type ES<T> = Either<Array<string>, T>;

const selectEither = <T1, T2>(a: ES<T1>, b: ES<T2>): ES<[T1, T2]> => {
	return a.caseOf({
		Right: x => b.map(y => [x, y] as [T1, T2]),
		Left: e => b.caseOf({
			Right: _ => Left(e),
			Left: ey => Left(e.concat(ey))
		})
	});
};

const selectEither3 = <T1, T2, T3>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>
): ES<[T1, T2, T3]> =>
	selectEither(a3, selectEither(a1, a2))
		.map(([x3, [x1, x2]]) => [x1, x2, x3]);

const selectEither4 = <T1, T2, T3, T4>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
): ES<[T1, T2, T3, T4]> =>
	selectEither(a4, selectEither3(a1, a2, a3))
		.map(([x4, xs]) => [...xs, x4]);

const selectEither5 = <T1, T2, T3, T4, T5>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>
): ES<[T1, T2, T3, T4, T5]> =>
	selectEither(a5, selectEither4(a1, a2, a3, a4))
		.map(([x5, xs]) => [...xs, x5]);

const selectEither6 = <T1, T2, T3, T4, T5, T6>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>
): ES<[T1, T2, T3, T4, T5, T6]> =>
	selectEither(a6, selectEither5(a1, a2, a3, a4, a5))
		.map(([x, xs]) => [...xs, x]);

const selectEither7 = <T1, T2, T3, T4, T5, T6, T7>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
): ES<[T1, T2, T3, T4, T5, T6, T7]> =>
	selectEither(a7, selectEither6(a1, a2, a3, a4, a5, a6))
		.map(([x, xs]) => [...xs, x]);

const selectEither8 = <T1, T2, T3, T4, T5, T6, T7, T8>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8]> =>
	selectEither(a8, selectEither7(a1, a2, a3, a4, a5, a6, a7))
		.map(([x, xs]) => [...xs, x]);

const selectEither9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9]> =>
	selectEither(a9, selectEither8(a1, a2, a3, a4, a5, a6, a7, a8))
		.map(([x, xs]) => [...xs, x]);

const selectEither10 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]> =>
	selectEither(a10, selectEither9(a1, a2, a3, a4, a5, a6, a7, a8, a9))
		.map(([x, xs]) => [...xs, x]);

const selectEither11 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]> =>
	selectEither(a11, selectEither10(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10))
		.map(([x, xs]) => [...xs, x]);

const selectEither12 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>,
	a12: ES<T12>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]> =>
	selectEither(a12, selectEither11(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11))
		.map(([x, xs]) => [...xs, x]);

const selectEither13 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>,
	a12: ES<T12>,
	a13: ES<T13>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]> =>
	selectEither(a13, selectEither12(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12))
		.map(([x, xs]) => [...xs, x]);

const selectEither14 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>,
	a12: ES<T12>,
	a13: ES<T13>,
	a14: ES<T14>,
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]> =>
	selectEither(a14, selectEither13(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13))
		.map(([x, xs]) => [...xs, x]);

const selectEither15 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>,
	a12: ES<T12>,
	a13: ES<T13>,
	a14: ES<T14>,
	a15: ES<T15>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]> =>
	selectEither(a15, selectEither14(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14))
		.map(([x, xs]) => [...xs, x]);

const selectEither16 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(
	a1: ES<T1>,
	a2: ES<T2>,
	a3: ES<T3>,
	a4: ES<T4>,
	a5: ES<T5>,
	a6: ES<T6>,
	a7: ES<T7>,
	a8: ES<T8>,
	a9: ES<T9>,
	a10: ES<T10>,
	a11: ES<T11>,
	a12: ES<T12>,
	a13: ES<T13>,
	a14: ES<T14>,
	a15: ES<T15>,
	a16: ES<T16>
): ES<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16]> =>
	selectEither(a16, selectEither15(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15))
		.map(([x, xs]) => [...xs, x]);

interface Validate16<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15, a16: T16) => R) => ES<R>;
}

const validate16 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
	v12: ES<T12>,
	v13: ES<T13>,
	v14: ES<T14>,
	v15: ES<T15>,
	v16: ES<T16>
): Validate16<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16> => {
	const collect: Validate16<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16>["collect"] = f =>
		selectEither16(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16)
			.map(xs => f(...xs));
	return {
		collect
	};
}

interface Validate15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14, a15: T15) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate16<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, U>;
}

const validate15 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
	v12: ES<T12>,
	v13: ES<T13>,
	v14: ES<T14>,
	v15: ES<T15>,
): Validate15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15> => {
	const collect: Validate15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>["collect"] = f =>
		selectEither15(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15)
			.map(xs => f(...xs));

	const param: Validate15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate16(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, next);
	};

	return {
		collect,
		param
	};
}

interface Validate14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13, a14: T14) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, U>;
}

const validate14 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
	v12: ES<T12>,
	v13: ES<T13>,
	v14: ES<T14>,
): Validate14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14> => {
	const collect: Validate14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>["collect"] = f =>
		selectEither14(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14)
			.map(xs => f(...xs));

	const param: Validate14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate15(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, next);
	};

	return {
		collect,
		param
	};
}

interface Validate13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12, a13: T13) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, U>;
}

const validate13 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
	v12: ES<T12>,
	v13: ES<T13>,
): Validate13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13> => {
	const collect: Validate13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>["collect"] = f =>
		selectEither13(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13)
			.map(xs => f(...xs));

	const param: Validate13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate14(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, next);
	};

	return {
		collect,
		param
	};
}

interface Validate12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11, a12: T12) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, U>;
}

const validate12 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
	v12: ES<T12>,
): Validate12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12> => {
	const collect: Validate12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>["collect"] = f =>
		selectEither12(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12)
			.map(xs => f(...xs));

	const param: Validate12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate13(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, next);
	};

	return {
		collect,
		param
	};
}

interface Validate11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10, a11: T11) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, U>;
}

const validate11 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
	v11: ES<T11>,
): Validate11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11> => {
	const collect: Validate11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>["collect"] = f =>
		selectEither11(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11)
			.map(xs => f(...xs));

	const param: Validate11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate12(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, next);
	};

	return {
		collect,
		param
	};
}

interface Validate10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9, a10: T10) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, U>;
}

const validate10 = <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
	v10: ES<T10>,
): Validate10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> => {
	const collect: Validate10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>["collect"] = f =>
		selectEither10(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10)
			.map(xs => f(...xs));

	const param: Validate10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate11(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, next);
	};

	return {
		collect,
		param
	};
}

interface Validate9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8, a9: T9) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate10<T1, T2, T3, T4, T5, T6, T7, T8, T9, U>;
}

const validate9 = <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
	v9: ES<T9>,
): Validate9<T1, T2, T3, T4, T5, T6, T7, T8, T9> => {
	const collect: Validate9<T1, T2, T3, T4, T5, T6, T7, T8, T9>["collect"] = f =>
		selectEither9(v1, v2, v3, v4, v5, v6, v7, v8, v9)
			.map(xs => f(...xs));

	const param: Validate9<T1, T2, T3, T4, T5, T6, T7, T8, T9>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate10(v1, v2, v3, v4, v5, v6, v7, v8, v9, next);
	};

	return {
		collect,
		param
	};
}

interface Validate8<T1, T2, T3, T4, T5, T6, T7, T8> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7, a8: T8) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate9<T1, T2, T3, T4, T5, T6, T7, T8, U>;
}

const validate8 = <T1, T2, T3, T4, T5, T6, T7, T8>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
	v8: ES<T8>,
): Validate8<T1, T2, T3, T4, T5, T6, T7, T8> => {
	const collect: Validate8<T1, T2, T3, T4, T5, T6, T7, T8>["collect"] = f =>
		selectEither8(v1, v2, v3, v4, v5, v6, v7, v8)
			.map(xs => f(...xs));

	const param: Validate8<T1, T2, T3, T4, T5, T6, T7, T8>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate9(v1, v2, v3, v4, v5, v6, v7, v8, next);
	};

	return {
		collect,
		param
	};
}

interface Validate7<T1, T2, T3, T4, T5, T6, T7> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6, a7: T7) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate8<T1, T2, T3, T4, T5, T6, T7, U>;
}

const validate7 = <T1, T2, T3, T4, T5, T6, T7>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
	v7: ES<T7>,
): Validate7<T1, T2, T3, T4, T5, T6, T7> => {
	const collect: Validate7<T1, T2, T3, T4, T5, T6, T7>["collect"] = f =>
		selectEither7(v1, v2, v3, v4, v5, v6, v7)
			.map(xs => f(...xs));

	const param: Validate7<T1, T2, T3, T4, T5, T6, T7>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate8(v1, v2, v3, v4, v5, v6, v7, next);
	};

	return {
		collect,
		param
	};
}

interface Validate6<T1, T2, T3, T4, T5, T6> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate7<T1, T2, T3, T4, T5, T6, U>;
}

const validate6 = <T1, T2, T3, T4, T5, T6>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
	v6: ES<T6>,
): Validate6<T1, T2, T3, T4, T5, T6> => {
	const collect: Validate6<T1, T2, T3, T4, T5, T6>["collect"] = f =>
		selectEither6(v1, v2, v3, v4, v5, v6)
			.map(xs => f(...xs));

	const param: Validate6<T1, T2, T3, T4, T5, T6>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate7(v1, v2, v3, v4, v5, v6, next);
	};

	return {
		collect,
		param
	};
}

interface Validate5<T1, T2, T3, T4, T5> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate6<T1, T2, T3, T4, T5, U>;
}

const validate5 = <T1, T2, T3, T4, T5>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
	v5: ES<T5>,
): Validate5<T1, T2, T3, T4, T5> => {
	const collect: Validate5<T1, T2, T3, T4, T5>["collect"] = f =>
		selectEither5(v1, v2, v3, v4, v5)
			.map(xs => f(...xs));

	const param: Validate5<T1, T2, T3, T4, T5>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate6(v1, v2, v3, v4, v5, next);
	};

	return {
		collect,
		param
	};
}

interface Validate4<T1, T2, T3, T4> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3, a4: T4) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate5<T1, T2, T3, T4, U>;
}

const validate4 = <T1, T2, T3, T4>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
	v4: ES<T4>,
): Validate4<T1, T2, T3, T4> => {
	const collect: Validate4<T1, T2, T3, T4>["collect"] = f =>
		selectEither4(v1, v2, v3, v4)
			.map(xs => f(...xs));

	const param: Validate4<T1, T2, T3, T4>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate5(v1, v2, v3, v4, next);
	};

	return {
		collect,
		param
	};
}

interface Validate3<T1, T2, T3> {
	collect: <R>(f: (a1: T1, a2: T2, a3: T3) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate4<T1, T2, T3, U>;
}

const validate3 = <T1, T2, T3>(
	v1: ES<T1>,
	v2: ES<T2>,
	v3: ES<T3>,
): Validate3<T1, T2, T3> => {
	const collect: Validate3<T1, T2, T3>["collect"] = f =>
		selectEither3(v1, v2, v3)
			.map(xs => f(...xs));

	const param: Validate3<T1, T2, T3>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate4(v1, v2, v3, next);
	};

	return {
		collect,
		param
	};
}

interface Validate2<T1, T2> {
	collect: <R>(f: (a1: T1, a2: T2) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate3<T1, T2, U>;
}

const validate2 = <T1, T2>(
	v1: ES<T1>,
	v2: ES<T2>
): Validate2<T1, T2> => {
	const collect: Validate2<T1, T2>["collect"] = f =>
		selectEither(v1, v2).map(([a1, a2]) => f(a1, a2));

	const param: Validate2<T1, T2>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate3(v1, v2, next);
	};

	return {
		collect,
		param
	};
}

interface Validate<T> {
	collect: <R>(f: (val: T) => R) => ES<R>;
	param: <U>(name: string, rhs: Either<string, U>) => Validate2<T, U>;
}

export const validate = <T>(name: string, value: Either<string, T>): Validate<T> => {
	const fvalue = value.mapLeft(e => concatError(name, e));

	const collect: Validate<T>["collect"] = f => fvalue.map(f);

	const param: Validate<T>["param"] = (name, rhs) => {
		const next = rhs.mapLeft(e => concatError(name, e));
		return validate2(fvalue, next);
	};

	return {
		collect,
		param
	};
};
