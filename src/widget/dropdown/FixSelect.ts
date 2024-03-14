import * as m from "mithril";
import { Just, Maybe } from "purify-ts";
import { ComponentPanic } from "../../data";
import { Select, SelectAttr } from "./Select";

const E = new ComponentPanic("FixSelect");

export interface FixSelectAttr<T> {
	value?: T;
	placeholder?: string;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => string;
	connectChange?: (item: T) => void;
}

export const FixSelect = <T>(): m.Component<FixSelectAttr<T>> => ({
	view: ({ attrs }) => {
		const value = E.panicNil(attrs.value, "value不能为空！");
		E.panicEmpty(attrs.itemList ?? [], "itemList不能为空！");

		const mchangeE = Maybe.fromNullable(attrs.connectChange);

		const menuAttr: SelectAttr<T> = {
			value: Just(value),
			placeholder: attrs.placeholder,
			itemList: attrs.itemList,
			renderItem: attrs.renderItem,
			renderText: attrs.renderText,
			isShowRemoveIcon: false,
			connectChange: item =>
				item.ap(mchangeE)
		};

		return m<SelectAttr<T>, {}>(Select, menuAttr);
	}
});
