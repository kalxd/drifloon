import { compareEqAt, propOf } from "drifloon/data/fn";
import { Size } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import { TrimInput, Input as RawInput } from "drifloon/element/input";
import * as Input from "drifloon/widget/input";
import { Checkbox, CheckboxAttr, Toggle, ToggleAttr } from "drifloon/form";
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
	const value = mutable<State>({
		s1: false,
		s2: true
	});

	return {
		view: () => {
			const attr1: ToggleAttr = (state => {
				const lens = state.prop("s1");
				return {
					value: lens.get(),
					connectChange: lens.set
				};
			})(value);

			const attr2: ToggleAttr = (state => {
				const lens = state.prop("s2");
				return {
					value: lens.get(),
					connectChange: lens.set
				};
			})(value);
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

	const state = mutable<State>({ isGo: false, isDisable: true });

	return {
		view: () => {
			const a1: CheckboxAttr = {
				bindValue: state.prop("isGo")
			};

			const a2: CheckboxAttr = {
				bindValue: state.prop("isDisable")
			};

			return m("div", [
				m("div", [
					m(Checkbox, a1, "不同意"),
					m(Checkbox, a2, "禁止访问")
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

	const state = mutable<Maybe<Item>>(Nothing);

	const itemList: Array<Item> = [
		{ key: 1, value: "hello 1" },
		{ key: 2, value: "hello 2" },
		{ key: 3, value: "hello 3" }
	];

	return {
		view: () => {
			const attr: Input.RadioboxAttr<Item> = {
				value: state.get().extract(),
				itemList,
				compare: compareEqAt("key"),
				renderItem: propOf("value"),
				connectChange: item => state.set(Just(item))
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
				m(RawInput, { bindValue: s }),
				m(TrimInput, { bindValue: s }),
				m(Button, { connectClick: alertResult }, "查看结果")
			]);
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
			Header2("带补全的输入")
		]);
	}
};

export default Main;
