import { Maybe } from "./internal/maybe";
import * as R from "rxjs";

/**
 * 一些动作的中间值，类似Promise的三个状态。
 */
export class ActionResult<T> {
	static Ok<T>(value: T): ActionResult<T> {
		return new ActionResult(Maybe.Just(value));
	}

	static Pend: ActionResult<any> = new ActionResult(Maybe.Nothing);

	static map<T, R>(
		f: (value: T, index: number) => R
	): R.OperatorFunction<ActionResult<T>, ActionResult<R>> {
		return source => source.pipe(
			R.map((value, idx) => {
				const v = value.innerValue.map(v => f(v, idx));
				return new ActionResult(v);
			})
		);
	}

	/**
	 * {@link R.switchMap | switchMap}一样的效果。
	 * 自动`startWith(ActionResult.Pend)`。
	 */
	static switchMap<T, R, O extends R.ObservableInput<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R>> {
		return source => source.pipe(
			R.switchMap(f),
			R.map(ActionResult.Ok),
			R.startWith(ActionResult.Pend)
		);
	}

	/**
	 * {@link R.mergeMap | mergeMap}一样的效果。
	 * 见{@link switchMap}
	 */
	static mergeMap<T, R, O extends R.ObservableInput<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R>> {
		return source => source.pipe(
			R.mergeMap(f),
			R.map(ActionResult.Ok),
			R.startWith(ActionResult.Pend),
		);
	}

	static concatMap<T, R, O extends R.ObservableInput<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R>> {
		return source => source.pipe(
			R.concatMap(f),
			R.map(ActionResult.Ok),
			R.startWith(ActionResult.Pend)
		);
	}

	static exhaustMap<T, R, O extends R.ObservableInput<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R>> {
		return source => source.pipe(
			R.exhaustMap(f),
			R.map(ActionResult.Ok),
			R.startWith(ActionResult.Pend)
		);
	}

	constructor(private innerValue: Maybe<T>) {}

	get value(): T {
		return this.innerValue.unwrap();
	}
}
