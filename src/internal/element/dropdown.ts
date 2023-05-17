import * as m from "mithril";
import { Maybe } from "purify-ts";
import { IORef } from "../../data/ref";
import { Outter, OutterAttr } from "../../abstract/outter";
import { pickKlass, selectKlass } from "../attr";

export interface SelectTextAttr<T> {
	text: Maybe<T>;
	placeholder: Maybe<string>;
	renderText: (item: T) => m.Children;
}

/**
 * 下拉菜单选项提示。
 */
export const SelectText = <T>(): m.Component<SelectTextAttr<T>> => ({
	view: ({ attrs }) => attrs.text
		.caseOf({
			Just: text =>
				m("div.text", attrs.renderText(text)),
			Nothing: () =>
				m("div.default.text", attrs.placeholder.extract())
		})
});

export interface DropdownFrameAttr {
	value: IORef<boolean>;
	class: Maybe<string>;
}

export const DropdownFrame: m.Component<DropdownFrameAttr> = {
	view: ({ attrs, children }) => {
		const outterAttr: OutterAttr = {
			connectOutterClick: () => attrs.value.put(false)
		};

		const prop = {
			class: pickKlass([
				selectKlass("active", attrs.value.ask()),
				attrs.class
			]),
			onclick: () => attrs.value.update(b => !b)
		};

		return m(
			Outter,
			outterAttr,
			m("div.ui.selection.dropdown", prop, children)
		);
	}
};
