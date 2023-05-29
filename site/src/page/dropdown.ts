import { Header } from "drifloon/element/header";
import { FixSelect, FixSelectAttr, Select, SelectAttr } from "drifloon/module/dropdown";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import * as m from "mithril";
import { Maybe, Nothing } from "purify-ts";

const FixSelectS = (): m.Component => {
	interface Item {
		key: number;
		value: string;
	}

	const items: Array<Item> = [
		{ key: 1, value: "item 1" },
		{ key: 2, value: "item 2" }
	];

	const fixState = new IORef<Item>({ key: 1, value: "item 1"});
	const dynState = new IORef<Maybe<Item>>(Nothing);

	return {
		view: () => {
			const fixAttr: FixSelectAttr<Item> = {
				value: fixState.ask(),
				itemList: items,
				renderItem: item => item.value,
				renderText: item => item.value,
				connectChange: item => fixState.put(item)
			};

			const dynAttr: SelectAttr<Item> = {
				value: dynState.ask(),
				placeholder: "请选择",
				itemList: items,
				renderItem: item => item.value,
				renderText: item => item.value,
				connectChange: item => dynState.put(item)
			};

			return m.fragment({}, [
				m<FixSelectAttr<Item>, {}>(FixSelect, fixAttr),
				m<SelectAttr<Item>, {}>(Select, dynAttr)
			]);
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
