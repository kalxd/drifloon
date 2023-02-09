import { Align, AttachPosition, Color, Float, Size, StateLevel } from "../data/var";
import * as m from "mithril";
import { pickKlass } from "../internal/attr";
import { Maybe } from "purify-ts";

export interface MessageAttr {
	align?: Align;
	attach?: AttachPosition;
	float?: Float;
	color?: Color;
	size?: Size;
	state?: StateLevel;
}

export const Message: m.Component<MessageAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.align),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.float),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.state)
		]);

		return m("div.ui.message", { class: klass }, children);
	}
};
