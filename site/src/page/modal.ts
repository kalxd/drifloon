import * as m from "mithril";
import { Button } from "drifloon/button";
import { Header } from "drifloon/header";
import { Size } from "drifloon/data/var";
import { alertMsg } from "drifloon/modal";

const S: m.Component = {
	view: () => {
		const f = async () => {
			await Promise.all([
				alertMsg("sb"),
				alertMsg("xxxx"),
				alertMsg("sssss")
			]);
		};

		return m("div", [
			m("p", "点击显示对话框"),
			m(Button, { onclick: f }, "打开sss")
		]);
	}
};

const Main: m.Component = {
	view: _ => m("div.ui.teal.segment", [
		m(Header, { divid: true, size: Size.Huge }, "对话框"),
		m(S)
	])
};

export default Main;
