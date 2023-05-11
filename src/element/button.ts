import * as m from "mithril";
import { Maybe } from "purify-ts";
import { pickKlass, selectKlass } from "../internal/attr";
import { AttachPosition, Color, EmLevel, LoadingShape, Size, StateLevel } from "../data/var";
import { mkCallback } from "../data/fn";

export enum ButtonStyle {
	Circle = "circle",
	Basic = "Basic",
	Tertiary = "tertiary"
}

export interface ButtonAttr {
	size?: Size;
	color?: Color;
	level?: StateLevel;
	em?: EmLevel;
	attach?: AttachPosition;
	isFluid?: boolean;
	loading?: LoadingShape;
	style?: ButtonStyle;
	connectClick?: (e: MouseEvent) => void;
}

const pickAttr = <T extends ButtonAttr>(attr: T): m.Attributes => {
	const klass = pickKlass([
		Maybe.fromNullable(attr.size),
		Maybe.fromNullable(attr.color),
		Maybe.fromNullable(attr.level),
		Maybe.fromNullable(attr.em),
		Maybe.fromNullable(attr.attach),
		selectKlass("fluid", attr.isFluid),
		Maybe.fromNullable(attr.style),
		Maybe.fromNullable(attr.loading)
	]);

	const onclick = mkCallback(attr.connectClick);

	return {
		class: klass,
		onclick
	};
};

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const prop = pickAttr(attrs);
		return m("button.ui.button", prop, children);
	}
};
