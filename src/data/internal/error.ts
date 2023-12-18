import { Either } from "purify-ts";
import { IsNil, isNil } from "./function";

export type ValidatorError = Array<string>;
export type ValidatorResult<T> = Either<ValidatorError, T>;

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

	public panicNil<T>(value: IsNil<T>, msg: string): void {
		if (isNil(value)) {
			this.panic(msg);
		}
	}

	public panicEmpty<T>(value: Array<T>, msg: string): void {
		if (!value.length) {
			this.panic(msg);
		}
	}
}
