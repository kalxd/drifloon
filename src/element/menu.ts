import * as m from "mithril";
import { Maybe } from "purify-ts";

import { pickKlass, selectKlass } from "../data/internal/attr";
import { Color } from "../data/var";
import { isMatchUrl, pathIntoSegments } from "../data/internal/route";
import { MenuAttr, pickMenuAttrClass } from "./internal/menu";

export * from "./internal/menu";

export const Menu: m.Component<MenuAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickMenuAttrClass(attrs);
		return m("div.ui.menu", { class: klass }, children);
	}
};

export interface MenuItemAttr {
	color?: Color;
}

const pickMenuItemAttr = <A extends MenuItemAttr>(attr: A): Array<Maybe<string>> => [
	Maybe.fromNullable(attr.color)
];

export const MenuItem: m.Component<MenuItemAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickMenuItemAttr(attrs));

		return m("div.item", { class: klass }, children);
	}
};

export interface MenuLinkItemAttr extends MenuItemAttr {
	to: string;
}

export const MenuLinkItem: m.Component<MenuLinkItemAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickMenuItemAttr(attrs));

		return m("a.item", { class: klass, href: attrs.to }, children);
	}
};

export interface MenuNaviItemAttr extends MenuItemAttr {
	to: string;
	param?: Record<string, string>;
}

export const MenuNaviItem = (init: m.Vnode<MenuNaviItemAttr>): m.Component<MenuNaviItemAttr> => {
	const pathSegments = pathIntoSegments(init.attrs.to);
	return {
		view: ({ attrs, children }) => {
			const p = m.parsePathname(m.route.get());
			const klass = pickKlass([
				...pickMenuItemAttr(attrs),
				selectKlass("active", isMatchUrl(pathSegments, p.path))
			]);

			const prop = {
				class: klass,
				selector: "a.item",
				params: attrs.param,
				href: attrs.to
			};

			return m(m.route.Link, prop, children);
		}
	};
};
