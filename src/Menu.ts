import * as m from "mithril";
import { genWrapWidget } from "./prelude/Wrap";
import { NaviLinkAttr, NaviLink } from "./Link";

export const Menu = genWrapWidget("div.menu");
export const MenuLabel = genWrapWidget("p.menu-label");
export const MenuList = genWrapWidget("ul.menu-list");
export const MenuItem = genWrapWidget("li");

export const MenuLink: m.Component<NaviLinkAttr> = ({
	view: ({ attrs, children }) => m(MenuItem, m(NaviLink, attrs, children))
});
