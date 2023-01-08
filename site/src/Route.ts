import * as m from "mithril";
import { Container } from "drifloon/container";
import { Column, Grid } from "drifloon/grid";
import { Color, Wide } from "drifloon/data/var";

import Home from "./page/Home";

import ButtonPage from "./page/Button";
import DropdownPage from "./page/Dropdown";
import { Menu, MenuAttr, MenuNaviItem } from "drifloon/menu";

interface RouterPage {
	href: string;
	page: m.Component,
	title: string;
}

const routerMap: Array<RouterPage> = [
	{
		href: "/",
		title: "首页",
		page: Home
	},
	{
		href: "/button",
		title: "按钮",
		page: ButtonPage
	},
	{
		href: "/dropdown",
		title: "下拉菜单",
		page: DropdownPage
	}
];

const sidebarMenuAttr: MenuAttr = {
	vertical: true,
	color: Color.Teal,
	fluid: true
};

const Sidebar: m.Component = {
	view: _ => {
		const items = routerMap
			.map(x => m(MenuNaviItem, { to: x.href }, x.title));
		return m(Menu, sidebarMenuAttr, items);
	}
};

const Layout: m.Component = {
	view: vnode => m(Container, { fluid: true }, [
		m(Grid, [
			m(Column, { wide: Wide.Four }, m(Sidebar)),
			m(Column, { wide: Wide.Twelve }, vnode.children)
		])
	])
};

const mkLayout = <A, S>(c: m.Component<A, S>): m.RouteResolver => ({
	render: () => m(Layout, m(c))
});

const Route: m.RouteDefs = routerMap.reduce(
	(defs, m) => ({
		...defs,
		[m.href]: mkLayout(m.page)
	}),
	{}
);

export default Route;
