import * as m from "mithril";
import { pickKlass, selectKlass } from "../../data/internal/attr";
import { BindValue, bindValue } from "../../data/internal/value";

export interface ToggleAttr extends BindValue<boolean> {}

export const Toggle: m.Component<ToggleAttr> = {
	view: ({ attrs, children }) => {
		const mbindvalue = bindValue(attrs);

		const isCheck = mbindvalue.value.orDefault(false);

		const attr: m.Attributes = {
			class: pickKlass([
				selectKlass("checked", mbindvalue.value.extract())
			]),
			onclick: () => mbindvalue.connectChange(!isCheck)
		};

		return m("div.ui.toggle.checkbox", attr, [
			m("input.hidden", { type: "checkbox", checked: isCheck }),
			m("label", children)
		]);
	}
};
