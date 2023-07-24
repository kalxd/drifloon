import * as m from "mithril";
import { EitherAsync, Maybe, Either, Nothing, Just, Right, Left } from "purify-ts";
import { IORef } from "../data/ref";
import { FluidPlaceholder } from "../element/placeholder";

export type WaittingFn = () => EitherAsync<string, m.Vnode>;

interface State {
	dom: Maybe<Either<string, m.Vnode>>;
	lastFn: Maybe<WaittingFn>;
}

export const waitting = (
): [(f: WaittingFn) => void, m.Component] => {
	const state = new IORef<State>({
		dom: Nothing,
		lastFn: Nothing
	});

	const update = (f: () => EitherAsync<string, m.Vnode>) => {
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
