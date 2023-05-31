import * as m from "mithril";
import { Maybe } from "purify-ts";
import { IORef } from "../data/ref";
import { Outter, OutterAttr } from "../abstract/outter";
import { pickKlass, selectKlass } from "../internal/attr";
import { AnimateFrame } from "../abstract/animate";

export interface SelectTextAttr<T> {
	text: Maybe<T>;
	placeholder: Maybe<string>;
	renderText: (item: T) => m.Children;
}

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
	klass: Maybe<string>;
}

export const DropdownFrame: m.Component<DropdownFrameAttr> = {
	view: ({ attrs, children }) => {
		const outterAttr: OutterAttr = {
			connectOutterClick: () => attrs.value.put(false)
		};

		const prop = {
			class: pickKlass([
				selectKlass("active", attrs.value.ask()),
				attrs.klass
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

export interface DropdownMenuFrameAttr<T> {
	itemList: Array<T>;
	renderItem: (item: T) => m.Children;
	connectClick: (index: number, item: T) => void;
	el: string;
}

export const DropdownMenuFrame = <T>(): m.Component<DropdownMenuFrameAttr<T>> => ({
	view: ({ attrs }) => {
		const menuItemList = attrs.itemList.map((item, index) => {
			const onclick = () => attrs.connectClick(index, item);
			return m("div.item", { onclick }, attrs.renderItem(item));
		});

		return m(AnimateFrame, { el: attrs.el }, menuItemList);
	}
});
