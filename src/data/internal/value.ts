import { Maybe } from "purify-ts";
import { Mutable } from "./lens";

export interface BindValue<T> {
	bindValue?: Mutable<T>;
	value?: T;
	connectChange: (value: T) => void;
}

export interface BindedValue<T> {
	value: Maybe<T>;
	connectChange: Maybe<(value: T) => void>;
}

export const bindValue = <T>(attr: BindValue<T>): BindedValue<T> => {
	const mbindValue = Maybe.fromNullable(attr.bindValue);
	const mvalue = Maybe.fromNullable(attr.value);
	const mconnectChange = Maybe.fromNullable(attr.connectChange);

	const value = mvalue.altLazy(() => mbindValue.map(v => v.get()));
	return {
		value,
		connectChange: mconnectChange
	};
};
