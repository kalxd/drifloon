import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Toggle, ToggleAttr } from "drifloon/input";
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
				onchange: b => value.putAt("s1", b)
			}));

			const attr2: ToggleAttr = value.asks(s => ({
				value: s.s2,
				onchange: b => value.putAt("s2", b)
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

const Main: m.Component = {
	view: () => {
		return m("div.ui.black.segment", [
			m(Header, { size: Size.Huge, isDivid: true }, "输入"),
			m(Header, { size: Size.Large }, "开关"),
			m(ToggleS)
		]);
	}
};

export default Main;
