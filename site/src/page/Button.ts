import { Button, ButtonAttr, Title1, Title2 } from "drifloon";
import { Color } from "drifloon/Type";
import * as m from "mithril";
import { Text } from "../widget/Other";

const S1: m.Vnode = m.fragment({}, [
	Title2("基本信息"),
	Text("一个基本按钮"),
	m(Button, "点击")
]);

const SColor: m.Vnode = m.fragment({}, [
	Title2("颜色"),
	m(Button, { color: Color.Danger }, "危险"),
	m(Button, { color: Color.Success }, "成功")
]);

const Main: m.Component = {
	view: () => m.fragment({}, [
		Title1("按钮"),
		S1,
		SColor
	])
};

export default Main;
