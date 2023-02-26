import { pickKlass, selectKlass } from "../internal/attr";
import * as m from "mithril";
import { identity, Maybe } from "purify-ts";
import { Align, AttachPosition, StateLevel, Color, Size } from "../data/var";

export interface MessageAttr {
	align?: Align;
	isCompact?: boolean;
	attach?: AttachPosition;
	state?: StateLevel;
	color?: Color;
	size?: Size;
	isClosable?: boolean;
	onclose?: () => void;
}

export const Message: m.Component<MessageAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.align),
			selectKlass("compact", attrs.isCompact),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.state),
			Maybe.fromNullable(attrs.color),
			Maybe.fromNullable(attrs.size)
		]);

		const closeIcon = Maybe.fromFalsy(attrs.isClosable)
			.filter(identity)
			.map(_ => {
				const f = attrs.onclose ?? identity;
				return m("i.icon.close", { onclose: f });
			})
			.extract();

		return m("div.ui.message", { class: klass }, [
			closeIcon,
			children
		]);
	}
};
