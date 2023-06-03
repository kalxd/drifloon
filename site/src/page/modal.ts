import * as m from "mithril";
import { Button } from "drifloon/element/button";
import { Header } from "drifloon/element/header";
import { Size } from "drifloon/data/var";
import { modal, ResolveModalAttr } from "drifloon/module/modal";
import { Modal, ModalAction, ModalActionAttr } from "drifloon/widget/modal";

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
		m(Header, { size: Size.Large }, "混合使用"),
		m(ModalS)
	])
};

export default Main;
