import * as m from "mithril";
import { DropdownFrame, DropdownMenuFrame, DropdownMenuFrameAttr } from "../../element/dropdown";
import { IORef } from "../../data/ref";
import { Just, Maybe } from "purify-ts";
import { compareEq } from "../../internal/function";

export interface CompleteInputAttr<T> {
	value?: string;
	placeholder?: string;
	completeList?: Array<T>;
	eq?: (value: string, item: T) => boolean;
	renderItem?: (item: T) => string;
	connectChange?: (value: string) => void;
}

export const CompleteInput = <T>(): m.Component<CompleteInputAttr<T>> => {
	const isVisibleRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const mvalue = Maybe.fromNullable(attrs.value);
			const mchange = Maybe.fromNullable(attrs.connectChange);

			const setChange = (item: string) => {
				Just(item).ap(mchange);
			};
			const inputE = (e: KeyboardEvent) => {
				if (e.key === "Tab") {
					isVisibleRef.put(false);
					return ;
				}
				const value = (e.target as HTMLInputElement).value.trim();
				setChange(value);
			};

			const inputAttr = {
				value: attrs.value,
				placeholder: attrs.placeholder,
				class: "search",
				autocomplete: "off",
				oninput: inputE,
			};

			const itemList = attrs.completeList ?? [];
			const renderItem = attrs.renderItem ?? String;
			const cmpEq = attrs.eq ?? compareEq;

			const filterList = mvalue
				.map(value => itemList.filter(item => cmpEq(value, item)))
				.orDefault(itemList);

			const menuAttr: DropdownMenuFrameAttr<T> = {
				value: isVisibleRef,
				itemList: filterList,
				renderItem,
				el: "div.ui.menu.selection.transition.visible",
				connectClick: item => {
					const value = renderItem(item);
					setChange(value);
					isVisibleRef.put(false);
				}
			};

			return m(DropdownFrame, { value: isVisibleRef, klass: Just("search") }, [
				m("input", inputAttr),
				m<DropdownMenuFrameAttr<T>, {}>(DropdownMenuFrame, menuAttr)
			]);
		}
	}
};
