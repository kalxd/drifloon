import { Button } from "drifloon/button";
import { Header } from "drifloon/header";
import { EmLevel, Size, StateLevel } from "drifloon/data/var";
import * as m from "mithril";

const S1 = m("div", [
	m(Button, "Button 1")
]);

const EmS = m("div", [
	m(Button, { em: EmLevel.Primary }, "primary"),
	m(Button, { em: EmLevel.Secondary }, "seconary")
]);

const StateS = m("div", [
	m(Button, { level: StateLevel.Positive }, "正"),
	m(Button, { level: StateLevel.Negative }, "负")
]);

const Main: m.Component = {
	view: () => {
		return m("div.ui.teal.segment", [
			m(Header, { isDivid: true, size: Size.Huge }, "按钮"),
			m(Header, { size: Size.Large }, "普通状态"),
			S1,
			m(Header, { size: Size.Large }, "主次"),
			EmS,
			m(Header, { size: Size.Large }, "正负"),
			StateS
		]);
	}
};

export default Main;
