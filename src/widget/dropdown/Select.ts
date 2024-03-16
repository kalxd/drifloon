import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import { AnimateFrame } from "../../abstract/animate";
import { Outter, OutterAttr } from "../../abstract/outter";
import { mutable } from "../../data";
import { pickKlass, selectKlass } from "../../data/internal/attr";

interface SelectMenuAttr<T> {
	itemList: Array<T>;
	renderItem: (item: T) => m.Children;
	connectSelect: (item: T) => void;
}

const SelectMenu = <T>(): m.Component<SelectMenuAttr<T>> => ({
	view: ({ attrs }) => {
		const itemList = attrs.itemList.map(item => {
			const f = () => attrs.connectSelect(item);
			return m("div.item", { onclick: f }, attrs.renderItem(item))
		});

		if (itemList.length === 0) {
			return m(
				AnimateFrame,
				{ el: "div.menu.transition.visible" },
				m("div.message", [
					m("i.icon.dizzy"),
					"暂无数据"
				])
			);
		}
		else {
			return m(
				AnimateFrame,
				{ el: "div.menu.transition.visible" },
				itemList
			);
		}
	}
});

export interface SelectAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => string;
	connectChange?: (item: Maybe<T>) => void;
	isShowRemoveIcon?: boolean;
}

export const Select = <T>(): m.Component<SelectAttr<T>> => {
	const state = mutable<boolean>(false);

	const outterAttr: OutterAttr = {
		connectOutterClick: () => state.set(false)
	};

	const toggleE = () => {
		const v = state.get();
		state.set(!v);
	};

	return {
		view: ({ attrs }) => {
			const mchangeE = Maybe.fromNullable(attrs.connectChange);

			const dropdownAttr: m.Attributes = {
				class: pickKlass([
					selectKlass("active", state.get())
				]),
				onclick: toggleE
			};

			const textBox = Maybe.fromNullable(attrs.value)
				.join()
				.caseOf({
					Just: t => {
						const render = attrs.renderText ?? String;
						return m("div.text", render(t));
					},
					Nothing: () => m("div.default.text", attrs.placeholder)
				});

			const removeIcon = Maybe.fromFalsy(attrs.isShowRemoveIcon ?? true)
				.map(_ => {
					const f = (e: MouseEvent) => {
						mchangeE.ifJust(f => f(Nothing));
						e.stopPropagation();
					};
					return m("i.icon.remove", { onclick: f });
				});

			const dropdownMenu = Maybe.of(attrs.itemList ?? [])
				.filter(state.get)
				.map(itemList => {
					const menuAttr: SelectMenuAttr<T> = {
						itemList,
						renderItem: attrs.renderItem ?? String,
						connectSelect: item => mchangeE.ifJust(f => f(Just(item)))
					};

					return m<SelectMenuAttr<T>, {}>(SelectMenu, menuAttr);
				})

			return m(Outter, outterAttr, [
				m("div.ui.selection.dropdown", dropdownAttr, [
					textBox,
					m("i.icon.dropdown"),
					removeIcon.extract(),
					dropdownMenu.extract()
				])
			]);
		}
	};
};
