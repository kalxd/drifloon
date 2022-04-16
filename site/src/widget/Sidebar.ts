import * as m from "mithril";
import { Menu, MenuLabel, MenuLink, MenuList } from "drifloon/Menu"

const Sidebar: m.Component = ({
	view: _ => m(Menu, [
		m(MenuLabel, "菜单"),
		m(MenuList, [
			m(MenuLink, { to: "/" }, "菜单一"),
			m(MenuLink, { to: "/home" }, "菜单二")
		])
	])
});

export default Sidebar;
