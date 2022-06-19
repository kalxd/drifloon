import * as m from "mithril";
import { List, Maybe, Nothing } from "purify-ts";
import IORef from "./prelude/IORef";
import { Outter } from "./Helper/Outter";

export interface SelectAttr<T> {
	placeholder?: string;
	items: Array<T>,
	renderItem: (item: T) => m.Children
}

export const Select = <T>(_: m.Vnode): m.Component<SelectAttr<T>> => {
	interface State {
		current: Maybe<number>;
		visible: boolean;
	};

	const stateRef: IORef<State> = new IORef({
		current: Nothing,
		visible: false
	});

	const openE = (_: MouseEvent) => stateRef.modify(s => {
		s.visible = true;
		m.redraw();
		return s;
	});

	const closeE = (_: MouseEvent) => stateRef.modify(s => {
		s.visible = false;
		m.redraw();
		return s;
	});

	return {
		view: ({ attrs }) => {
			const menu = stateRef.asks(Maybe.of)
				.filter(s => s.visible)
				.caseOf({
					Just: s => {
						const text = s.current.chain(i => List.at(i, attrs.items))
							.map(attrs.renderItem)
							.caseOf({
								Just: text => m("div.text", text),
								Nothing: () => m("div.default.text", attrs.placeholder)
							});

						return m("div.ui.multiple.selection.dropdown.active.visible", [
							text,
							m(
								"div.menu.transition.visible",
								attrs.items.map(x => m("div.item", attrs.renderItem(x)))
							)
						])
					},
					Nothing: () => m("div.ui.selection.dropdown", { onclick: openE }, [
						m("div.default.text", "sb")
					])
				});

			return m(Outter, { onOutterClick: closeE }, menu);
		}
	};
};
