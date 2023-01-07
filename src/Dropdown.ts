import * as m from "mithril";
import { List, Maybe, Nothing } from "purify-ts";
import IORef from "./prelude/IORef";
import { Outter } from "./Helper/Outter";

interface DropdownTextAttr<T> {
	text: Maybe<T>;
	placeholder?: string;
	renderText: (value: T) => m.Component;
	onclick: (event: MouseEvent) => void;
}

const DropdownText = <T>(_: m.Vnode<T>): m.Component<DropdownTextAttr<T>> => ({
	view: ({ attrs }) => {
		return attrs.text.caseOf({
			Just: value =>
				m("div.text", { onclick: attrs.onclick }, m(attrs.renderText(value))),
			Nothing: () =>
				m("div.default.text", { onclick: attrs.onclick }, attrs.placeholder)
		});
	}
});

const DropdownCollapse = <T>(_: m.Vnode<T>): m.Component<DropdownTextAttr<T>> => ({
	view: ({ attrs }) => {
		m("div.ui.multiple.selection", [
			m("i.dropdown.icon"),
			m<any, any>(DropdownText, attrs)
		]);
	}
});

export interface DropdownAttr<T> {
	value: Maybe<T>;
	placeholder?: string;
	items: Array<T>,
	renderItem: (item: T) => m.Component;
	renderText: (item: T) => m.Component;
}

export const Dropdown = <T>(_: m.Vnode): m.Component<DropdownAttr<T>> => {
	interface State {
		visible: boolean;
	};

	const stateRef: IORef<State> = new IORef({
		current: Nothing,
		visible: false
	});

	const openE = (_: MouseEvent) => stateRef.modify(s => {
		s.visible = true;
		return s;
	});

	const closeE = (_: MouseEvent) => stateRef.modify(s => {
		s.visible = false;
		return s;
	});

	return {
		view: ({ attrs }) => {
			const menu = stateRef.asks(Maybe.of)
				.filter(s => s.visible)
				.caseOf({
					Just: _ => {
						const text = attrs.value.chain(i => List.at(i, attrs.items))
							.map(attrs.renderItem)
							.caseOf({
								Just: text => m("div.text", text),
								Nothing: () => m("div.default.text", attrs.placeholder)
							});

						return m("div.ui.multiple.selection.dropdown.active.visible", [
							text,
							m(
								"div.menu.transition.visible.animate__animated.animate__flipInX",
								attrs.items.map(x => m("div.item", attrs.renderItem(x)))
							)
						])
					},
					Nothing: () => m("div.ui.selection.dropdown", { onclick: openE }, [
						m("div.default.text", "sb")
					])
				});
			const text = attrs.value.caseOf({
				Just: value => m("div.text", attrs.renderText(value)),
				Nothing: () => m("div.default.text", attrs.placeholder)
			});

			return m(
				Outter,
				{ onOutterClick: closeE },
				m("div.ui.multiple.selection.dropdown", [
					m("i.dropdown.icon"),
					text,
					menu
				])
			);
		}
	};
};
