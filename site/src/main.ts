import * as m from "mithril";
import {
	Column,
	ColumnAttr,
	Columns,
	ColumSize,
	Menu,
	MenuItem,
	MenuLabel,
    MenuList
} from "drifloon";

const app: m.Component = {
	view: () => {
		return m(Columns, [
			m(Column, { size: ColumSize.Three }, [
				m(Menu, [
					m(MenuLabel, "菜单"),
					m(MenuList, [
						m(MenuItem, "item 1"),
						m(MenuItem, "item 2")
					])
				])
			]),
			m(Column, { isNarrow: false } as ColumnAttr),
		])
	}
};

const mountNode = document.getElementById("app");
if (mountNode !== null) {
	m.mount(mountNode, app);
}
