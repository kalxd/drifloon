import { Color, Size } from "../../data/var";
import * as m from "mithril";
import { tryParseInt } from "../../data/validate";
import { Button, ButtonAttr, ButtonStyle, IconStyle } from "../../element/button";
import { applyFn, fmap } from "../../internal/function";

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

const iconButtonBaseAttr: ButtonAttr = {
	style: ButtonStyle.Basic,
	iconStyle: IconStyle.Icon
};

interface AskValue {
	value: number;
	min: number;
	max: number;
}

/**
 * @throws Error
 * value不在[min, max]区间。
 *
 * @throws Error
 * min > max
 */
const askValue = (attr: IntInputAttr): AskValue => {
	const min = attr.min ?? -Infinity;
	const max = attr.max ?? Infinity;
	const value = attr.value ?? attr.min ?? attr.max ?? 0;

	if (value < min || value > max) {
		throw new Error(`[IntInput] value(${value})不在[${min}, ${max}]！`);
	}

	if (min > max) {
		throw new Error(`[IntInput] min(${min}) > max(${max})`);
	}

	return {
		value,
		min,
		max
	};
};


export const IntInput = ({ attrs }: m.Vnode<IntInputAttr>): m.Component<IntInputAttr> => {
	const { value: initValue } = askValue(attrs);

	return {
		view: ({ attrs }) => {
			const { value, min, max } = askValue(attrs);
			const step = attrs.step ?? 1;

			const onchange = (e: MouseEvent): void => {
				fmap(f => {
					const nextValue = tryParseInt((e.target as HTMLInputElement).value.trim())
						.toMaybe()
						.orDefault(value);
					f(nextValue);

				}, attrs.connectChange);
			};

			const inputProp = {
				value,
				onchange,
				placeholder: attrs.placeholder
			};

			const buttonAttr: ButtonAttr = {
				...iconButtonBaseAttr,
				color: attrs.color
			};

			const minAttr: ButtonAttr = {
				...buttonAttr,
				connectClick: () => applyFn(attrs.connectChange, min)
			};

			const resetAttr: ButtonAttr = {
				...buttonAttr,
				connectClick: () => applyFn(attrs.connectChange, initValue)
			};

			const minusAttr: ButtonAttr = {
				...buttonAttr,
				connectClick: () => applyFn(
					attrs.connectChange,
					Math.max(min, value - step)
				)
			};

			const plusAttr: ButtonAttr = {
				...buttonAttr,
				connectClick: () => applyFn(
					attrs.connectChange,
					Math.min(max, value + step)
				)
			};

			const maxAttr: ButtonAttr = {
				...buttonAttr,
				connectClick: () => applyFn(attrs.connectChange, max)
			};

			return m("div.ui.action.input", [
				m("input", inputProp),
				m(Button, minAttr, [
					m("i.icon.double.angle.left")
				]),
				m(Button, minusAttr, [
					m("i.icon.angle.left")
				]),
				m(Button, resetAttr, [
					m("i.icon.circle.outline")
				]),
				m(Button, plusAttr, [
					m("i.icon.angle.right")
				]),
				m(Button, maxAttr, [
					m("i.icon.double.angle.right")
				])
			]);
		}
	};
};
