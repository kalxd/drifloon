import { Either } from "purify-ts";

type EitherBind<E, T1, T2> = (a: T1) => Either<E, T2>;

export interface ComposeEither<E, T1, T2> {
	unbox: () => EitherBind<E, T1, T2>;
	compose: <T3>(f: EitherBind<E, T2, T3>) => ComposeEither<E, T1, T3>;
}

export const eitherCompose = <E, T1, T2>(
	f: EitherBind<E, T1, T2>
): ComposeEither<E, T1, T2> => {
	const unbox: ComposeEither<E, T1, T2>["unbox"] = () => f;

	const compose: ComposeEither<E, T1, T2>["compose"] = g => {
		const k = (a: T1) => f(a).chain(g);
		return eitherCompose(k);
	};

	return {
		unbox,
		compose
	};
};
