import * as m from "mithril";
import { pickKlass, prependIs, selectKlassWhen } from "./prelude/attr";
import { genWrapWidget } from "./prelude/widget";

export const Block = genWrapWidget("div.block");
export const Box = genWrapWidget("div.box");

export interface ContainerAttr {
	isWidescreen?: boolean;
	isFullhd?: boolean;
	isMaxDesktop?: boolean;
	isMaxWildscreen?: boolean;
}

export const Container: m.Component<ContainerAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlassWhen(attrs.isMaxWildscreen, prependIs("wildscreen")),
			selectKlassWhen(attrs.isFullhd, prependIs("fullhd")),
			selectKlassWhen(attrs.isMaxDesktop, prependIs("max-desktop")),
			selectKlassWhen(attrs.isMaxWildscreen, prependIs("max-wildscreen"))
		]);

		return m("div.container", { class: klass }, children);
	}
});
