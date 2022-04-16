import * as m from "mithril";
import { NaviLinkAttr, NaviLink } from "./Link";

export const Menu: m.Component = {
	view: vnode => m("div.menu", vnode.children)
};

export const MenuLabel: m.Component = {
	view: vnode => m("p.menu-label", vnode.children)
};

export const MenuList: m.Component = {
	view: vnode => m("ul.menu-list", vnode.children)
};

export const MenuItem: m.Component = {
	view: vnode => m("li", vnode.children)
};

export const MenuLink: m.Component<NaviLinkAttr> = ({
	view: ({ attrs, children }) => m(MenuItem, m(NaviLink, attrs, children))
});
