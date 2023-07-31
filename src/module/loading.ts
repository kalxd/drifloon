import * as m from "mithril";
import { EitherAsync, Maybe, Either, Nothing, Just } from "purify-ts";
import { IORef } from "../data/ref";
import { FluidPlaceholder } from "../element/placeholder";

export type WaittingFn<T = {}> = () => EitherAsync<string, m.Component<T, {}>>;

interface State<T> {
	dom: Maybe<Either<string, m.Component<T, {}>>>;
	lastFn: Maybe<WaittingFn<T>>;
}

export const waitting = <T = {}>(
): [(f: WaittingFn<T>) => void, m.Component] => {
	const state = new IORef<State<T>>({
		dom: Nothing,
		lastFn: Nothing
	});

	const update = async (f: () => EitherAsync<string, m.Component<T, {}>>) => {
		state.put({
			dom: Nothing,
			lastFn: Just(f)
		});
		m.redraw();

		f().run()
			.then(dom => state.putAt("dom", Just(dom)))
			.then(m.redraw);
	};

	const mretry = () =>
		state.askAt("lastFn").ap(Just(update));

	const comp = {
		view: () => state.askAt("dom")
			.map(v => v.bimap(
				e => m("div.ui.icon.negative.message", [
					m("i.icon.exclamation"),
					m("div.content", [
						m("div.header", "出现了错误！"),
						m("p", e),
						m("button.ui.negative.right.labeled.icon.button", { onclick: mretry }, [
							m("i.right.icon.redo"),
							"重试"
						])
					])
				]),
				m
			))
			.map(v => v.extract())
			.orDefault(m(FluidPlaceholder))
	};

	return [update, comp];
};
