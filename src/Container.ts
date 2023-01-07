import * as m from "mithril";
import { Align } from "./Type";
import { pickKlass, selectKlass } from "./prelude/Fn";
import { toPlainVnode } from "./prelude/Wrap";
import { GridAttr, pickGridKlass } from "./Grid";
import { Maybe } from "purify-ts";

export interface ContainerAttr {
	align?: Align;
	text?: boolean;
	fluid?: boolean;
}

const pickContainerKlass = (attr: ContainerAttr): Array<Maybe<string>> => [
	Maybe.fromNullable(attr.align),
	selectKlass("fluid", attr.fluid),
	selectKlass("text", attr.text)
];

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickContainerKlass(attrs));

		return m("div.ui.container", { class: klass }, children);
	}
});

export const Container_ = toPlainVnode(Container);

export interface GridContainerAttr extends ContainerAttr, GridAttr {}

export const GridContainer: m.Component<GridContainerAttr> = {
	view: ({ attrs, children }) => {
		const containerKlass = pickContainerKlass(attrs);
		const gridKlass = pickGridKlass(attrs);

		const klass = pickKlass(containerKlass.concat(gridKlass));

		return m("div.ui.grid.container", { class: klass }, children);
	}
};
