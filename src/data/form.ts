import { Maybe, Nothing } from "purify-ts";
import { ValidatorResult, ValidatorError } from "../internal/error";
import { Mutable, mutable } from "./internal/lens";

export interface FormMutable<T> extends Mutable<T> {
	validate: <R>(f: (data: T) => ValidatorResult<R>) => ValidatorResult<R>;
	resetErr: () => void;
	reset: () => void;
	getErr: () => Maybe<ValidatorError>;
}

export const formMut = <T>(state: T): FormMutable<T> => {
	const err = mutable<Maybe<ValidatorError>>(Nothing);
	const mut = mutable(state);

	const validate: FormMutable<T>["validate"] = f => {
		const s = mut.get();
		const r = f(s);
		err.set(r.swap().toMaybe());
		return r;
	};

	const resetErr: FormMutable<T>["resetErr"] = () => {
		err.set(Nothing);
	};

	const reset: FormMutable<T>["reset"] = () => {
		resetErr();
		mut.set(state);
	};

	const getErr: FormMutable<T>["getErr"] = err.get;

	return {
		...mut,
		validate,
		resetErr,
		reset,
		getErr
	};
};
