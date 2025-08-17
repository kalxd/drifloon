import * as R from "rxjs";

interface ActionOk<T> {
	tag: "__action_ok";
	value: T;
}

interface ActionPend {
	tag: "__action_pend"
}

type ActionType<T> = ActionOk<T> | ActionPend;

export class ActionResult<T> {
	static ok<T>(value: T): ActionResult<T> {
		return new ActionResult({ tag: "__action_ok", value });
	}

	static Pend: ActionResult<any> = new ActionResult({ tag: "__action_pend" });

	static map<T, R>(
		f: (value: T, index: number) => R
	): R.OperatorFunction<ActionResult<T>, ActionResult<R>> {
		return source => {
			return source.pipe(
				R.map((value, item) => {
					if (value.innerValue.tag === "__action_ok") {
						const nextval = f(value.value, item);
						return ActionResult.ok(nextval);
					}

					return ActionResult.Pend;
				})
			)
		};
	}

	private innerValue: ActionType<T>;

	constructor(value: ActionType<T>) {
		this.innerValue = value;
	}

	get valueOptional(): T | null {
		if (this.innerValue.tag === "__action_ok") {
			return this.innerValue.value;
		}

		return null;
	}

	get value(): T {
		if (this.innerValue.tag === "__action_ok") {
			return this.innerValue.value;
		}

		throw new Error("尝试从ActionPend取值！");
	}
}
