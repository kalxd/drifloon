import * as m from "mithril";

export const Menu: m.Component = {
	view: vnode => m("div.menu", vnode.children)
};

export const MenuLabel: m.Component = {
	view: vnode => m("div.menu-label", vnode.children)
};

export const MenuList: m.Component = {
	view: vnode => m("ul.menu-list", vnode.children)
};

export const MenuItem: m.Component = {
	view: vnode => m("li", vnode.children)
};
