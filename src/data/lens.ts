import { Maybe, List, Nothing, Just, identity, Either, Right, Left } from "purify-ts";
import { Prism } from "./internal/lens";

export * from "./internal/lens";

export const _notNil = <T>(): Prism<T | undefined, T> => ({
	get: Maybe.fromNullable,
	set: (state, v) => Maybe.fromNullable(state).map(_ => v)
});

export const _ix = <T>(index: number): Prism<Array<T>, T> => ({
	get: xs => List.at(index, xs),
	set: (xs, x) => Maybe.of(xs)
		.filter(xs => xs.length > index)
		.filter(_ => index >= 0)
		.map(xs => {
			const ys = [...xs];
			ys[index] = x;
			return ys;
		})
});

export const _just = <T>(): Prism<Maybe<T>, T> => ({
	get: identity,
	set: (state, v) => state.map(_ => Just(v))
});

export const _nothing = <T>(): Prism<Maybe<T>, void> => ({
	get: state => state.caseOf({
		Just: _ => Nothing,
		Nothing: () => Just(void 0)
	}),
	set: (state, _) => state.caseOf({
		Just: _ => Nothing,
		Nothing: () => Just(Nothing)
	})
});

export const _right = <E, T>(): Prism<Either<E, T>, T> => ({
	get: state => state.toMaybe(),
	set: (state, v) => state.toMaybe().map(_ => Right(v))
});

export const _left = <E, T>(): Prism<Either<E, T>, E> => ({
	get: state => state.swap().toMaybe(),
	set: (state, v) => state.swap().toMaybe().map(_ => Left(v))
});
