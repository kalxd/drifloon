import * as m from "mithril";
import { Just, Maybe } from "purify-ts";
import { isNotEmpty } from "../data/validate";
import { BindValue, bindValue } from "../data/internal/value";

export interface PlainInputAttr extends BindValue<string> {
	placeholder?: string;
	type?: string;
	connectEnter?: () => void;
}

export const PlainInput: m.Component<PlainInputAttr> = {
	view: ({ attrs }) => {
		const mbindValue = bindValue(attrs);
		const menter = Maybe.fromNullable(attrs.connectEnter);

		const attr = {
			value: mbindValue.value.extract(),
			placeholder: attrs.placeholder,
			type: attrs.type,
			oninput: (e: InputEvent) => {
				const value = (e.target as HTMLInputElement).value.trim();
				mbindValue.connectChange(value);
			},
			onkeydown: (e: KeyboardEvent & InputEvent) => {
				const code = e.code;
				if (code === "Enter") {
					menter.ifJust(f => f());
				}
			}
		};
		return m("input", attr);
	}
};

export interface MPlainInputAttr {
	value?: Maybe<string>;
	placeholder?: string;
	type: string;
	connectChange?: (input: Maybe<string>) => void;
	connectEnter?: () => void;
}

export const MPlainInput: m.Component<MPlainInputAttr> = {
	view: ({ attrs }) => {
		const mchange = Maybe.fromNullable(attrs.connectChange);
		const attr: PlainInputAttr = {
			value: Maybe.fromNullable(attrs.value).join().extract(),
			placeholder: attrs.placeholder,
			type: attrs.type,
			connectChange: input =>
				Just(isNotEmpty(input).toMaybe()).ap(mchange),
			connectEnter: attrs.connectEnter
		};

		return m<PlainInputAttr, {}>(PlainInput, attr);
	}
};
