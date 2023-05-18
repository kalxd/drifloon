import * as m from "mithril";
import { ModalMask } from "./module/modal";

export const run = (r: m.RouteDefs): void => {
	m.route(document.body, "/", r);
};

export const MainLayout = <T>(): m.Component<T> => ({
	view: ({ children }) => m.fragment({}, [
		children,
		m(ModalMask)
	])
});

export const mount = <T>(c: m.Component<T>): void => {
	const App: m.Component<T> = {
		view: () => m(MainLayout, m(c))
	};
	m.mount(document.body, App);
};
