import * as m from "mithril";
import { Maybe } from "purify-ts";

import { fmapKlass, pickKlass, selectKlass } from "../internal/attr";
import { AttachPosition, Color, Wide } from "../data/var";
import { isMatchUrl, pathIntoSegments } from "../internal/route";

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

export enum MenuStyle {
	Secondary = "secondary",
	Pointing = "pointing",
	SecondaryPointing = "secondary pointing",
	Tabular = "tabular",
	Text = "text"
}

export interface MenuAttr {
	style?: MenuStyle;
	wide?: Wide;
	attach?: AttachPosition;
	shape?: MenuShape;
	isVertical?: boolean;
	invert?: boolean;
	isRight?: boolean;
	fixAt?: MenuFixPosition;
	color?: Color;
	isFluid?: boolean;
	isBorderless?: boolean;
}

export const Menu: m.Component<MenuAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.style),
			fmapKlass(wideColumn, attrs.wide),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.shape),
			selectKlass("vertical", attrs.isVertical),
			selectKlass("inverted", attrs.invert),
			selectKlass("right", attrs.isRight),
			Maybe.fromNullable(attrs.fixAt),
			Maybe.fromNullable(attrs.color),
			selectKlass("fluid", attrs.isFluid),
			selectKlass("borderless", attrs.isBorderless)
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
