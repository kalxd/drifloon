import * as m from "mithril";
import { Maybe, NonEmptyList } from "purify-ts";
import { compareEq } from "../../data/internal/function";
import { mutable } from "../../data";
import { Outter, OutterAttr } from "../../abstract/outter";
import { AnimateFrame } from "../../abstract/animate";
import { pickKlass, selectKlass } from "../../data/internal/attr";
import { bindValue, BindValue } from "../../data/internal/value";

interface TextAttr<T> {
	value: Array<T>;
	placeholder?: string;
	renderText: (value: T) => m.Children;
	connectRemove: (index: number) => void;
}

const Text = <T>(): m.Component<TextAttr<T>> => ({
	view: ({ attrs }) =>
		NonEmptyList.fromArray(attrs.value)
			.caseOf({
				Just: xs => m.fragment({}, xs.map((x, i) => {
					const f = (e: MouseEvent) => {
						attrs.connectRemove(i);
						e.stopPropagation();
					};

					return m("div.ui.label.transition.visible", [
						attrs.renderText(x),
						m("i.icon.delete", { onclick: f })
					]);
				})),
				Nothing: () =>
					m("div.default.text", attrs.placeholder)
			})
});

interface MultiSelectMenuAttr<T> {
	itemList: Array<T>;
	renderItem: (item: T) => m.Children;
	connectClickItem: (item: T) => void;
}

const MultiSelectMenu = <T>(): m.Component<MultiSelectMenuAttr<T>> => ({
	view: ({ attrs }) => {
		const v: m.Children = (xs => {
			if (xs.length === 0) {
				return m("div.message", [
					m("i.icon.dizzy"),
					"无数据"
				]);
			}
			else {
				return xs.map(item => {
					const f = (e: MouseEvent) => {
						attrs.connectClickItem(item);
						e.stopPropagation();
					};

					return m("div.item", { onclick: f }, attrs.renderItem(item));
				});
			}
		})(attrs.itemList);

		return m(
			AnimateFrame,
			{ el: "div.menu.transition.visible"},
			v
		);
	}
});

export interface MultiSelectAttr<T> extends BindValue<Array<T>> {
	itemList?: Array<T>;
	placeholder?: string;
	compareEq?: (value: T, item: T) => boolean;
	renderText?: (value: T) => m.Children;
	renderItem?: (item: T) => m.Children;
	isFluid?: boolean;
}

export const MultiSelect = <T>(): m.Component<MultiSelectAttr<T>> => {
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
			const mbindvalue = bindValue(attrs);

			const dropdownAttr: m.Attributes = {
				class: pickKlass([
					selectKlass("active", state.get()),
					selectKlass("fluid", attrs.isFluid)
				]),
				onclick: toggleE
			};

			const textAttr: TextAttr<T> = {
				value: mbindvalue.value.orDefault([]),
				placeholder: attrs.placeholder,
				renderText: attrs.renderText ?? String,
				connectRemove: index => {
					mbindvalue.value.map(xs => xs.filter((_, i) => i !== index))
						.ifJust(mbindvalue.connectChange);
					state.set(true);
				}
			};

			const compareItem = attrs.compareEq ?? compareEq;
			const dropmenu = Maybe.of(attrs.itemList ?? [])
				.filter(state.get)
				.map(xs => {
					const submenuItemList = xs.filter(item => {
						return mbindvalue.value.map(value => !value.some(x => compareItem(x, item)))
							.orDefault(true);
					});

					const menuAttr: MultiSelectMenuAttr<T> = {
						itemList: submenuItemList,
						renderItem: attrs.renderItem ?? String,
						connectClickItem: item => {
							mbindvalue.value.map(xs => ([...xs, item]))
								.ifJust(mbindvalue.connectChange);
						}
					};
					return m<MultiSelectMenuAttr<T>, {}>(MultiSelectMenu, menuAttr);
				});

			return m(Outter, outterAttr, [
				m("div.ui.clearable.multiple.selection.dropdown", dropdownAttr, [
					m("i.icon.dropdown"),
					m<TextAttr<T>, {}>(Text, textAttr),
					dropmenu.extract()
				])
			]);
		}
	};
};
