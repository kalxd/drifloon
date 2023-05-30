import * as m from "mithril";
import { IORef } from "../../data/ref";
import { DropdownFrame } from "../../element/dropdown";
import { Just, Maybe, NonEmptyList } from "purify-ts";

interface TextAttr<T> {
	value: Array<T>;
	placeholder: Maybe<string>;
	renderText: (value: T) => m.Children;
	connectRemove: (index: number) => void;
}

const Text = <T>(): m.Component<TextAttr<T>> => ({
	view: ({ attrs }) =>
		NonEmptyList.fromArray(attrs.value)
			.caseOf({
				Just: xs => m.fragment({}, xs.map((x, i) => {
					const onRemove = () => attrs.connectRemove(i);
					return m("div.ui.label.transition.visible", [
						attrs.renderText(x),
						m("i.icon.delete", { onclick: onRemove })
					]);
				})),
				Nothing: () =>
					m("div.default.text", attrs.placeholder.extract())
			})
});

export interface MultSelectAttr<T> {
	value?: Array<T>;
	placeholder?: string;
	renderText?: (value: T) => m.Children;
	connectChange?: (value: Array<T>) => void;
}

export const MultSelect = <T>(): m.Component<MultSelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const mvalue = Maybe.fromNullable(attrs.value);
			const mchange = Maybe.fromNullable(attrs.connectChange);

			const textAttr: TextAttr<T> = {
				value: mvalue.orDefault([]),
				placeholder: Maybe.fromNullable(attrs.placeholder),
				renderText: attrs.renderText ?? String,
				connectRemove: index => {
					mvalue.map(xs => xs.filter((_, i) => i !== index))
						.ap(mchange)
				}
			};

			return m(DropdownFrame, { value: stateRef, klass: Just("multiple") }, [
				m("i.icon.dropdown"),
				m("i.icon.remove"),
				m<TextAttr<T>, {}>(Text, textAttr)
			]);
		}
	};
};
