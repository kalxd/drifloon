import { Button, Header, Header2_ } from "drifloon";
import { EmLevel, Size, StateLevel } from "drifloon/Type";
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
			m(Header, { divid: true, size: Size.Huge }, "按钮"),
			Header2_("普通状态"),
			S1,
			Header2_("主次"),
			EmS,
			Header2_("正负"),
			StateS
		]);
	}
};

export default Main;
