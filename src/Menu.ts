import * as m from "mithril";
import { Maybe } from "purify-ts";

import { genWrapWidget, toPlainVnode } from "./prelude/Wrap";
import { fmapKlass, pickKlass, selectKlass } from "./prelude/Fn";
import { AttachPosition, Color, Wide } from "./Type";

const wideColumn = (wide: Wide): string => `${wide} item`;

export enum MenuShape {
	Point = "pointing",
	Tab = "tabular",
	Text = "text"
}

export enum MenuFixPosition {
	Top = "top fixed",
	Bottom = "bottom fixed",
	Left = "left fixed",
	Right = "right fixed"
}

export interface MenuAttr {
	text?: boolean;
	wide?: Wide;
	attach?: AttachPosition;
	shape?: MenuShape;
	secondary?: boolean;
	vertical?: boolean;
	invert?: boolean;
	right?: boolean;
	fixAt?: MenuFixPosition;
	color?: Color;
	fluid?: boolean;
	borderless?: boolean;
}

export const Menu: m.Component<MenuAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlass("text", attrs.text),
			fmapKlass(wideColumn, attrs.wide),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.shape),
			selectKlass("secondary", attrs.secondary),
			selectKlass("vertical", attrs.vertical),
			selectKlass("inverted", attrs.invert),
			selectKlass("right", attrs.right),
			Maybe.fromNullable(attrs.fixAt),
			Maybe.fromNullable(attrs.color),
			selectKlass("fluid", attrs.fluid),
			selectKlass("borderless", attrs.borderless)
		]);

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

export const MenuNaviItem: m.Component<MenuNaviItemAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickMenuItemAttr(attrs));

		const prop = {
			class: klass,
			selector: "a.item",
			params: attrs.param,
			href: attrs.to
		};

		return m(m.route.Link, prop, children);
	}
};

export const MenuHeaderItem = genWrapWidget("div.header.item");
export const MenuHeaderItem_ = toPlainVnode(MenuHeaderItem);
