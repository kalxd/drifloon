import { Color, Size } from "drifloon/data/var";
import { Header } from "drifloon/element/header";
import { Progress, ProgressIndeterminate } from "drifloon/element/progress";
import * as m from "mithril";

const NS = m("div", [
	m(Progress, { value: 10 }),
	m(Progress, { value: 20, color: Color.Green, text: "下载中……" }),
	m(Progress, { value: 100, color: Color.Black, indeterminate: ProgressIndeterminate.swing })
]);

const Main: m.Component = {
	view: () => m("div.ui.segment", [
		m(Header, { isDivid: true, size: Size.Huge }, "进度条"),
		m(Header, { size: Size.Large }, "普通的样子"),
		NS
	])
};

export default Main;
