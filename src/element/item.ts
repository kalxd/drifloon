import * as m from "mithril";
import { Maybe } from "purify-ts";
import { pickKlass, selectKlass } from "../data/internal/attr";
import { Color } from "../data/var";

export interface ItemAttr {
	color?: Color;
	isActive?: boolean;
	connectClick?: () => void;
}

export const Item: m.Component<ItemAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.color),
			selectKlass("active", attrs.isActive)
		]);

		const mclickE = Maybe.fromNullable(attrs.connectClick);

		const attr: m.Attributes = {
			class: klass,
			onclick: () => mclickE.ifJust(f => f())
		};

		return m("div.item", attr, children);
	}
};
