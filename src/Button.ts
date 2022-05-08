import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "./prelude/Attr";
import { Maybe } from "purify-ts";
import { Align, Color, Size } from "./Type";

/**
 * 最基本的按钮属性。
 */
export interface ButtonAttr {
	color?: Color;
	size?: Size;
	light?: boolean;
	fullwidth?: boolean;
	outline?: boolean;
	invert?: boolean;
	round?: boolean;
	hover?: boolean;
	focus?: boolean;
	active?: boolean;
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
		selectKlassWhen(attr.outline, prependIs("outlined")),
		selectKlassWhen(attr.invert, prependIs("inverted")),
		selectKlassWhen(attr.round, prependIs("rounded")),
		selectKlassWhen(attr.hover, prependIs("hovered")),
		selectKlassWhen(attr.focus, prependIs("focused")),
		selectKlassWhen(attr.active, prependIs("actived")),
		selectKlassWhen(attr.loading, prependIs("loading"))
	]);

	const disabled = Maybe.fromNullable(attr.disabled)
		.orDefault(false);

	return { class: klass, disabled };
};

export const Button: m.Component<ButtonAttr> = {
	view: ({ attrs, children }) => {
		const baseProp = generateAttr(attrs);
		return m("button.button", baseProp, children);
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
		return m("a.button", prop, children);
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
		return m("a.button", prop, children);
	}
};

export interface ButtonGroupAttr {
	addons?: boolean;
	align?: Align;
}

export const ButtonGroup: m.Component<ButtonGroupAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlassWhen(attrs.addons, "has-addons"),
			fmapIsKlass(attrs.align)
		]);

		return m("div.buttons", { class: klass }, children);
	}
};
