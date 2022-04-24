import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "prelude/attr";
import { Maybe } from "purify-ts";
import { Color, Size } from "Type";

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

export const Button: m.Component<ButtonAttr> = ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.color),
			fmapIsKlass(attrs.size),
			selectKlassWhen(attrs.light, prependIs("light")),
			selectKlassWhen(attrs.fullwidth, prependIs("fullwidth")),
			selectKlassWhen(attrs.inverted, prependIs("inverted")),
			selectKlassWhen(attrs.rounded, prependIs("rounded")),
			selectKlassWhen(attrs.hovered, prependIs("hovered")),
			selectKlassWhen(attrs.focused, prependIs("focused")),
			selectKlassWhen(attrs.actived, prependIs("actived")),
			selectKlassWhen(attrs.loading, prependIs("loading"))
		]);

		const disabled = Maybe.fromNullable(attrs.disabled)
			.orDefault(false);

		return m("button", { klass, disabled }, children);
	}
});
