import {
	Directive,
	inject,
	input,
	OnInit,
	TemplateRef,
	ViewContainerRef
} from "@angular/core";
import { Maybe } from "../internal/maybe";
import { UiSkeleton } from "../skeleton/skeleton";
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
	static switchMap<T, O extends R.Observable<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R.ObservedValueOf<O>>> {
		return source => source.pipe(
			R.switchMap((item, idx) => {
				return f(item, idx).pipe(
					R.map(ActionResult.Ok),
					R.startWith(ActionResult.Pend)
				);
			})
		);
	}

	/**
	 * {@link R.mergeMap | mergeMap}一样的效果。
	 * 见{@link switchMap}
	 */
	static mergeMap<T, O extends R.Observable<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R.ObservedValueOf<O>>> {
		return source => source.pipe(
			R.mergeMap((item, idx) => {
				return f(item, idx).pipe(
					R.map(ActionResult.Ok),
					R.startWith(ActionResult.Pend),
				);
			})
		);
	}

	static concatMap<T, O extends R.Observable<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R.ObservedValueOf<O>>> {
		return source => source.pipe(
			R.concatMap((item, idx) => {
				return f(item, idx).pipe(
					R.map(ActionResult.Ok),
					R.startWith(ActionResult.Pend)
				);
			})
		);
	}

	static exhaustMap<T, O extends R.Observable<any>>(
		f: (value: T, idx: number) => O
	): R.OperatorFunction<T, ActionResult<R.ObservedValueOf<O>>> {
		return source => source.pipe(
			R.exhaustMap((item, idx) => {
				return f(item, idx).pipe(
					R.map(ActionResult.Ok),
					R.startWith(ActionResult.Pend)
				);
			})
		);
	}

	constructor(private innerValue: Maybe<T>) {}

	isOk(): boolean {
		return this.innerValue.isJust();
	}

	get value(): T {
		return this.innerValue.unwrap();
	}
}

@Directive({
	selector: "[task]"
})
export class UiTaskDirective<T> implements OnInit {
	taskFrom = input.required<R.Observable<ActionResult<T>>>();

	private container = inject(ViewContainerRef);
	private templateRef = inject(TemplateRef);

	ngOnInit(): void {
		this.taskFrom()
			.subscribe(value => {
				this.container.clear();
				if (!value.isOk()) {
					this.container.createComponent(UiSkeleton);
					return;
				}

				this.container.createEmbeddedView(this.templateRef, {
					$implicit: value.value
				});
			});
	}
}
