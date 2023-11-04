import * as m from "mithril";
import { Either, EitherAsync, Just, Maybe, Nothing } from "purify-ts";
import { mutable } from "../data";
import { FluidPlaceholder } from "../element/placeholder";

type ComponentResult<E = {}, T = {}> =
	EitherAsync<E, m.Component<T>>;

export type UpdaterFn<E = {}, T = {}> = () => ComponentResult<E, T>;

interface LoaderState<E = {}, T = {}> {
	dom: Maybe<Either<m.Component<E>, m.Component<T>>>;
	lastFn: Maybe<UpdaterFn<m.Component<E>, T>>;
}

export const useLoader = <E = {}, T = {}>(
):[(updater: UpdaterFn<m.Component<E>, T>) => void, m.Component] => {
	const state = mutable<LoaderState<E, T>>({
		dom: Nothing,
		lastFn: Nothing
	});

	const domLens = state.prop("dom");

	const update = async (f: UpdaterFn<m.Component<E>, T>) => {
		domLens.set(Nothing);
		state.prop("lastFn").set(Just(f));
		m.redraw();

		const dom = await f().run()
		domLens.set(Just(dom));
		m.redraw();
	};

	const comp: m.Component = {
		view: () => {
			const dom = domLens.get();
			return dom
				.map(dom => dom.bimap(m, m).extract())
				.orDefault(m(FluidPlaceholder));
		}
	};

	return [update, comp];
};

export const useDefLoader = <T = {}>(
): [(updater: UpdaterFn<string, T>) => void, m.Component] => {
	const [f, comp] = useLoader<{}, T>();

	const update = async (g: UpdaterFn<string, T>) => {
		const k: ComponentResult<m.Component, T>  = g().mapLeft(msg => ({
			view: () => m("div.ui.icon.negative.message", [
				m("i.icon.exclamation"),
				m("div.content", [
					m("div.header", "出现了错误！"),
					m("p", msg),
					m("button.ui.negative.right.labeled.icon.button", { onclick: () => update(g) }, [
						m("i.right.icon.redo"),
						"重试"
					])
				])
			]),
		}));

		f(() => k);
	};

	return [update, comp];
};
