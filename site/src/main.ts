import * as m from "mithril";
import { Column, ColumSize } from "drifloon";

const app: m.Component = {
	view: () => {
		return m("main", [
			m(Column, { size: ColumSize.One }),
		])
	}
};

const mountNode = document.getElementById("app");
if (mountNode !== null) {
	m.mount(mountNode, app);
}
