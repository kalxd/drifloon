import { Header } from "drifloon/element/header";
import { FixSelect, FixSelectAttr } from "drifloon/module/dropdown";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import * as m from "mithril";

const FixSelectS = (): m.Component => {
	interface Item {
		key: number;
		value: string;
	}

	const items: Array<Item> = [
		{ key: 1, value: "item 1" },
		{ key: 2, value: "item 2" }
	];

	const state = new IORef<Item>({ key: 1, value: "item 1"});

	return {
		view: () => {
			const prop: FixSelectAttr<Item> = {
				value: state.ask(),
				itemList: items,
				renderItem: item => item.value,
				renderText: item => item.value,
				connectChange: item => state.put(item)
			};

			return m<FixSelectAttr<Item>, {}>(FixSelect, prop);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.purple.segment", [
			m(Header, { isDivid: true, size: Size.Huge }, "下拉菜单"),
			m(Header, { size: Size.Large }, "普通状态"),
			m(FixSelectS),
		])
	}
};

export default Main;
