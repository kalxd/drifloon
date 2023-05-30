import * as m from "mithril";
import { ComponentPanic } from "../../internal/error";
import { DropdownFrame, SelectText, SelectTextAttr } from "../../element/dropdown";
import { IORef } from "../../data/ref";
import { Just, Maybe, Nothing } from "purify-ts";
import { AnimateFrame } from "../../abstract/animate";

const E = new ComponentPanic("FixSelect");

interface MenuAttr<T> {
	itemList: Array<T>;
	renderItem: (item: T) => m.Children;
	connectChange: Maybe<(value: T) => void>;
}

const Menu = <T>(): m.Component<MenuAttr<T>> => ({
	view: ({ attrs }) => {
		const itemOfChildren = attrs.itemList.map(item => {
			const click = () => {
				attrs.connectChange.ifJust(f => f(item));
			};

			return m("div.item", { onclick: click }, attrs.renderItem(item));
		});

		return m(
			AnimateFrame,
			{ el: "div.ui.menu.selection.transition.visible"},
			itemOfChildren
		);
	}
});

export interface FixSelectAttr<T> {
	value?: T;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => m.Children;
	connectChange?: (value: T) => void;
}

/**
 * 固定选项的选择菜单。不提供动态方法。
 */
export const FixSelect = <T>(
	{ attrs }: m.Vnode<FixSelectAttr<T>>
): m.Component<FixSelectAttr<T>> => {
	const { value, itemList: items } = attrs;

	E.panicNil(value, "value不能为空！");
	E.panicEmpty((items ?? []), "items不能为空");

	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const textProp: SelectTextAttr<T> = {
				text: Maybe.fromNullable(attrs.value),
				placeholder: Nothing,
				renderText: attrs.renderText ?? String
			};

			const menu = Just(attrs.itemList)
				.filter(_ => stateRef.ask())
				.map(itemList => {
					const attr: MenuAttr<T> = {
						itemList: itemList ?? [],
						connectChange: Maybe.fromNullable(attrs.connectChange),
						renderItem: attrs.renderItem ?? String
					};
					return m<MenuAttr<T>, {}>(Menu, attr)
				});

			return m(DropdownFrame, { value: stateRef, klass: Nothing }, [
				m("i.icon.dropdown"),
				m<SelectTextAttr<T>, {}>(SelectText, textProp),
				menu.extract()
			]);
		}
	};
};
