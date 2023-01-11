import * as m from "mithril";
import { Button } from "drifloon/button";
import { Header } from "drifloon/header";
import { Size } from "drifloon/data/var";
import { alertMsg, confirmMsg, modal, ModalActionW, ModalActionWAttr, ModalW, ModalWAttr } from "drifloon/modal";

const S: m.Component = {
	view: () => {
		const f = async () => {
			await Promise.all([
				alertMsg("sb"),
				confirmMsg("回答我！"),
				alertMsg("xxxx"),
				alertMsg("sssss")
			]);
		};

		return m("div", [
			m("p", "点击显示对话框"),
			m(Button, { onclick: f }, "打开")
		]);
	}
};

const AlertModalHere: m.Component<ModalWAttr<void>> = {
	view: ({ attrs }) => {
		const actionAttr: ModalActionWAttr = {
			onpositive: () => attrs.onresolve(),
			isAlert: true
		};

		return m(ModalW, attrs, [
			m("div.header", "点击下面几块按钮"),
			m("div.content", [
				m(Button, { onclick: () => alertMsg("你看见我了") }, "alert"),
				m(Button, { onclick: () => confirmMsg("你看见我了") }, "confirm")
			]),
			m(ModalActionW, actionAttr)
		]);
	}
};

const SModal: m.Component = {
	view: () => {
		const openModal = () => modal(AlertModalHere, {});
		return m("div", [
			m(Button, { onclick: openModal }, "打开对话框")
		]);
	}
};

const Main: m.Component = {
	view: _ => m("div.ui.teal.segment", [
		m(Header, { divid: true, size: Size.Huge }, "对话框"),
		m(S),
		m(Header, { size: Size.Large }, "混合使用"),
		m(SModal)
	])
};

export default Main;
