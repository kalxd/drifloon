import * as m from "mithril";
import { prependIs, prependKlass, combineClass } from "./prelude/z";

const prependIsOffset = prependKlass("is-offset");

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


export const Columns: m.Component = {
	view: vnode => m("div.columns", vnode.children)
};


export interface ColumnAttr {
	size?: ColumSize;
	offset?: ColumSize;
};

export const Column: m.Component<ColumnAttr> = {
	view: vnode => {
		const klass = combineClass([
			[vnode.attrs.size, prependIs],
			[vnode.attrs.offset, prependIsOffset]
		]);

		return m("div.column", { class: klass }, vnode.children);
	}
};
