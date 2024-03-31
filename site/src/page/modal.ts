import * as m from "drifloon/m";
import { Button } from "drifloon/element/button";
import { Header } from "drifloon/element/header";
import { Color, Size } from "drifloon/data/var";
import {
	alertText,
	confirmAsync,
	confirmText,
	modal,
	ResolveConfirmAttr,
	ResolveModalAttr
} from "drifloon/module/modal";
import { Modal, ModalAttr } from "drifloon/widget/modal";
import { Maybe } from "purify-ts";

const ConfirmS: m.Component = {
	view: () => {
		const attr1: ResolveConfirmAttr = {
			title: "新式标题",
			content: m("div.label.ui.orange", "理论上，这里写上任何文本。")
		};

		const onclick1 = () => {
			confirmAsync(attr1)
				.caseOf({
					Just: _ => alertText("你点了确定！"),
					Nothing: () => alertText("你点了取消！"),
				});
		};

		return m(Button, { color: Color.Green, connectClick: onclick1 }, "提示")
	}
};

const AlertModalHere: m.Component<ResolveModalAttr<Maybe<void>>> = {
	view: ({ attrs }) => {
		const modalAttr: ModalAttr = {
			...attrs,
			title: "对话框演示",
		};

		return m(Modal, modalAttr, [
			m(Button, { connectClick: () => alertText("你看见我了") }, "alert"),
			m(Button, { connectClick: () => confirmText("你看见我了") }, "confirm")
		]);
	}
};

const ModalS: m.Component = {
	view: () => {
		const openModal = () => modal(AlertModalHere);
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
