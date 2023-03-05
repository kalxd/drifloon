import * as m from "mithril";
import { identity, Just, Maybe, Nothing } from "purify-ts";
import { IORef } from "./data/ref";
import { Dropdown } from "./widget/dropdown";
import { AnimateFrame } from "./widget/animate";
import { SelectText, SelectTextAttr, MSelectLabels, MSelectLabelsAttr } from "./element/dropdown";
import { cmpDef } from "./internal/attr";

export interface SelectAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	items?: Array<T>,
	onselect?: (item: Maybe<T>) => void;
	renderItem?: (item: T) => m.Children
	renderText?: (item: T) => m.Children
}

/**
 * 单选项。
 */
export const Select = <T>(init: m.Vnode<SelectAttr<T>>): m.Component<SelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);
	const closeE = () => stateRef.put(false);
	const clearValueE = (e: MouseEvent) => {
		const f = init.attrs.onselect ?? identity;
		f(Nothing);
		closeE();
		e.stopPropagation();
	};

	return {
		view: ({ attrs }) => {
			const renderItem = attrs.renderItem ?? String;
			const renderText = attrs.renderText ?? String;
			const onselect = attrs.onselect ?? identity;

			const textAttr: SelectTextAttr<T> = {
				text: attrs.value,
				placeholder: attrs.placeholder,
				renderText
			};

			const isVisible = stateRef.ask();

			const menu = Maybe.fromFalsy(isVisible)
				.map(_ => m(
					AnimateFrame,
					{ class: "menu transition visible"},
					(attrs.items ?? []).map(x => {
						const f = (e: MouseEvent) => {
							onselect(Just(x));
							closeE();
							e.stopPropagation();
						};
						return m("div.item", { onclick: f }, renderItem(x))
					})
				))
				.extractNullable();

			return m(Dropdown, { value: stateRef }, [
				m("i.dropdown.icon"),
				m("i.remove.icon", { onclick: clearValueE }),
				m<SelectTextAttr<T>, {}>(SelectText, textAttr),
				menu
			]);
		}
	};
};


export interface MSelectAttr<T> {
	value?: Maybe<Array<T>>;
	items?: Array<T>;
	placeholder?: string;
	cmp?: (lhs: T, rhs: T) => boolean;
	onChange?: (item: Maybe<Array<T>>) => void;
	renderLabel?: (item: T) => m.Children;
	renderItem?: (item: T) => m.Children;
}

/**
 * 多选项。
 */
export const MSelect = <T>(
	{ attrs }: m.Vnode<MSelectAttr<T>>
): m.Component<MSelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);
	const renderItem = attrs.renderItem ?? String;
	const cmp = attrs.cmp ?? cmpDef;
	const changeE = attrs.onChange ?? identity;
	const removeAllE = (e: MouseEvent) => {
		changeE(Nothing);
		e.stopPropagation();
	};

	return {
		view: ({ attrs }) => {
			const value = Maybe.fromNullable(attrs.value).join();
			console.log(value);

			const labelAttr: MSelectLabelsAttr<T> = {
				value,
				placeholder: attrs.placeholder,
				renderLabel: attrs.renderLabel,
				onRemove: (_: T, index: number) => {
					const v = value.map(xs => xs.filter((_, i) => i !== index));
					changeE(v);
				}
			};

			const menu = stateRef.asks(Maybe.fromFalsy)
				.map(_ => {
					return (attrs.items ?? [])
						.filter(item => value.map(vs => !vs.some(v => cmp(v, item))).orDefault(true))
						.map(item => {
							const f = (e: MouseEvent) => {
								const v = value.map(vs => [...vs, item])
									.alt(Just([item]));
								changeE(v);
								e.stopPropagation();
							};

							return m("div.item", { onclick: f }, renderItem(item));
						});
				})
				.map(subitems => m(
					AnimateFrame,
					{ class: "menu transition visible" },
					subitems
				));

			return m(Dropdown, { value: stateRef, class: "multiple" }, [
				m("i.dropdown.icon"),
				m("i.remove.icon", { onclick: removeAllE }),
				m<MSelectLabelsAttr<T>, {}>(MSelectLabels, labelAttr),
				menu.extract()
			]);
		}
	};
};
