import { EitherAsync } from "purify-ts";
import { IsNil, isNil } from "./function";

export type ValidatorError = Array<string>;
export type ValidatorResult<T> = EitherAsync<ValidatorError, T>;

export class ComponentPanic {
	private readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	public panic(msg: string): never {
		throw new Error(`[${this.name}] ${msg}`);
	}

	public panicWhen(cond: boolean, msg: string): void {
		if (cond) {
			this.panic(msg);
		}
	}

	public panicNil<T>(value: IsNil<T>, msg: string): T {
		if (isNil(value)) {
			this.panic(msg);
		}
		return value;
	}

	public panicEmpty<T>(value: Array<T>, msg: string): Array<T> {
		if (!value.length) {
			this.panic(msg);
		}

		return value;
	}
}
