import { compareEqAt, propOf } from "drifloon/data/fn";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import { PlainInput } from "drifloon/element/input";
import { Toggle, ToggleAttr, CompleteInput, CompleteInputAttr } from "drifloon/widget/input";
import * as Input from "drifloon/widget/input";
import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import { mutable } from "drifloon/data";
import { alertText } from "drifloon/module/modal";
import { Button } from "drifloon/element/button";

const ToggleS = (): m.Component => {
	interface State {
		s1: boolean;
		s2: boolean;
	}
	const value = new IORef<State>({
		s1: false,
		s2: true
	});

	return {
		view: () => {
			const attr1: ToggleAttr = value.asks(s => ({
				value: s.s1,
				connectChange: b => value.putAt("s1", b)
			}));

			const attr2: ToggleAttr = value.asks(s => ({
				value: s.s2,
				connectChange: b => value.putAt("s2", b)
			}));

			return m("div", [
				m("div", [
					m(Toggle, attr1, "自愿打工")
				]),
				m("div", [
					m(Toggle, attr2, "被迫下班")
				])
			]);
		}
	};
};

const CheckBoxS = (): m.Component => {
	interface State {
		isGo: boolean;
		isDisable: boolean;
	}

	const state = new IORef<State>({ isGo: false, isDisable: true });

	return {
		view: () => {
			const a1: Input.CheckboxAttr = {
				value: state.askAt("isGo"),
				connectChange: b => state.putAt("isGo", b)
			};

			const a2: Input.CheckboxAttr = {
				value: state.askAt("isDisable"),
				connectChange: b => state.putAt("isDisable", b)
			};

			return m("div", [
				m("div", [
					m(Input.Checkbox, a1, "不同意"),
					m(Input.Checkbox, a2, "禁止访问")
				])
			]);
		}
	};
};

const RadioboxS = (): m.Component => {
	interface Item {
		key: number;
		value: string;
	}

	const state = new IORef<Maybe<Item>>(Nothing);

	const itemList: Array<Item> = [
		{ key: 1, value: "hello 1" },
		{ key: 2, value: "hello 2" },
		{ key: 3, value: "hello 3" }
	];

	return {
		view: () => {
			const attr: Input.RadioboxAttr<Item> = {
				value: state.ask().extract(),
				itemList,
				compare: compareEqAt("key"),
				renderItem: propOf("value"),
				connectChange: item => state.put(Just(item))
			};

			return m("div", [
				m(Input.Radiobox, attr)
			])
		}
	};
};

const InputS = (): m.Component => {
	const s = mutable<string>("sb");

	const alertResult = () => {
		alertText(s.get());
	};

	return {
		view: () => {
			return m("div", [
				m(PlainInput, {
					bindValue: s
				}),
				m(Button, { connectClick: alertResult }, "查看结果")
			]);
		}
	};
};

const CompleteInputS = (): m.Component => {
	interface Item {
		id: number;
		text: string;
	}

	const state = new IORef<string>("");
	const itemList: Array<Item> = [
		{ id: 0, text: "中图" },
		{ id: 1, text: "豆瓣" },
		{ id: 2, text: "京东" }
	];

	return {
		view: () => {
			const attr: CompleteInputAttr<Item> = {
				value: state.ask(),
				placeholder: "大爷快来玩儿呀！",
				completeList: itemList,
				eq: (value, item) => item.text.includes(value),
				renderItem: propOf("text"),
				connectChange: s => state.put(s)
			};
			return m(CompleteInput, attr);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.black.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "输入"),
			m(Header, { size: Size.Large }, "开关"),
			m(ToggleS),
			Header2("勾选框"),
			m(CheckBoxS),
			Header2("单选框"),
			m(RadioboxS),
			Header2("普通输入框"),
			m(InputS),
			Header2("带补全的输入"),
			m(CompleteInputS)
		]);
	}
};

export default Main;
