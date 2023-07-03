import * as m from "mithril";
import { identity } from "purify-ts";

export interface ToggleAttr {
	value?: boolean;
	connectChange?: (value: boolean) => void;
}

export const Toggle: m.Component<ToggleAttr> = {
	view: ({ attrs, children }) => {
		const value = attrs.value ?? false;

		const isCheck = value ? "checked" : "";

		const onclick = () => {
			const f = attrs.connectChange ?? identity;
			f(!value);
		};

		const attr = {
			class: isCheck,
			onclick
		};

		return m("div.ui.toggle.checkbox", attr, [
			m("input.hidden", { type: "checkbox", checked: isCheck }),
			m("label", children)
		]);
	}
};
