import { Mutable, mutable } from "./internal/lens";

export interface FormMutable<T> extends Mutable<T> {
}

export const formMut = <T>(state: T): FormMutable<T> => {
	const mut = mutable(state);

	return {
		...mut
	};
};
