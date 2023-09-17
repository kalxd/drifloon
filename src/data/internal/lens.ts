export interface IMutable<T> {
	get: () => T;
	put: (state: T) => void;
	modify: (f: (state: T) => T) => void;
}

interface Op<T> {
	get: () => T;
	put: (value: T) => void;
}

export interface MutableRef<T> extends IMutable<T> {
}

const mutableref = <T>(op: Op<T>): MutableRef<T> => {
	const get: MutableRef<T>["get"] = op.get;
	const put: MutableRef<T>["put"] = op.put;
	const modify: MutableRef<T>["modify"] = f => {
		const s = f(op.get());
		op.put(s);
	};

	return {
		get,
		put,
		modify
	};
};

export interface Mutable<T> extends IMutable<T> {
	lens: <K extends keyof T>(key: K) => MutableRef<T[K]>;
}

export const mutable = <T>(state: T): Mutable<T> => {
	const get: Mutable<T>["get"] = () => state;

	const put: Mutable<T>["put"] = value => state = value;

	const modify: Mutable<T>["modify"] = f => {
		put(f(state));
	};

	const prop = <K extends keyof T>(key: K): MutableRef<T[K]> => {
		const op: Op<T[K]> = {
			get: () => state[key],
			put: value => state[key] = value
		};

		return mutableref(op);
	};

	return {
		get,
		put,
		modify,
		lens: prop
	};
}
