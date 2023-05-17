import * as m from "mithril";
import { ComponentPanic } from "../../internal/error";
import { DropdownFrame } from "../../internal/element/dropdown";
import { IORef } from "../../data/ref";
import { Nothing } from "purify-ts";

const E = new ComponentPanic("FixSelect");

export interface FixSelectAttr<T> {
	value?: T;
	items?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => m.Children;
	connectChange?: (value: T) => void;
}

/**
 * 固定选项的选择菜单。不提供动态方法。
 */
export const FixSelect = <T>(
	{ attrs }: m.Vnode<FixSelectAttr<T>>
): m.Component => {
	const { value, items } = attrs;

	E.panicNil(value, "value不能为空！");
	E.panicEmpty((items ?? []), "items不能为空");

	const stateRef = new IORef<boolean>(false);

	return {
		view: () => {
			return m(DropdownFrame, { value: stateRef, class: Nothing }, [])
		}
	};
};
