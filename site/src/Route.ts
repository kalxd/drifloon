import * as m from "mithril";
import { Container } from "drifloon/Container";
import { Column, Grid } from "drifloon/Grid";
import { Wide } from "drifloon/Type";

import Sidebar from "./widget/Sidebar";

import Home from "./page/Home";

import ButtonPage from "./page/Button";

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

const Route: m.RouteDefs = {
	"/": mkLayout(Home),
	"/button": mkLayout(ButtonPage)
};

export default Route;

