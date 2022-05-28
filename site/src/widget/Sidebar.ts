import { Menu, MenuItem, MenuNaviItem } from "drifloon";
import { Color } from "drifloon/Type";
import * as m from "mithril";

const Sidebar: m.Component = ({
	view: _ => m(Menu, { vertical: true, color: Color.Teal }, [
		m(MenuNaviItem, { to: "/" }, "首页"),
		m(MenuNaviItem, { to: "/button" }, "按钮"),
		m(MenuItem, "hello world")
	])
});

export default Sidebar;
