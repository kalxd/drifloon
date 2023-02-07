import { Either, Maybe, Nothing, Tuple, Just } from "purify-ts";

export class FormValue<T> {
	private value: Tuple<Maybe<Either<string, T>>, string>;

	constructor(value?: string) {
		const v = value ?? "";
		this.value = Tuple.fromArray([Nothing, v]);
	}

	map(f: (value: string) => string): this {
		this.value = this.value.map(f);
		return this;
	}

	put(value: string): this {
		this.value = this.value.map(_ => value);
		return this;
	}

	reset(): this {
		this.value = this.value.map(_ => "");
		return this;
	}

	resetErr(): this {
		this.value = this.value.mapFirst(_ => Nothing);
		return this;
	}

	validate(f: (value: string) => Either<string, T>): this {
		this.value = this.value
			.mapFirst(_ => Just(f(this.value.snd())));
		return this;
	}
}
