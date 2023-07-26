import * as m from "mithril";
import { EitherAsync, Maybe, Either, Nothing, Just, Right, Left } from "purify-ts";
import { IORef } from "../data/ref";
import { FluidPlaceholder } from "../element/placeholder";

export type WaittingFn<T = {}> = () => EitherAsync<string, m.Vnode<T>>;

interface State<T> {
	dom: Maybe<Either<string, m.Vnode<T>>>;
	lastFn: Maybe<WaittingFn<T>>;
}

export const waitting = <T = {}>(
): [(f: WaittingFn<T>) => void, m.Component] => {
	const state = new IORef<State<T>>({
		dom: Nothing,
		lastFn: Nothing
	});

	const update = (f: () => EitherAsync<string, m.Vnode<T>>) => {
		state.put({
			dom: Nothing,
			lastFn: Just(f)
		});

		f()
			.caseOf({
				Right: s => state.putAt("dom", Just(Right(s))),
				Left: e => state.putAt("dom", Just(Left(e)))
			})
			.then(m.redraw);
	};

	const mretry = () =>
		state.askAt("lastFn").ap(Just(update));

	const comp = {
		view: () => state.askAt("dom")
				.caseOf({
					Just: x => x.caseOf({
						Right: v => v,
						Left: e => m("div.ui.icon.negative.message", [
							m("i.icon.exclamation"),
							m("div.content", [
								m("div.header", "出现了错误！"),
								m("p", e),
								m("button.ui.negative.right.labeled.icon.button", { onclick: mretry }, [
									m("i.right.icon.redo"),
									"重试"
								])
							])
						])
					}),
					Nothing: () => m(FluidPlaceholder)
				})
	};

	return [update, comp];
};
