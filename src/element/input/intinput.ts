import { Color, Size } from "../../data/var";
import * as m from "mithril";
import { tryParseInt } from "../../data/validate";
import { callbackWhen } from "../../data/fn";

interface BaseInputAttr {
	value: number;
	isOverflow: (value: number, nextValue: number) => boolean;
	iconType: string;
	connectClick: (value: number) => void;
	color?: Color;
}

const BaseInput: m.Component<BaseInputAttr> = {
	view: () => {
		m("div.ui.button")
	}
};

export interface IntInputAttr {
	value?: number;
	connectChange?: (value: number) => void;
	step?: number;
	max?: number;
	min?: number;
	isFluid?: boolean;
	size?: Size;
	color?: Color;
	placeholder?: string;
}

export const IntInput: m.Component<IntInputAttr> = {
	view: ({ attrs }) => {
		const value = attrs.value ?? attrs.min ?? attrs.max ?? 0;
		const min = attrs.min ?? -Infinity;
		const max = attrs.max ?? Infinity;

		const onchange = (e: MouseEvent): void =>
			callbackWhen(attrs.connectChange, callback => {
				const nextValue = tryParseInt((e.target as HTMLInputElement).value.trim())
					.toMaybe()
					.orDefault(value);
				callback(nextValue);
			});

		const inputProp = {
			value,
			onchange,
			placeholder: attrs.placeholder
		};

		return m("div.ui.action.input", [
			m("button.ui.icon.button", [
				m("i.minus.icon")
			]),
			m("input", inputProp),
			m("button.ui.icon.button", [
				m("i.plus.icon")
			])
		]);
	}
};
