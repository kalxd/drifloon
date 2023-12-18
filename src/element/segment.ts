import { Align, AttachPosition, Color, EmLevel } from "../data/var";
import * as m from "mithril";
import { pickKlass, selectKlass } from "../internal/attr";
import { Maybe } from "purify-ts";

export enum SegmentShape {
	Basic = "basic",
	Raise = "raised",
	Stack = "stacked",
	TallStack = "tall stacked",
	Pile = "piled"
}

export interface SegmentAttr {
	shape?: SegmentShape;
	isVertical?: boolean;
	isLoading?: boolean;
	isInvert?: boolean;
	attach?: AttachPosition;
	color?: Color;
	align?: Align;
	em?: EmLevel;
}

export const Segment: m.Component<SegmentAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.shape),
			selectKlass("vertical", attrs.isVertical),
			selectKlass("loading", attrs.isLoading),
			selectKlass("inverted", attrs.isInvert),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.align),
			Maybe.fromNullable(attrs.em)
		]);

		return m("div.ui.segment", { class: klass }, children);
	}
};
