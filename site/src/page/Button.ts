import { Block_, Button, ButtonGroup, Title1_, Title2_ } from "drifloon";
import { Color, Size } from "drifloon/Type";
import * as m from "mithril";
import { Text } from "../widget/Other";

const S1: m.Vnode = m.fragment({}, [
	Title2_("基本信息"),
	Text("一个基本按钮"),
	m(Button, "点击")
]);

const SColor: m.Vnode = m.fragment({}, [
	Title2_("颜色"),
	m(Button, { color: Color.Danger }, "危险"),
	m(Button, { color: Color.Success }, "成功")
]);

const SWeight: m.Vnode = m.fragment({}, [
	Title2_("淡色"),
	m(Button, { color: Color.Danger, light: true}, "淡色危险"),
	m(Button, { color: Color.Success, light: true }, "淡色成功")
]);

const SSize: m.Vnode = m.fragment({}, [
	Title2_("尺寸"),
	m(Button, { size: Size.Large }, "大"),
	m(Button, { size: Size.Small }, "小"),
	m(Button, { fullwidth: true }, "占全屏")
]);

const SStyle: m.Vnode = m.fragment({}, [
	Title2_("样式"),
	m(Button, { color: Color.Info, outline: true }, "外轮廓"),
	m(Button, { color: Color.Info, invert: true }, "反转"),
	m(Button, { color: Color.Info, round: true }, "圆角"),
	m(Button, { color: Color.Info, loading: true }, "载入中……")
]);

const SGroup: m.Vnode = m.fragment({}, [
	Title2_("按钮组"),
	m(ButtonGroup, [
		m(Button, "按钮一"),
		m(Button, { color: Color.Primary }, "按钮二"),
		m(Button, { color: Color.Warning }, "按钮三")
	]),

	m(ButtonGroup, { addons: true }, [
		m(Button, "按钮一"),
		m(Button, { color: Color.Primary }, "按钮二"),
		m(Button, { color: Color.Warning }, "按钮三")
	])
]);

const Main: m.Component = {
	view: () => m.fragment({}, [
		Title1_("按钮"),
		Block_(S1),
		Block_(SColor),
		Block_(SWeight),
		Block_(SSize),
		Block_(SStyle),
		Block_(SGroup)
	])
};

export default Main;
