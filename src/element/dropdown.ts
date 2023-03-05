import * as m from "mithril";
import { identity, Maybe } from "purify-ts";

export interface SelectTextAttr<T> {
	text?: Maybe<T>;
	placeholder?: string;
	renderText: (item: T) => m.Children;
}

export const SelectText = <T>(): m.Component<SelectTextAttr<T>> => ({
	view: ({ attrs }) => Maybe.fromNullable(attrs.text)
		.join()
		.caseOf({
			Just: value =>
				m("div.text", attrs.renderText(value)),
			Nothing: () =>
				m("div.default.text", attrs.placeholder)
		})
});

export interface MSelectLabelsAttr<T> {
	value: Maybe<Array<T>>;
	placeholder?: string;
	renderLabel?: (item: T) => m.Children;
	onRemove: (item: T, index: number) => void;
}

export const MSelectLabels = <T>(
	init: m.Vnode<MSelectLabelsAttr<T>>
): m.Component<MSelectLabelsAttr<T>> => {
	const renderLabel = init.attrs.renderLabel ?? String;
	const stopE = (e: MouseEvent) => e.stopPropagation();

	return {
		view: ({ attrs }) => attrs.value
			.caseOf({
				Just: xs => {
					const labels = xs.map((x, index) => {
						const removeE = (e: MouseEvent) => {
							const f = attrs.onRemove ?? identity;
							e.stopPropagation();
							f(x, index);
						};

						return m("a.ui.label.transition.visible", { onclick: stopE }, [
							renderLabel(x),
							m("i.delete.icon", { onclick: removeE }),
						]);
					});
					return m.fragment({}, labels);
				},
				Nothing: () => m("div.default.text", attrs.placeholder)
			})
	};
};
