import * as m from "mithril";
/*
import {
	DropdownFrame,
	DropdownMenuFrame,
	DropdownMenuFrameAttr,
	SelectText,
	SelectTextAttr
	} from "../../element/dropdown";
*/
import { Just, Maybe, Nothing } from "purify-ts";
import { Outter, OutterAttr } from "../../abstract/outter";
import { mutable } from "../../data";
import { pickKlass, selectKlass } from "../../data/internal/attr";

interface SelectMenuAttr {}

const SelectMenu: m.Component<SelectMenuAttr> = {
	view: () => {}
};

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
	/*
	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const textAttr: SelectTextAttr<T> = {
				text: Maybe.fromNullable(attrs.value).join().extract(),
				placeholder: attrs.placeholder,
				renderText: attrs.renderText
			};

			const mchange = Maybe.fromNullable(attrs.connectChange);

			const connectRemove = () => {
				mchange.ifJust(f => f(Nothing));
			};

			const menuAttr: DropdownMenuFrameAttr<T> = {
				value: stateRef,
				itemList: attrs.itemList ?? [],
				renderItem: attrs.renderItem ?? String,
				el: "div.ui.menu.selection.transition.visible",
				connectClick: item => {
					stateRef.put(false);
					Just(Just(item)).ap(mchange)
				}
			};

			return m(DropdownFrame, { value: stateRef, klass: Nothing }, [
				m("i.icon.dropdown"),
				m("i.icon.remove", { onclick: connectRemove }),
				m<SelectTextAttr<T>, {}>(SelectText, textAttr),
				m<DropdownMenuFrameAttr<T>, {}>(DropdownMenuFrame, menuAttr)
			]);
		}
		};
	*/

	const state = mutable<boolean>(false);

	const outterAttr: OutterAttr = {
		connectOutterClick: () => state.set(false)
	};

	const toggleE = (e: MouseEvent) => {
		const v = state.get();
		state.set(!v);
		e.stopPropagation();
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

			const removeIcon = Maybe.fromFalsy(attrs.isShowRemoveIcon ?? true)
				.map(_ => {
					const f = () => mchangeE.ifJust(f => f(Nothing));
					return m("i.icon.remove", { onclick: f });
				});

			return m(Outter, outterAttr, [
				m("div.ui.selection.dropdown", dropdownAttr, [
					m("div.text.default", "请选择一个选项"),
					m("i.icon.dropdown", { onclick: toggleE }),
					removeIcon.extract()
				])
			]);
		}
	};
};
