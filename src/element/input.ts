import * as m from "mithril";
import { Maybe, Just } from "purify-ts";
import { isNotEmpty } from "../data/validate";
import { BindValue, bindValue } from "../data/internal/value";

export interface InputAttr extends BindValue<string> {
	placeholder?: string;
	type?: string;
	connectEnter?: () => void;
}

export const Input: m.Component<InputAttr> = {
	view: ({ attrs }) => {
		const mbindvalue = bindValue(attrs);
		const menter = Maybe.fromNullable(attrs.connectEnter);
		const attr = {
			placeholder: attrs.placeholder,
			type: attrs.type,
			value: mbindvalue.value.extract(),
			oninput: (e: InputEvent) => {
				const value = (e.target as HTMLInputElement).value;
				mbindvalue.connectChange(value);
			},
			onkeydown: (e: KeyboardEvent & InputEvent) => {
				const { code } = e;
				if (code === "Enter") {
					menter.ifJust(f => f());
				}
			}
		};

		return m("input", attr);
	}
};

export interface TrimInputAttr extends InputAttr {}

export const TrimInput: m.Component<TrimInputAttr> = {
	view: ({ attrs }) => {
		const mconnectChange = Maybe.fromNullable(attrs.connectChange);

		const attr: InputAttr = {
			bindValue: attrs.bindValue,
			connectChange: value => {
				const s = value.trim();
				Just(s).ap(mconnectChange);
			},
			value: attrs.value,
			type: attrs.type,
			placeholder: attrs.placeholder,
			connectEnter: attrs.connectEnter,
		};
		return m(Input, attr);
	}
};

export interface MInputAttr extends BindValue<Maybe<string>> {
	placeholder?: string;
	type: string;
	connectEnter?: () => void;
}

export const MInput: m.Component<MInputAttr> = {
	view: ({ attrs }) => {
		const mbindvalue = bindValue(attrs);
		const attr: TrimInputAttr = {
			value: mbindvalue.value.join().extract(),
			placeholder: attrs.placeholder,
			type: attrs.type,
			connectChange: input =>
				mbindvalue.connectChange(isNotEmpty(input).toMaybe()),
			connectEnter: attrs.connectEnter
		};

		return m<TrimInputAttr, {}>(TrimInput, attr);
	}
};

export interface PasswordInputAttr extends BindValue<string> {
	placeholder?: string;
	connectEnter?: () => void;
}

export const PasswordInput: m.Component<PasswordInputAttr> = {
	view: ({ attrs }) => {
		const attr: InputAttr = {
			...attrs,
			type: "password"
		};
		return m(Input, attr);
	}
};
