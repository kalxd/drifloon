import * as m from "mithril";
import { Maybe } from "purify-ts";

import { fmapKlass, pickEnumValue, pickKlass, selectKlassWhen } from "./prelude/Attr";
import { toPlainVnode } from "./prelude/Wrap";
import { Align, Color, Float, Wide } from "./Type";

const wideColumn = (wide: Wide): string => `${wide} column`;

export enum GridDividType {
	Vertical,
	Horizontal
}

const mapDividType = pickEnumValue({
	[GridDividType.Horizontal]: "divided",
	[GridDividType.Vertical]: "vertically divided"
});

export enum GridCellType {
	Internal,
	All
}

const mapCellType = pickEnumValue({
	[GridCellType.Internal]: "internally celled",
	[GridCellType.All]: "celled"
});

export enum GridPadType {
	Pad,
	Compact
}

const mapPadType = pickEnumValue({
	[GridPadType.Pad]: "padded",
	[GridPadType.Compact]: "compact"
});

export enum GridMiddleAlignType {
	Top,
	Middle,
	Bottom
}

const mapMiddleAlignType = pickEnumValue({
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

export const Grid: m.Component<GridAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideColumn, attrs.wide),
			selectKlassWhen(attrs.equalWidth, "equal width"),
			selectKlassWhen(attrs.relax, "relaxed"),
			selectKlassWhen(attrs.center, "centered"),
			fmapKlass(mapDividType, attrs.divid),
			fmapKlass(mapCellType, attrs.cell),
			fmapKlass(mapPadType, attrs.pad),
			fmapKlass(mapMiddleAlignType, attrs.middleAlign)
		]);

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
			fmapKlass(wideColumn, attrs.wide),
			selectKlassWhen(attrs.stretch, "stretched")
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
			fmapKlass(wideColumn, attrs.wide),
			Maybe.fromNullable(attrs.float),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.align)
		]);

		return m("div.column", { class: klass }, children);
	}
});
