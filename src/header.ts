import * as m from "mithril";
import { pickKlass, selectKlass } from "./internal/attr";
import { Align, AttachPosition, Color, Float, Size } from "./data/var";
import { Maybe } from "purify-ts";

export interface HeaderAttr {
	size?: Size;
	attach?: AttachPosition;
	float?: Float;
	align?: Align;
	color?: Color;
	isInvert?: boolean;
	isDivid?: boolean;
}

export const Header: m.Component<HeaderAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.float),
			Maybe.fromNullable(attrs.align),
			Maybe.fromNullable(attrs.color),
			selectKlass("inverted", attrs.isInvert),
			selectKlass("dividing", attrs.isDivid)
		]);

		return m("div.ui.header", { class: klass }, children);
	}
};
