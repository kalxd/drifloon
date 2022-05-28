import * as m from "mithril";
import { fmapKlass, pickKlass, selectKlass } from "prelude/Fn";
import { AttachPosition, showAttachPosition, showWide, Wide } from "./Type";

export interface MenuAttr {
	text?: boolean;
	wide?: Wide;
	attach?: AttachPosition;
	point?: boolean;
}

export const Menu: m.Component<MenuAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlass("text", attrs.text),
			fmapKlass(showWide, attrs.wide),
			fmapKlass(showAttachPosition, attrs.wide),
			selectKlass("pointing", attrs.point)
		]);

		return m("div.ui.menu", { class: klass }, children);
	}
};
