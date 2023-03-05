import * as m from "mithril";
import { identity, Just, Maybe, Nothing } from "purify-ts";
import { IORef } from "./data/ref";
import { RenderFn } from "./internal/attr";
import { Dropdown } from "./widget/dropdown";
import { AnimateFrame } from "./widget/animate";

interface DropdownTextAttr<T> {
	text?: Maybe<T>;
	placeholder?: string;
	renderText: RenderFn<T>;
}

const DropdownText = <T>(): m.Component<DropdownTextAttr<T>> => ({
	view: ({ attrs }) => Maybe.fromNullable(attrs.text)
		.join()
		.caseOf({
			Just: value =>
				m("div.text", attrs.renderText(value)),
			Nothing: () =>
				m("div.default.text", attrs.placeholder)
		})
});

export interface SelectAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	items?: Array<T>,
	onselect?: (item: Maybe<T>) => void;
	renderItem?: (item: T) => m.Children
	renderText?: (item: T) => m.Children
}

export const Select = <T>(init: m.Vnode<SelectAttr<T>>): m.Component<SelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);
	const closeE = () => stateRef.put(false);
	const clearValueE = (e: MouseEvent) => {
		const f = init.attrs.onselect ?? identity;
		f(Nothing);
		closeE();
		e.stopPropagation();
	};

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

			const isVisible = stateRef.ask();

			const menu = Maybe.fromFalsy(isVisible)
				.map(_ => m(
					AnimateFrame,
					{ class: "menu transition visible"},
					(attrs.items ?? []).map(x => {
						const f = (e: MouseEvent) => {
							onselect(Just(x));
							closeE();
							e.stopPropagation();
						};
						return m("div.item", { onclick: f }, renderItem(x))
					})
				))
				.extractNullable();

			return m(Dropdown, { value: stateRef }, [
				m("i.dropdown.icon"),
				m("i.remove.icon", { onclick: clearValueE }),
				m<DropdownTextAttr<T>, {}>(DropdownText, textAttr),
				menu
			]);
		}
	};
};
