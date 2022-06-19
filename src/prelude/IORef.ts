/** 从js角度看没什么卵用封装，IO是大事，要小心翼翼。 */

export interface IORef<T> {
	map: <R>(f: (ref: T) => R) => IORef<R>;
	andThen: <R>(f: (ref: T) => IORef<R>) => IORef<R>;
	ap: <A, R>(f: (ref1: T, ref2: A) => R, ref2: IORef<A>) => IORef<R>;
}

export const ioref = <T>(value: T): IORef<T> => {
	const map = <R>(f: (ref: T) => R) => ioref(f(value));

	const andThen = <R>(f: (ref: T) => IORef<R>) => f(value);

	const ap = <A, R>(f: (ref1: T, ref2: A) => R, ref2: IORef<A>) => {
		return ref2.map(ref2 => f(value, ref2));
	};

	return {
		map,
		andThen,
		ap
	};
};
