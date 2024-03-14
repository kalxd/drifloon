import * as m from "mithril";
import { Just, Maybe, NonEmptyList } from "purify-ts";
import { IORef } from "../data/ref";
import { Outter, OutterAttr } from "../abstract/outter";
import { pickKlass, selectKlass } from "../data/internal/attr";
import { AnimateFrame } from "../abstract/animate";

export interface SelectTextAttr {
	text?: string;
	placeholder?: string;
	connectClick?: () => void;
}

export const SelectText: m.Component<SelectTextAttr> = {
	view: ({ attrs }) => {
		const mclickE = Maybe.fromNullable(attrs.connectClick);
		const textClick = () => mclickE.ifJust(f => f());

		return Maybe.fromNullable(attrs.text)
			.caseOf({
				Just: text =>
					m("div.text", { onclick: textClick }, text),
				Nothing: () =>
					m("div.default.text", { onclick: textClick }, attrs.placeholder)
			});
	}
};

export interface DropdownFrameAttr {
	value: IORef<boolean>;
	klass: Maybe<string>;
}

export const DropdownFrame: m.FactoryComponent<DropdownFrameAttr> = _ => {
	const toggleNodeList = new IORef<Array<Maybe<Element>>>([]);

	const updateToggle = (dom: Element): void => {
		toggleNodeList.put([
			Just(dom),
			Maybe.fromNullable(dom.querySelector(".icon.dropdown")),
			Maybe.fromNullable(dom.querySelector("input")),
			Maybe.fromNullable(dom.querySelector("div.text"))
		]);
	};

	return {
		oncreate: vnode => updateToggle(vnode.dom),
		onupdate: vnode => updateToggle(vnode.dom),

		view: ({ attrs, children }) => {
			const outterAttr: OutterAttr = {
				connectOutterClick: () => attrs.value.put(false)
			};

			const prop = {
				class: pickKlass([
					selectKlass("active", attrs.value.ask()),
					attrs.klass
				]),
				onclick: (e: MouseEvent) => {
					const clickEl = e.target as HTMLElement;
					const isContains = toggleNodeList.asks(Maybe.catMaybes)
						.some(el => el === clickEl);

					if (isContains) {
						e.stopPropagation();
						attrs.value.update(b => !b);
					}
				}
			};

			return m(
				Outter,
				outterAttr,
				m("div.ui.selection.dropdown", prop, children)
			);
		}
	};
};

export interface DropdownMenuFrameAttr<T> {
	value?: IORef<boolean>;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	connectClick?: (item: T) => void;
	el?: string;
}

export const DropdownMenuFrame = <T>(): m.Component<DropdownMenuFrameAttr<T>> => ({
	view: ({ attrs }) => {
		if (!attrs.value?.ask()) {
			return null;
		}

		const render = attrs.renderItem ?? String;
		const mclick = Maybe.fromNullable(attrs.connectClick);

		return NonEmptyList.fromArray(attrs.itemList ?? [])
			.map(itemList => itemList.map(item => {
				const onclick = () => Just(item).ap(mclick);

				return m("div.item", { onclick }, render(item));
			}))
			.caseOf({
				Just: dom => m(AnimateFrame, { el: attrs.el }, dom),
				Nothing: () => m(
					AnimateFrame,
					{ el: attrs.el },
					m("div.message", "无数据")
				)
			});
	}
});
