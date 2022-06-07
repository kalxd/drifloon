import * as m from "mithril";
import { fmapKlass, pickKlass } from "./prelude/Fn";
import { Color, EmLevel, showColor, showEmLevel, showSize, showStateLevel, Size, StateLevel } from "./Type";

interface ButtonAttr {
	size?: Size;
	color?: Color;
	level?: StateLevel;
	em?: EmLevel;
	onClick?: (event: MouseEvent) => void;
}

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(showSize, attrs.size),
			fmapKlass(showColor, attrs.color),
			fmapKlass(showStateLevel, attrs.level),
			fmapKlass(showEmLevel, attrs.em)
		]);

		const prop = {
			class: klass,
			onclick: attrs.onClick
		};

		return m("button.ui.button", prop, children);
	}
};
