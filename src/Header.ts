import * as m from "mithril";
import { genPlainVnode } from "./prelude/Wrap";
import { fmapKlass, pickKlass, selectKlass } from "./prelude/Fn";
import { Align, AttachPosition, Color, Float, showAlign, showAttachPosition, showColor, showFloat, showSize, Size } from "./Type";

export interface HeaderAttr {
	size?: Size;
	attach?: AttachPosition;
	float?: Float;
	align?: Align;
	color?: Color;
	invert?: boolean;
}

export const Header: m.Component<HeaderAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(showSize, attrs.size),
			fmapKlass(showAttachPosition, attrs.attach),
			fmapKlass(showFloat, attrs.float),
			fmapKlass(showAlign, attrs.align),
			fmapKlass(showColor, attrs.color),
			selectKlass("inverted", attrs.invert)
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
