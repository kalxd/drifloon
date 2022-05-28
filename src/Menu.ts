import * as m from "mithril";
import { fmapKlass, pickKlass, selectKlassWhen } from "prelude/Attr";
import { AttachPosition, showWide, Wide } from "./Type";

export interface MenuAttr {
	text?: boolean;
	wide?: Wide;
	attach?: AttachPosition;
}

export const Menu: m.Component<MenuAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlassWhen(attrs.text, "text"),
			fmapKlass(showWide, attrs.wide),
		]);

		return m("div.ui.menu", { class: klass }, children);
	}
};
