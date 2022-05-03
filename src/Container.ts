import * as m from "mithril";
import { Size } from "./Type";
import { fmapIsKlass, pickKlass } from "./prelude/Attr";
import { genWrapWidget } from "./prelude/Wrap";

export const Block = genWrapWidget("div.block");
export const Box = genWrapWidget("div.box");

export enum ContainerSize {
	Widescreen = "wildscreen",
	Fullhd = "fullhd",
	MaxDesktop = "max-desktop",
	MaxWildscreen = "max-wildscree"
}

export interface ContainerAttr {
	size?: ContainerSize
}

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.size)
		]);

		return m("div.container", { class: klass }, children);
	}
});

export interface ContentAttr {
	size?: Size
}

export const Content: m.Component<ContentAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.size)
		]);

		return m("div.content", { class: klass }, children)
	}
});
