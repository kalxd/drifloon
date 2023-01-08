import * as m from "mithril";
import { Maybe } from "purify-ts";
import { pickKlass } from "./internal/attr";
import { Color, EmLevel, Size, StateLevel } from "./data/var";

export interface ButtonAttr {
	size?: Size;
	color?: Color;
	level?: StateLevel;
	em?: EmLevel;
	onclick?: (event: MouseEvent) => void;
}

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.level),
			Maybe.fromNullable(attrs.em)
		]);

		const prop = {
			class: klass,
			onclick: attrs.onclick
		};

		return m("button.ui.button", prop, children);
	}
};
