import { Header } from "drifloon/header";
import { Select, SelectAttr, MSelect, MSelectAttr } from "drifloon/dropdown";
import { IORef } from "drifloon/data/ref";
import { Size } from "drifloon/data/var";
import * as m from "mithril";
import { Maybe, Nothing, Just } from "purify-ts";

interface RecordItem {
	key: string;
	name: string;
}

const items: Array<RecordItem> = [
	{
		key: "key1",
		name: "菜单一"
	},
	{
		key: "key2",
		name: "菜单二"
	},
	{
		key: "key3",
		name: "菜单三"
	},
	{
		key: "key4",
		name: "菜单四"
	}
];

const NormalS = (): m.Component => {
	interface State {
		value: Maybe<RecordItem>;
	}

	const ref = new IORef<State>({
		value: Nothing
	});

	return {
		view: (_) => {
			const attr: SelectAttr<RecordItem> = {
				value: ref.asks(s => s.value),
				placeholder: "随便选择一个",
				renderItem: x => x.name,
				renderText: x => `${x.key} - ${x.name}`,
				onselect: x => ref.putAt("value", x),
				items: items
			};
			return m<SelectAttr<RecordItem>, {}>(Select, attr);
		}
	};
};

const MS = (): m.Component => {
	interface State {
		value: Maybe<Array<RecordItem>>;
	}

	const ref = new IORef<State>({ value: Just(items) });

	return {
		view: () => {
			const attr: MSelectAttr<RecordItem> = {
				value: ref.askAt("value"),
				items,
				cmp: (a, b) => a.key === b.key,
				renderLabel: item => item.name,
				renderItem: item => item.name,
				onChange: r => ref.putAt("value", r),
				placeholder: "多选题"
			};

			return m(MSelect, attr);
		}
	}
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.purple.segment", [
			m(Header, { isDivid: true, size: Size.Huge }, "下拉菜单"),
			m(Header, { size: Size.Large }, "普通状态"),
			m(NormalS),

			m(Header, { size: Size.Large }, "多重选择"),
			m(MS)
		])
	}
};

export default Main;
