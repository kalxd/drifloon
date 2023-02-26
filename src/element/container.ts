import * as m from "mithril";
import { Align } from "../data/var";
import { pickKlass, selectKlass } from "../internal/attr";
import { GridAttr, pickGridKlass } from "./grid";
import { Maybe } from "purify-ts";

export interface ContainerAttr {
	align?: Align;
	isText?: boolean;
	isFluid?: boolean;
}

const pickContainerKlass = (attr: ContainerAttr): Array<Maybe<string>> => [
	Maybe.fromNullable(attr.align),
	selectKlass("fluid", attr.isFluid),
	selectKlass("text", attr.isText)
];

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickContainerKlass(attrs));

		return m("div.ui.container", { class: klass }, children);
	}
});

export interface GridContainerAttr extends ContainerAttr, GridAttr {}

export const GridContainer: m.Component<GridContainerAttr> = {
	view: ({ attrs, children }) => {
		const containerKlass = pickContainerKlass(attrs);
		const gridKlass = pickGridKlass(attrs);

		const klass = pickKlass(containerKlass.concat(gridKlass));

		return m("div.ui.grid.container", { class: klass }, children);
	}
};
