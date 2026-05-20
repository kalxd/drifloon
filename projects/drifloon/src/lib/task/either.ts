abstract class EitherTrait<A, B> {
	abstract isRight(): boolean;
	abstract map<R>(f: (value: B) => R): EitherTrait<A, R>;
}

export class Right<A, B> extends EitherTrait<A, B> {
	private readonly value: B;

	constructor(value: B) {
		super();
		this.value = value;
	}


	override isRight(): boolean {
		return true;
	}

	override map<R>(f: (value: B) => R): EitherTrait<A, R> {
		const nextValue = f(this.value);
		return new Right(nextValue);
	}
}

export class Left<A, B> extends EitherTrait<A, B> {
	private readonly value: A;

	constructor(value: A) {
		super();
		this.value = value;
	}

	override isRight(): boolean {
		return false;
	}

	override map<R>(_: (value: B) => R): EitherTrait<A, R> {
		return new Left(this.value);
	}
}

export class Eitehr<A, B> extends EitherTrait<A, B> {
	private value: EitherTrait<A, B>;

	constructor(value: EitherTrait<A, B>) {
		super();
		this.value = value;
	}

	override isRight(): boolean {
		return this.value.isRight();
	}

	override map<R>(f: (value: B) => R): EitherTrait<A, R> {
		return this.value.map(f);
	}
}
