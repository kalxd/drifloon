import { propOf } from "drifloon/data/fn";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import { IntInput, IntInputAttr, Toggle, ToggleAttr, CompleteInput, CompleteInputAttr } from "drifloon/widget/input";
import * as Input from "drifloon/widget/input";
import * as m from "mithril";

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
			const a1: Input.ToggleAttr = {
				value: state.askAt("isGo"),
				connectChange: b => state.putAt("isGo", b)
			};

			const a2: Input.ToggleAttr = {
				value: state.askAt("isDisable"),
				connectChange: b => state.putAt("isDisable", b)
			};

			return m("div", [
				m("div", [
					m(Input.Toggle, a1, "不同意"),
					m(Input.Toggle, a2, "禁止访问")
				])
			]);
		}
	};
};

const SomeInputS = (): m.Component => {
	const state = new IORef<number>(10);

	return {
		view: () => {
			const attr: IntInputAttr = {
				placeholder: "sb",
				value: state.ask(),
				connectChange: n => state.put(n)
			};

			return m<IntInputAttr, {}>(IntInput, attr);
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
			m(Header, { size: Size.Large }, "一些特定输入"),
			m(SomeInputS),
			Header2("带补全的输入"),
			m(CompleteInputS)
		]);
	}
};

export default Main;
