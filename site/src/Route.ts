import * as m from "mithril";
// import Sidebar from "./widget/Sidebar";

import Home from "./page/Home";
import { Container } from "drifloon/Container";
// import Main from "./page/Button";

const Layout: m.Component = {
	view: vnode => m(Container, { fluid: true }, vnode.children)
};

const mkLayout = <A, S>(c: m.Component<A, S>): m.RouteResolver => ({
	render: () => m(Layout, m(c))
});

const Route: m.RouteDefs = {
	"/": mkLayout(Home),
	// "/element/button": mkLayout(Main)
};

export default Route;
