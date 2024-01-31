import { Either, Just, Maybe, Nothing } from "purify-ts";
import { ValidatorResult, ValidatorError } from "../data/internal/error";
import { Mutable, mutable } from "./internal/lens";

export interface FormMutable<T> extends Mutable<T> {
	validate: <R>(f: (data: T) => ValidatorResult<R>) => Promise<Either<ValidatorError, R>>;
	resetErr: () => void;
	reset: () => void;
	getErr: () => Maybe<ValidatorError>;
	isValidating: () => boolean;
}

export const formMut = <T>(state: T): FormMutable<T> => {
	const err = mutable<Maybe<ValidatorError>>(Nothing);
	const mut = mutable(state);
	const isProcessing = mutable<boolean>(false);

	const validate: FormMutable<T>["validate"] = async f => {
		isProcessing.set(true);
		const s = mut.get();
		const r = await f(s);

		r.ifLeft(e => err.set(Just(e)));
		isProcessing.set(false);

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

	const isValidating: FormMutable<T>["isValidating"] = isProcessing.get;

	return {
		...mut,
		validate,
		resetErr,
		reset,
		getErr,
		isValidating
	};
};
