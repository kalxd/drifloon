import * as m from "mithril";
import { curry, Maybe } from "purify-ts";

import { fmapKlass, genMapping, pickKlass, selectKlass } from "./prelude/Fn";
import { toPlainVnode } from "./prelude/Wrap";
import { Align, Color, Float, showAlign, showColor, showFloat, showWide, Wide } from "./Type";

const wideFor = curry((base: string, wide: Wide): string => {
	return `${showWide(wide)} ${base}`;
});

export enum GridDividType {
	Vertical,
	Horizontal
}

const mapDividType = genMapping({
	[GridDividType.Horizontal]: "divided",
	[GridDividType.Vertical]: "vertically divided"
});

export enum GridCellType {
	Internal,
	All
}

const mapCellType = genMapping({
	[GridCellType.Internal]: "internally celled",
	[GridCellType.All]: "celled"
});

export enum GridPadType {
	Pad,
	Compact
}

const mapPadType = genMapping({
	[GridPadType.Pad]: "padded",
	[GridPadType.Compact]: "compact"
});

export enum GridMiddleAlignType {
	Top,
	Middle,
	Bottom
}

const mapMiddleAlignType = genMapping({
	[GridMiddleAlignType.Top]: "top aligned",
	[GridMiddleAlignType.Middle]: "middle aligned",
	[GridMiddleAlignType.Bottom]: "bottom aligned"
});

export interface GridAttr {
	wide?: Wide;
	equalWidth?: boolean;
	pad?: GridPadType;
	relax?: boolean;
	center?: boolean;
	middleAlign?: GridMiddleAlignType;
	divid?: GridDividType;
	cell?: GridCellType;
}

export const pickGridKlass = (attr: GridAttr): Array<Maybe<string>> => [
	fmapKlass(wideFor('column'), attr.wide),
	selectKlass("equal width", attr.equalWidth),
	selectKlass("relaxed", attr.relax),
	selectKlass("centered", attr.center),
	fmapKlass(mapDividType, attr.divid),
	fmapKlass(mapCellType, attr.cell),
	fmapKlass(mapPadType, attr.pad),
	fmapKlass(mapMiddleAlignType, attr.middleAlign)
];

export const Grid: m.Component<GridAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass(pickGridKlass(attrs));

		return m("div.ui.grid", { class: klass }, children);
	}
});

export interface RowAttr {
	wide?: Wide;
	stretch?: boolean;
}

export const Row: m.Component<RowAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideFor('column'), attrs.wide),
			selectKlass("stretched", attrs.stretch)
		]);

		return m("div.row", { class: klass }, children);
	}
});

export const Row_ = toPlainVnode(Row);

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
			fmapKlass(showFloat, attrs.float),
			fmapKlass(showColor, attrs.color),
			fmapKlass(showAlign, attrs.align),
		]);

		return m("div.column", { class: klass }, children);
	}
});
