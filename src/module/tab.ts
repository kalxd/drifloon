import * as m from "mithril";
import { Menu, MenuAttr, MenuStyle } from "../element/menu";
import { ComponentPanic } from "../data/internal/error";
import { Segment, SegmentAttr, SegmentStyle } from "../element";
import { Item, ItemAttr } from "../element/item";
import { BindValue, bindValue } from "../data/internal/value";
import { AttachPosition } from "../data/var";

const E = new ComponentPanic("ModuleTab");

export interface TabAttr extends BindValue<number> {}

export interface TabSegmentAttr {
	title?: string;
}

export const useTab = (): [m.Component<TabAttr>, m.Component<TabSegmentAttr>] => {
	const Tab: m.Component<TabSegmentAttr> = {
		view: ({ children }) => {
			const attr: SegmentAttr = {
				isActive: true,
				style: SegmentStyle.Tab,
				attach: AttachPosition.Bottom
			};
			return m(Segment, attr, children);
		}
	};

	const TabFrame: m.Component<TabAttr> = {
		view: ({ attrs, children }) => {
			if (!Array.isArray(children)) {
				E.panic("children仅支持数组！");
			}

			const mbindvalue = bindValue(attrs);
			const xs = children as m.ChildArray;
			const index = mbindvalue.value.orDefault(0);

			const tabList = xs.map((x, i) => {
				const v = x as m.Vnode<TabSegmentAttr>;
				const itemAttr: ItemAttr = {
					isActive: i === index,
					connectClick: () => mbindvalue.connectChange(i)
				};

				const title = v.attrs.title ?? `标签${i + 1}`;
				return m(Item, itemAttr, title);
			});

			const ys = xs.map((x, i) => {
				if (i === index) {
					return x;
				}
				else {
					return null;
				}
			});

			const menuAttr: MenuAttr = {
				style: MenuStyle.Tabular,
				attach: AttachPosition.Top
			};

			return m.fragment({}, [
				m(Menu, menuAttr, tabList),
				...ys
			]);
		}
	};

	return [TabFrame, Tab];
};
