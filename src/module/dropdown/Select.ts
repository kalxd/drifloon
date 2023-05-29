import * as m from "mithril";
import { IORef } from "../../data/ref";
import { DropdownFrame, SelectText, SelectTextAttr } from "../../element/dropdown";
import { Just, Maybe, Nothing } from "purify-ts";
import { AnimateFrame } from "../../abstract/animate";

export interface SelectAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => m.Children;
	connectChange?: (item: Maybe<T>) => void;
}

interface MenuAttr<T> {
	itemList: Array<T>;
	renderItem: (item: T) => m.Children;
	connectChange: (item: T) => void;
}

const Menu = <T>(): m.Component<MenuAttr<T>> => ({
	view: ({ attrs }) => {
		const itemOfChildren = attrs.itemList.map(item => {
			return m(
				"div.item",
				{ onclick: () => attrs.connectChange(item) },
				attrs.renderItem(item)
			);
		});

		return m(
			AnimateFrame,
			{ el: "div.ui.menu.selection.transition.visible" },
			itemOfChildren
		);
	}
});

export const Select = <T>(): m.Component<SelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const textAttr: SelectTextAttr<T> = {
				text: Maybe.fromNullable(attrs.value).join(),
				placeholder: Maybe.fromNullable(attrs.placeholder),
				renderText: attrs.renderText ?? String
			};

			const mchange = Maybe.fromNullable(attrs.connectChange);

			const connectRemove = () => {
				mchange.ifJust(f => f(Nothing));
			};

			const menu = Maybe.fromNullable(attrs.itemList ?? [])
				.filter(_ => stateRef.ask())
				.map(itemList => {
					const connectChange = (item: T) => {
						mchange.ifJust(f => f(Just(item)));
					};

					const attr: MenuAttr<T> = {
						itemList,
						renderItem: attrs.renderItem ?? String,
						connectChange
					};
					return m<MenuAttr<T>, {}>(Menu, attr);
				});

			return m(DropdownFrame, { value: stateRef, class: Nothing }, [
				m("i.icon.dropdown"),
				m("i.icon.remove", { onclick: connectRemove }),
				m<SelectTextAttr<T>, {}>(SelectText, textAttr),
				menu.extract()
			]);
		}
	};
};
