import * as m from "mithril";
import { prependIs, pickKlass, selectKlassWhen, fmapIsKlass } from "./prelude/attr";

export enum ColumSize {
	ThreeQuarters = "three-quarters",
	TwoThird = "two-third",
	Half = "half",
	OneThird = "one-third",
	OneQuarter = "one-quarter",
	Full = "full",
	FourFifths = "four-fifths",
	ThreeFifths = "three-fifths",
	TwoFifths = "two-fifths",
	OneFifth = "one-fifth",
	One = "1",
	Two = "2",
	Three = "3",
	Four = "4",
	Five = "5",
	Six = "6",
	Seven = "7",
	Eight = "8",
	Nine = "9",
	Ten = "10",
	Eleven = "11",
	Twelve = "12"
}

export interface ColumnsAttr {
	isGapless?: boolean;
	isMultiline?: boolean;
}

export const Columns: m.Component<ColumnsAttr> = {
	view: vnode => {
		const klass = pickKlass([
			selectKlassWhen(vnode.attrs.isMultiline, prependIs("multiline")),
			selectKlassWhen(vnode.attrs.isGapless, prependIs("gapless"))
		]);

		return m("div.columns", { class: klass }, vnode.children);
	}
};

export interface ColumnAttr {
	size?: ColumSize;
	offset?: ColumSize;
	isNarrow?: boolean;
};

export const Column: m.Component<ColumnAttr> = {
	view: vnode => {
		const klass = pickKlass([
			fmapIsKlass(vnode.attrs.size),
			fmapIsKlass(vnode.attrs.offset),
			selectKlassWhen(vnode.attrs.isNarrow, prependIs("narrow"))
		]);

		return m("div.column", { class: klass }, vnode.children);
	}
};
