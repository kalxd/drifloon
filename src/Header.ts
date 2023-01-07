import * as m from "mithril";
import { genPlainVnode } from "./prelude/Wrap";
import { pickKlass, selectKlass } from "./prelude/Fn";
import { Align, AttachPosition, Color, Float, Size } from "./Type";
import { Maybe } from "purify-ts";

export interface HeaderAttr {
	size?: Size;
	attach?: AttachPosition;
	float?: Float;
	align?: Align;
	color?: Color;
	invert?: boolean;
	divid?: boolean;
}

export const Header: m.Component<HeaderAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.float),
			Maybe.fromNullable(attrs.align),
			Maybe.fromNullable(attrs.color),
			selectKlass("inverted", attrs.invert),
			selectKlass("dividing", attrs.divid)
		]);

		return m("div.ui.header", { class: klass }, children);
	}
};

export const Header1_ = genPlainVnode("h1.ui.header");
export const Header2_ = genPlainVnode("h2.ui.header");
export const Header3_ = genPlainVnode("h3.ui.header");
export const Header4_ = genPlainVnode("h4.ui.header");
export const Header5_ = genPlainVnode("h5.ui.header");

export const SubHeader_ = genPlainVnode("div.ui.sub.header");
