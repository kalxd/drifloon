import * as m from "mithril";
import { Just, Maybe } from "purify-ts";
import { Align } from "../data/var";
import { Menu, MenuAttr, MenuStyle } from "../element/menu";
import { Segment, SegmentStyle, SegmentAttr } from "../element/segment";
import { pickKlass, selectKlass } from "../data/internal/attr";

const rangePager = (
	current: number,
	total: number
): Array<number> => {
	const left = Math.max(1, current - 3);
	const right = Math.min(total, current + 3);

	let xs: Array<number> = [];
	for (let i = left; i <= right; ++i) {
		xs.push(i);
	}

	return xs;
};

interface PagerItemAttr {
	isActive: boolean;
	connectClick: () => void;
}

const PagerItem: m.Component<PagerItemAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlass("active", attrs.isActive),
			selectKlass("link", !attrs.isActive)
		]);

		const attr = {
			class: klass,
			onclick: attrs.connectClick
		};

		return m("div.item", attr, children);
	}
};

export interface PagerAttr extends MenuAttr {
	current?: number;
	limit?: number;
	total?: number;
	connectPageChange?: (page: number) => void;
}

export const Pager: m.Component<PagerAttr> = {
	view: ({ attrs }) => {
		const currentDef = attrs.current ?? 1;
		const limit = attrs.limit ?? 20;
		const total = attrs.total ?? 1;
		const monPageChange = Maybe.fromNullable(attrs.connectPageChange);

		const totalPage = Math.ceil(total / limit);
		const current = Math.max(1, Math.min(currentDef, totalPage));

		const segmentAttr: SegmentAttr = {
			align: Align.Center,
			style: SegmentStyle.Basic
		};

		const itemList = rangePager(current, totalPage)
			.map(pageIndex => {
				const attr: PagerItemAttr = {
					isActive: pageIndex === current,
					connectClick: () => {
						Just(pageIndex)
							.filter(n => n !== current)
							.ap(monPageChange);
					}
				};
				return m(PagerItem, attr, pageIndex);
			});

		const firstItem = m(
			PagerItem,
			{
				isActive: false,
				connectClick: () =>
					Just(1)
						.filter(_ => current !== 1)
						.ap(monPageChange)
			},
			m("i.angle.double.left.icon")
		);

		const lastItem = m(
			PagerItem,
			{
				isActive: false,
				connectClick: () =>
					Just(totalPage)
						.filter(_ => current !== totalPage)
						.ap(monPageChange)
			},
			m("i.angle.double.right.icon")
		);

		const menuAttr: MenuAttr = {
			...attrs,
			style: MenuStyle.Pagination
		};

		return m(Segment, segmentAttr, [
			m(Menu, menuAttr, [
				firstItem,
				...itemList,
				lastItem
			])
		]);
	}
};
