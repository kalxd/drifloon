import * as m from "mithril";
import { identity, Maybe } from "purify-ts";
import IORef from "./prelude/IORef";
import { pickKlass, RenderFn, selectKlass } from "./prelude/Fn";
import { Outter } from "./Helper/Outter";

interface DropdownTextAttr<T> {
	text?: Maybe<T>;
	placeholder?: string;
	renderText: RenderFn<T>;
}

const DropdownText = <T>(): m.Component<DropdownTextAttr<T>> => ({
	view: ({ attrs }) => {
		return Maybe.fromNullable(attrs.text)
			.join()
			.caseOf({
				Just: value =>
					m("div.text", attrs.renderText(value)),
				Nothing: () =>
					m("div.default.text", attrs.placeholder)
		});
	}
});

export interface DropdownAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	items?: Array<T>,
	onselect?: (item: T) => void;
	renderItem?: (item: T) => m.Children
	renderText?: (item: T) => m.Children
}

export const Dropdown = <T>(_: m.Vnode): m.Component<DropdownAttr<T>> => {
	interface State {
		visible: boolean;
	};

	const stateRef = new IORef<State>({
		visible: false
	});

	const closeE = (_: MouseEvent) => stateRef.putAt("visible", false);
	const toggleE = (_: MouseEvent) => stateRef.updateAt("visible", b => !b);

	return {
		view: ({ attrs }) => {
			const renderItem = attrs.renderItem ?? String;
			const renderText = attrs.renderText ?? String;
			const onselect = attrs.onselect ?? identity;

			const textAttr: DropdownTextAttr<T> = {
				text: attrs.value,
				placeholder: attrs.placeholder,
				renderText
			};

			const isVisible = stateRef.asks(s => s.visible);

			const menu = Maybe.fromFalsy(isVisible)
				.map(_ => {
					return m(
						"div.menu.transition.visible",
						(attrs.items ?? []).map(x => {
							const f = (e: MouseEvent) => {
								onselect(x);
								closeE(e);
								e.stopPropagation();
							};
							return m("div.item", { onclick: f }, renderItem(x))
						})
					)
				})
				.extractNullable();

			const klass = pickKlass([
				selectKlass("active", isVisible)
			]);

			return m(
				Outter,
				{ onOutterClick: closeE },
				m("div.ui.multiple.selection.dropdown",
				  { class: klass, onclick: toggleE },
				  [
					  m("i.dropdown.icon"),
					  m<DropdownTextAttr<T>, any>(DropdownText, textAttr),
					  menu
				  ]
				 )
			);
		}
	};
};
