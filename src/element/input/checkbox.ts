import * as m from "mithril";
import { BindValue, bindValue } from "../../data/internal/value";
import { pickKlass, selectKlass } from "../../data/internal/attr";

export interface CheckboxAttr extends BindValue<boolean> {}

export const Checkbox: m.Component<CheckboxAttr> = {
	view: ({ attrs, children }) => {
		const mbindvalue = bindValue(attrs);

		const klass = pickKlass([
			selectKlass("checked", mbindvalue.value.extract())
		]);

		const inputAttr: m.Attributes = {
			value: mbindvalue.value.extract(),
			checked: mbindvalue.value.orDefault(false)
		};

		const clickE = () => {
			const v = mbindvalue.value.orDefault(false);
			mbindvalue.connectChange(!v);
		};

		return m("div.ui.checkbox", { class: klass, onclick: clickE }, [
			m("input.hidden[type=checkbox]", inputAttr),
			m("label", children)
		]);
	}
};
