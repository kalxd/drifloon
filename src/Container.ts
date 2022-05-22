import * as m from "mithril";
import { Align } from "./Type";
import { pickKlass, selectKlassWhen } from "./prelude/Attr";
import { toPlainVnode } from "./prelude/Wrap";
import { Maybe } from "purify-ts";

export interface ContainerAttr {
	align?: Align;
	text?: boolean;
	fluid?: boolean;
}

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.align),
			selectKlassWhen(attrs.fluid, "fuild"),
			selectKlassWhen(attrs.text, "text")
		]);

		return m("div.container", { class: klass }, children);
	}
});

export const Container_ = toPlainVnode(Container);
