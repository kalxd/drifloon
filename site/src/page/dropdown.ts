import { Header } from "drifloon/element/header";
import { Select, SelectAttr, MultiSelect, MultiSelectAttr, FixSelect, FixSelectAttr } from "drifloon/widget/dropdown";
import { Size } from "drifloon/data/var";
import * as m from "mithril";
import { Maybe, Nothing } from "purify-ts";
import { mutable, propOf } from "drifloon/data";

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
	const dynState = mutable<Maybe<Item>>(Nothing);
	const fixState = mutable<Item>(items[0]);

	return {
		view: () => {
			const dynAttr: SelectAttr<Item> = {
				value: dynState.get(),
				placeholder: "请选择",
				itemList: items,
				renderItem: item => item.value,
				renderText: item => item.value,
				connectChange: dynState.set
			};

			const fixAttr: FixSelectAttr<Item> = {
				value: fixState.get(),
				itemList: items,
				renderItem: propOf("value"),
				renderText: propOf("value"),
				connectChange: fixState.set
			};

			return m.fragment({}, [
				m<SelectAttr<Item>, {}>(Select, dynAttr),
				m<FixSelectAttr<Item>, {}>(FixSelect, fixAttr)
			]);
		}
	};
};

const MultSelectS = (): m.Component => {
	const state = mutable<Array<Item>>([]);
	return {
		view: () => {
			const attr: MultiSelectAttr<Item> = {
				value: state.get(),
				itemList: items,
				renderText: item => item.value,
				renderItem: item => item.value,
				placeholder: "来选一个",
				connectChange: state.set
			};

			return m(MultiSelect, attr);
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
