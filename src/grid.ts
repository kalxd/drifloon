import * as m from "mithril";
import { curry, Maybe } from "purify-ts";

import { fmapKlass, pickKlass, selectKlass } from "./internal/attr";
import { Align, Color, Float, Wide } from "./data/var";

const wideFor = curry((base: string, wide: Wide): string => {
	return `${wide} ${base}`;
});

export enum GridDividType {
	Vertical = "divided",
	Horizontal = "vertically divided"
}

export enum GridCellType {
	Internal = "internally celled",
	All = "celled"
}

export enum GridPadType {
	Pad = "padded",
	Compact = "compact"
}

export enum GridMiddleAlignType {
	Top = "top aligned",
	Middle = "middle aligned",
	Bottom = "bottom aligned"
}

export interface GridAttr {
	wide?: Wide;
	isEqualWidth?: boolean;
	pad?: GridPadType;
	isRelax?: boolean;
	isCenter?: boolean;
	middleAlign?: GridMiddleAlignType;
	divid?: GridDividType;
	cell?: GridCellType;
}

export const pickGridKlass = (attr: GridAttr): Array<Maybe<string>> => [
	fmapKlass(wideFor('column'), attr.wide),
	selectKlass("equal width", attr.isEqualWidth),
	selectKlass("relaxed", attr.isRelax),
	selectKlass("centered", attr.isCenter),
	Maybe.fromNullable(attr.divid),
	Maybe.fromNullable(attr.cell),
	Maybe.fromNullable(attr.pad),
	Maybe.fromNullable(attr.middleAlign)
];

export const Grid: m.Component<GridAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickGridKlass(attrs));

		return m("div.ui.grid", { class: klass }, children);
	}
});

export interface RowAttr {
	wide?: Wide;
	isStretch?: boolean;
}

export const Row: m.Component<RowAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideFor('column'), attrs.wide),
			selectKlass("stretched", attrs.isStretch)
		]);

		return m("div.row", { class: klass }, children);
	}
});

export interface ColumnAttr {
	wide?: Wide;
	float?: Float;
	align?: Align;
	color?: Color;
}

export const Column: m.Component<ColumnAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideFor('wide'), attrs.wide),
			Maybe.fromNullable(attrs.float),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.align)
		]);

		return m("div.column", { class: klass }, children);
	}
});
