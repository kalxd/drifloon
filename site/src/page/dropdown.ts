import { Header } from "drifloon/element/header";
import { FixSelect, FixSelectAttr, Select, SelectAttr, MultSelect, MultSelectAttr } from "drifloon/module/dropdown";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import * as m from "mithril";
import { Maybe, Nothing } from "purify-ts";

interface Item {
	key: number;
	value: string;
}

const items: Array<Item> = [
	{ key: 1, value: "item 1" },
	{ key: 2, value: "item 2" },
	{ key: 3, value: "item 3" },
	{ key: 4, value: "item 4" }
];

const FixSelectS = (): m.Component => {
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

const MultSelectS = (): m.Component => {
	return {
		view: () => {
			const attr: MultSelectAttr<Item> = {
				value: [],
				placeholder: "来选一个"
			};

			return m(MultSelect, attr);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.purple.segment", [
			m(Header, { isDivid: true, size: Size.Huge }, "下拉菜单"),
			m(Header, { size: Size.Large }, "普通状态"),
			m(FixSelectS),
			m(Header, { size: Size.Large }, "多选"),
			m(MultSelectS)
		])
	}
};

export default Main;
