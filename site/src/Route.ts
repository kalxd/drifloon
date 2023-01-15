import * as m from "mithril";
import { Container } from "drifloon/container";
import { Column, Grid } from "drifloon/grid";
import { Align, Color, Size, Wide } from "drifloon/data/var";
import { ModalMask } from "drifloon/modal";

import Home from "./page/home";

import ButtonPage from "./page/button";
import DropdownPage from "./page/dropdown";
import ModalPage from "./page/modal";
import ProgressPage from "./page/progress";
import FormPage from "./page/form";
import { Menu, MenuAttr, MenuNaviItem } from "drifloon/menu";
import { Header } from "drifloon/header";

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
	},
	{
		href: "/modal",
		title: "对话框",
		page: ModalPage
	},
	{
		href: "/progress",
		title: "进度条",
		page: ProgressPage
	},
	{
		href: "/form",
		title: "表单",
		page: FormPage
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
	view: vnode => m(Container, [
		m(
			Header,
			{ color: Color.Teal, align: Align.Center, size: Size.Huge },
			"drifloon"
		),
		m(Grid, [
			m(Column, { wide: Wide.Four }, m(Sidebar)),
			m(Column, { wide: Wide.Twelve }, vnode.children)
		])
	])
};

const mkLayout = <A, S>(c: m.Component<A, S>): m.RouteResolver => ({
	render: () => m.fragment({}, [
		m(Layout, m(c)),
		m(ModalMask)
	])
});

const Route: m.RouteDefs = routerMap.reduce(
	(defs, m) => ({
		...defs,
		[m.href]: mkLayout(m.page)
	}),
	{}
);

export default Route;
