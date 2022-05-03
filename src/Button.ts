import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "prelude/Attr";
import { Maybe } from "purify-ts";
import { Color, Size } from "Type";

/**
 * 最基本的按钮属性。
 */
export interface ButtonAttr {
	color?: Color;
	size?: Size;
	light?: boolean;
	fullwidth?: boolean;
	outline?: boolean;
	inverted?: boolean;
	rounded?: boolean;
	hovered?: boolean;
	focused?: boolean;
	actived?: boolean;
	loading?: boolean;
	disabled?: boolean;
}

interface BaseProp {
	class: string | undefined;
	disabled: boolean;
}

const generateAttr = <T extends ButtonAttr>(attr: T): BaseProp => {
	const klass = pickKlass([
			fmapIsKlass(attr.color),
			fmapIsKlass(attr.size),
			selectKlassWhen(attr.light, prependIs("light")),
			selectKlassWhen(attr.fullwidth, prependIs("fullwidth")),
			selectKlassWhen(attr.inverted, prependIs("inverted")),
			selectKlassWhen(attr.rounded, prependIs("rounded")),
			selectKlassWhen(attr.hovered, prependIs("hovered")),
			selectKlassWhen(attr.focused, prependIs("focused")),
			selectKlassWhen(attr.actived, prependIs("actived")),
			selectKlassWhen(attr.loading, prependIs("loading"))
		]);

		const disabled = Maybe.fromNullable(attr.disabled)
			.orDefault(false);

	return { class: klass, disabled };
};

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const baseProp = generateAttr(attrs);
		return m("button", baseProp, children);
	}
};

export interface LinkButtonAttr extends ButtonAttr {
	href: string;
}

export const LinkButton: m.Component<LinkButtonAttr> = {
	view: ({ attrs, children }) => {
		const baseProp = generateAttr(attrs);

		const prop = {
			...baseProp,
			href: attrs.href
		}
		return m("a", prop, children);
	}
};

export interface NaviButtonAttr extends ButtonAttr {
	to: string;
}

export const NaviButton: m.Component<LinkButtonAttr> = {
	view: ({ attrs, children }) => {
		const baseProp = generateAttr(attrs);
		const prop = {
			...baseProp,
			href: `#!{attrs.to}`
		};
		return m("a", prop, children);
	}
};
