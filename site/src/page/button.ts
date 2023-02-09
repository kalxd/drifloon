import { BasicButton, Button, IconButton, LoadingButton } from "drifloon/button";
import { Header } from "drifloon/header";
import { Segment } from "drifloon/segment";
import { Color, EmLevel, Size, StateLevel } from "drifloon/data/var";
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

const BasicS = m("div", [
	m(BasicButton, "基本按钮"),
	m(BasicButton, { color: Color.Red }, "红按钮")
]);

const LoadingS = m("div", [
	m(LoadingButton, "_"),
	m(LoadingButton, { color: Color.Black }, "_")
]);

const IconS = m("div", [
	m(IconButton, m("i.icon.user")),
	m(IconButton, { color: Color.Teal }, m("i.icon.plus"))
]);

const Main: m.Component = {
	view: () => {
		return m(Segment, { color: Color.Teal }, [
			m(Header, { isDivid: true, size: Size.Huge }, "按钮"),
			m(Header, { size: Size.Large }, "普通状态"),
			S1,
			m(Header, { size: Size.Large }, "主次"),
			EmS,
			m(Header, { size: Size.Large }, "正负"),
			StateS,
			m(Header, { size: Size.Large }, "正负"),
			BasicS,

			m(Header, { size: Size.Large }, "加载中……"),
			LoadingS,

			m(Header, { size: Size.Large }, "图标"),
			IconS
		]);
	}
};

export default Main;
