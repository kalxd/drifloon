import { Maybe } from "purify-ts";
import { AttachPosition, Color, Wide } from "../../data/var";
import { fmapKlass, pickKlass, selectKlass } from "../../data/internal/attr";

export enum MenuShape {
	Point = "pointing",
	Tab = "tabular",
	Text = "text"
}

export enum MenuFixPosition {
	Top = "top fixed",
	Bottom = "bottom fixed",
	Left = "left fixed",
	Right = "right fixed"
}

export enum MenuStyle {
	Secondary = "secondary",
	Pointing = "pointing",
	SecondaryPointing = "secondary pointing",
	Tabular = "tabular",
	Text = "text"
}

export interface MenuAttr {
	style?: MenuStyle;
	wide?: Wide;
	attach?: AttachPosition;
	shape?: MenuShape;
	isVertical?: boolean;
	invert?: boolean;
	isRight?: boolean;
	fixAt?: MenuFixPosition;
	color?: Color;
	isFluid?: boolean;
	isBorderless?: boolean;
}

const wideColumn = (wide: Wide): string => `${wide} item`;

export const pickMenuAttrClass = <A extends MenuAttr>(attr: A): string | undefined =>
	pickKlass([
		Maybe.fromNullable(attr.style),
			fmapKlass(wideColumn, attr.wide),
			Maybe.fromNullable(attr.attach),
			Maybe.fromNullable(attr.shape),
			selectKlass("vertical", attr.isVertical),
			selectKlass("inverted", attr.invert),
			selectKlass("right", attr.isRight),
			Maybe.fromNullable(attr.fixAt),
			Maybe.fromNullable(attr.color),
			selectKlass("fluid", attr.isFluid),
			selectKlass("borderless", attr.isBorderless)
	]);
