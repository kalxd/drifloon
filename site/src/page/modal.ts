import * as m from "mithril";
import { Button } from "drifloon/element/button";
import { Header } from "drifloon/element/header";
import { Color, Size } from "drifloon/data/var";
import { alertText, confirm, modal, ResolveConfirmAttr, ResolveModalAttr } from "drifloon/module/modal";
import { Modal, ModalAction, ModalActionAttr } from "drifloon/widget/modal";

const ConfirmS: m.Component = {
	view: () => {
		const attr1: ResolveConfirmAttr = {
			title: "新式标题",
			content: m("div.label.ui.orange", "理论上，这里写上任何文本。")
		};

		const onclick1 = async () => {
			confirm(attr1)
				.caseOf({
					Right: () => alertText("你点了确定！"),
					Left: () => alertText("你点了取消！"),
				});
		};

		return m(Button, { color: Color.Green, connectClick: onclick1 }, "提示")
	}
};

const AlertModalHere: m.Component<ResolveModalAttr<void>> = {
	view: ({ attrs }) => {
		const actionAttr: ModalActionAttr = {
			connectNegative: attrs.connectResolve,
			connectPositive: attrs.connectResolve,
		};

		return m(Modal, attrs, [
			m("div.header", "点击下面几块按钮"),
			m("div.content", [
				m(Button, { connectClick: () => console.log("你看见我了") }, "alert"),
				m(Button, { connectClick: () => console.info("你看见我了") }, "confirm")
			]),
			m(ModalAction, actionAttr)
		]);
	}
};

const ModalS: m.Component = {
	view: () => {
		const openModal = () => modal(AlertModalHere, {});
		return m("div", [
			m(Button, { connectClick: openModal }, "打开对话框")
		]);
	}
};

const Main: m.Component = {
	view: _ => m("div.ui.teal.segment", [
		m(Header, { isDivid: true, size: Size.Huge }, "对话框"),
		m(Header, { size: Size.Large }, "提示"),
		m(ConfirmS),
		m(Header, { size: Size.Large }, "混合使用"),
		m(ModalS)
	])
};

export default Main;
