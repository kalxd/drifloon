import * as m from "mithril";
import { Item, ItemAttr } from "../element/item";

export interface TabItemAttr {
	isActive?: boolean;
}

export const TabItem: m.Component<TabItemAttr> = {
	view: ({ attrs, children }) => {
		const itemAttr: ItemAttr = {
			isActive: attrs.isActive
		};

		return m(Item, itemAttr, children);
	}
};
