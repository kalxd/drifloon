import { Header, Header2_, Select, SelectAttr } from "drifloon";
import { Size } from "drifloon/Type";
import * as m from "mithril";

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

const NormalS: m.Component = {
	view: (_) => {
		const attr: SelectAttr<RecordItem> = {
			placeholder: "随便选择一个",
			renderItem: x => x.name,
			items: items
		};
		return m<SelectAttr<RecordItem>, {}>(Select, attr);
	}
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
