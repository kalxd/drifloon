import * as m from "mithril";
import { Either, Just, Maybe, Nothing } from "purify-ts";
import { ValidatorResult, ValidatorError } from "../data/internal/error";
import { Mutable, mutable, Prism } from "./internal/lens";
import { _just } from "./lens";

export interface FormInit {
	_tag: "FormInit";
}

const formInitValue: FormInit = {
	_tag: "FormInit"
};

export interface FormLoading {
	_tag: "FormLoading";
};

const formLoadingValue: FormLoading = {
	_tag: "FormLoading"
};

export interface FormResult {
	_tag: "FormResult";
	_value: Maybe<ValidatorError>;
}

const mkFormResult = (value: Maybe<ValidatorError>): FormResult => ({
	_tag: "FormResult",
	_value: value
});

export type FormState = FormInit | FormLoading | FormResult;

const _isloading = (): Prism<FormState, boolean> => ({
	get: s => Just(s._tag === "FormLoading"),
	set: (s, _) => Just(s)
});

const _result = (): Prism<FormState, Maybe<ValidatorError>> => ({
	get: s => {
		if (s._tag === "FormResult") {
			return Just(s._value);
		}
		else {
			return Nothing;
		}
	},
	set: (s, _) => Just(s)
});

export interface FormMutable<T> extends Mutable<T> {
	validate: <R>(f: (data: T) => ValidatorResult<R>) => Promise<Either<ValidatorError, R>>;
	resetTip: () => void;
	reset: () => void;
	getResult: () => Maybe<Maybe<ValidatorError>>;
	isValidating: () => boolean;
}

export const formMut = <T>(state: T): FormMutable<T> => {
	const formState = mutable<FormState>(formInitValue);
	const mut = mutable(state);

	const validate: FormMutable<T>["validate"] = async f => {
		formState.set(formLoadingValue);
		m.redraw();

		const s = mut.get();
		const r = await f(s);

		const es = r.swap().toMaybe();

		formState.set(mkFormResult(es));
		m.redraw();
		return r;
	};

	const resetTip: FormMutable<T>["resetTip"] = () => {
		formState.set(formInitValue);
	};

	const reset: FormMutable<T>["reset"] = () => {
		resetTip();
		mut.set(state);
	};

	const getResult: FormMutable<T>["getResult"] = () =>
		formState.prism(_result()).get();

	const isValidating: FormMutable<T>["isValidating"] = () =>
		formState.prism(_isloading()).get().orDefault(false);

	return {
		...mut,
		validate,
		resetTip,
		reset,
		getResult,
		isValidating
	};
};
