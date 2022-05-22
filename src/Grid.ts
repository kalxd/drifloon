import * as m from "mithril";
import { Maybe } from "purify-ts";

import { fmapKlass, pickKlass, selectKlassWhen } from "./prelude/Attr";
import { toPlainVnode } from "./prelude/Wrap";
import { Align, Color, Float, Wide } from "./Type";

const wideColumn = (wide: Wide): string => `${wide} column`;

export interface GridAttr {
	wide?: Wide;
	equalWidth?: boolean;
	pad?: boolean;
	cell?: boolean;
	relax?: boolean;
	center?: boolean;
}

export const Grid: m.Component<GridAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideColumn, attrs.wide),
			selectKlassWhen(attrs.pad, "padded"),
			selectKlassWhen(attrs.equalWidth, "equal width"),
			selectKlassWhen(attrs.cell, "internally celled"),
			selectKlassWhen(attrs.relax, "relaxed"),
			selectKlassWhen(attrs.center, "centered")
		]);

		return m("div.ui.grid", { class: klass }, children);
	}
});

export interface RowAttr {
	wide?: Wide;
}

export const Row: m.Component<RowAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapKlass(wideColumn, attrs.wide)
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
