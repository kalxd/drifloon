import { Header } from "drifloon";
import { Size } from "drifloon/Type";
import * as m from "mithril";

const Main: m.Component = {
	view: () => {
		return m("div.ui.purple.segment", [
			m(Header, { divid: true, size: Size.Huge }, "下拉菜单")
		])
	}
};

export default Main;
