import * as m from "mithril";
import { ComponentPanic } from "../../data/internal/error";
import {
	DropdownFrame,
	DropdownMenuFrame,
	DropdownMenuFrameAttr,
	SelectText,
	SelectTextAttr
} from "../../element/dropdown";
import { IORef } from "../../data/ref";
import { Just, Maybe, Nothing } from "purify-ts";

const E = new ComponentPanic("FixSelect");

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

	const mchange = Maybe.fromNullable(attrs.connectChange);

	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const textProp: SelectTextAttr<T> = {
				text: attrs.value,
				renderText: attrs.renderText
			};

			const menuAttr: DropdownMenuFrameAttr<T> = {
				value: stateRef,
				itemList: attrs.itemList ?? [],
				renderItem: attrs.renderItem ?? String,
				el: "div.ui.menu.selection.transition.visible",
				connectClick: item => {
					stateRef.put(false);
					Just(item).ap(mchange);
				}
			};

			return m(DropdownFrame, { value: stateRef, klass: Nothing }, [
				m("i.icon.dropdown"),
				m<SelectTextAttr<T>, {}>(SelectText, textProp),
				m<DropdownMenuFrameAttr<T>, {}>(DropdownMenuFrame, menuAttr)
			]);
		}
	};
};
