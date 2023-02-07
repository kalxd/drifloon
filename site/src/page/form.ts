import IORef from "drifloon/data/ioref";
import { Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Radiobox, RadioboxAttr } from "drifloon/input";
import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import { Button } from "drifloon/button";
import { alertMsg } from "drifloon/modal";

interface RadioItem {
	key: number;
	text: string;
}

const radioItems: Array<RadioItem> = [
	{ key: 1, text: "第一个" },
	{ key: 2, text: "第二个"}
];

const RadioS = (): m.Component => {
	const ref = new IORef<Maybe<RadioItem>>(Nothing);

	const alertRef = () => {
		ref.ask()
			.caseOf({
				Just: x => alertMsg(JSON.stringify(x)),
				Nothing: () => alertMsg("你还未选择")
			})
	};

	return {
		view: () => {
			const attr: RadioboxAttr<RadioItem> = {
				value: ref.ask(),
				items: radioItems,
				cmp: (value, item) => value.key === item.key,
				renderItem: item => item.text,
				onchange: x => ref.put(Just(x))
			};

			return [
				m(Radiobox, attr),
				m(Button, { onclick: alertRef }, "查看结果")
			];
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.pink.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "表单"),
			m(RadioS)
		])
	}
};

export default Main;
