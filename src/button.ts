import * as m from "mithril";
import { Just, Maybe } from "purify-ts";
import { pickKlass, selectKlass } from "./internal/attr";
import { AttachPosition, Color, EmLevel, LoadingShape, Size, StateLevel } from "./data/var";

export interface ButtonAttr {
	size?: Size;
	color?: Color;
	level?: StateLevel;
	em?: EmLevel;
	attach?: AttachPosition;
	isFluid?: boolean;
	isCircle?: boolean;
	onclick?: (event: MouseEvent) => void;
}

const pickAttr = <T extends ButtonAttr>(attr: T): m.Attributes => {
	const klass = pickKlass([
		Maybe.fromNullable(attr.size),
		Maybe.fromNullable(attr.color),
		Maybe.fromNullable(attr.level),
		Maybe.fromNullable(attr.em),
		Maybe.fromNullable(attr.attach),
		selectKlass("fluid", attr.isFluid),
		selectKlass("circular", attr.isCircle)
	]);

	return {
		class: klass,
		onclick: attr.onclick
	};
};

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const prop = pickAttr(attrs);
		return m("button.ui.button", prop, children);
	}
};

export const BasicButton: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const prop = pickAttr(attrs);
		return m("button.ui.basic.button", prop, children);
	}
};

export const TertiaryButton: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const prop = pickAttr(attrs);
		return m("button.ui.tertiary.button", prop, children);
	}
};

export const IconButton: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const prop = pickAttr(attrs);
		return m("button.ui.icon.button", prop, children);
	}
};

export interface LoadingButtonAttr {
	color?: Color;
	shape?: LoadingShape;
}

export const LoadingButton: m.Component<LoadingButtonAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.shape).alt(Just(LoadingShape.Default))
		]);

		return m("button.ui.button", { class: klass }, children);
	}
};
