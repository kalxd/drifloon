import * as m from "mithril";
import { ComponentPanic } from "../../data";
import { bindValue, BindValue } from "../../data/internal/value";
import { Select, SelectAttr } from "./Select";

const E = new ComponentPanic("FixSelect");

export interface FixSelectAttr<T> extends BindValue<T> {
	placeholder?: string;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => string;
}

export const FixSelect = <T>(): m.Component<FixSelectAttr<T>> => ({
	view: ({ attrs }) => {
		const mbindvalue = bindValue(attrs);

		E.panicWhen(mbindvalue.value.isNothing(), "value不能为空！");
		E.panicEmpty(attrs.itemList ?? [], "itemList不能为空！");

		const menuAttr: SelectAttr<T> = {
			value: mbindvalue.value,
			placeholder: attrs.placeholder,
			itemList: attrs.itemList,
			renderItem: attrs.renderItem,
			renderText: attrs.renderText,
			isShowRemoveIcon: false,
			connectChange: item =>
				item.ifJust(mbindvalue.connectChange)
		};

		return m<SelectAttr<T>, {}>(Select, menuAttr);
	}
});
