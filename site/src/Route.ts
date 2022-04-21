import * as m from "mithril";
import { Columns, Column, ColumSize } from "drifloon/Columns";
import Sidebar from "./widget/Sidebar";

import Home from "./page/Home";
import { Box, Container } from "drifloon/Container";

const Layout: m.Component = {
	view: vnode => m(Box, [
		m(Columns, [
			m(Column, { size: ColumSize.Three }, m(Sidebar)),
			m(Column, vnode.children)
		])
	])
};

const mkLayout = <A, S>(c: m.Component<A, S>): m.RouteResolver => ({
	render: () => m(Layout, [
		m(Container, [
			m(c)
		])
	])
});

const Route: m.RouteDefs = {
	"/": mkLayout(Home)
};

export default Route;
