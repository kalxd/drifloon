import { Maybe } from "./internal/maybe";
import * as R from "rxjs";

/**
 * 一些动作的中间值，类似Promise的三个状态。
 */
export class ActionResult<T> {
	static ok<T>(value: T): ActionResult<T> {
		return new ActionResult(Maybe.Just(value));
	}

	static Pend: ActionResult<any> = new ActionResult(Maybe.Nothing);

	static map<T, R>(
		f: (value: T, index: number) => R
	): R.OperatorFunction<ActionResult<T>, ActionResult<R>> {
		return source => {
			return source.pipe(
				R.map((value, idx) => {
					const v = value.innerValue.map(v => f(v, idx));
					return new ActionResult(v);
				})
			)
		};
	}

	constructor(private innerValue: Maybe<T>) {}

	get value(): T {
		return this.innerValue.unwrap();
	}
}
