import * as m from "mithril";
import { Align, showAlign } from "./Type";
import { fmapKlass, pickKlass, selectKlassWhen } from "./prelude/Attr";
import { toPlainVnode } from "./prelude/Wrap";

export interface ContainerAttr {
	align?: Align;
	text?: boolean;
	fluid?: boolean;
}

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(showAlign, attrs.align),
			selectKlassWhen(attrs.fluid, "fluid"),
			selectKlassWhen(attrs.text, "text")
		]);
		return m("div.ui.container", { class: klass }, children);
	}
});

export const Container_ = toPlainVnode(Container);
