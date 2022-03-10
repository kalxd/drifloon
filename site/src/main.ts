import * as m from "mithril";
import { Column, ColumnAttr, Columns, ColumSize } from "drifloon";

const app: m.Component = {
	view: () => {
		return m(Columns, [
			m(Column, { size: ColumSize.One }),
			m(Column, { isNarrow: false } as ColumnAttr),
		])
	}
};

const mountNode = document.getElementById("app");
if (mountNode !== null) {
	m.mount(mountNode, app);
}
