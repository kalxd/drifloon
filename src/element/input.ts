import * as m from "mithril";
import { Just, Maybe } from "purify-ts";
import { isNotEmpty } from "../data/validate";

export interface PlainInputAttr {
	value?: string;
	placeholder?: string;
	type?: string;
	connectChange?: (input: string) => void;
}

export const PlainInput: m.Component<PlainInputAttr> = {
	view: ({ attrs }) => {
		const mchange = Maybe.fromNullable(attrs.connectChange);

		const attr = {
			value: attrs.value,
			placeholder: attrs.placeholder,
			type: attrs.type,
			onchange: (e: InputEvent) => {
				const value = (e.target as HTMLInputElement).value.trim();
				Just(value).ap(mchange);
			}
		};
		return m("input", attr);
	}
};

export interface MPlainInputAttr {
	value?: string;
	placeholder?: string;
	type: string;
	connectChange?: (input: Maybe<string>) => void;
}

export const MPlainInput: m.Component<MPlainInputAttr> = {
	view: ({ attrs }) => {
		const mchange = Maybe.fromNullable(attrs.connectChange);
		const attr: PlainInputAttr = {
			value: attrs.value,
			placeholder: attrs.placeholder,
			type: attrs.type,
			connectChange: input =>
				Just(isNotEmpty(input).toMaybe()).ap(mchange)
		};

		return m<PlainInputAttr, {}>(PlainInput, attr);
	}
};
