import * as m from "mithril";
import { identity, Maybe } from "purify-ts";

export interface CheckboxAttr {
	value?: boolean;
	connectChange?: (result: boolean) => void;
}

export const Checkbox: m.Component<CheckboxAttr> = {
	view: ({ attrs, children }) => {
		const mvalue = Maybe.fromNullable(attrs.value);
		const monChange = Maybe.fromNullable(attrs.connectChange);

		const klass = mvalue
			.filter(identity)
			.map(_ => "checked")
			.extract();

		const clickE = () => {
			mvalue.map(b => !b)
				.ap(monChange);
		};

		const inputAttr = {
			checked: mvalue.orDefault(false)
		};

		return m("div.ui.checkbox", { class: klass, onclick: clickE }, [
			m("input.hidden[type=checkbox]", inputAttr),
			m("label", children)
		]);
	}
};
