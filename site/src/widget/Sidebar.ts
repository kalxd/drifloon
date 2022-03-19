import * as m from "mithril";
import { Menu, MenuItem, MenuLabel } from "drifloon/Menu"

const Sidebar: m.Component = ({
	view: _ => m(Menu, [
		m(MenuLabel, "菜单"),
		m(MenuItem, "菜单一")
	])
});

export default Sidebar;
