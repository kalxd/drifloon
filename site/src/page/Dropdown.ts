import { Header, Header2_ } from "drifloon";
import { Dropdown, DropdownAttr } from "drifloon/Dropdown";
import IORef from "drifloon/prelude/IORef";
import { Size } from "drifloon/Type";
import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";

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
			const attr: DropdownAttr<RecordItem> = {
				value: ref.asks(s => s.value),
				placeholder: "随便选择一个",
				renderItem: x => x.name,
				renderText: x => `${x.key} - ${x.name}`,
				onselect: x => ref.putAt("value", Just(x)),
				items: items
			};
			return m<DropdownAttr<RecordItem>, any>(Dropdown, attr);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m("div.ui.purple.segment", [
			m(Header, { divid: true, size: Size.Huge }, "下拉菜单"),
			Header2_("普通状态"),
			m(NormalS)
		])
	}
};

export default Main;
