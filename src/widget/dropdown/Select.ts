import * as m from "mithril";
import { IORef } from "../../data/ref";
import { DropdownFrame, DropdownMenuFrame, DropdownMenuFrameAttr, SelectText, SelectTextAttr } from "../../element/dropdown";
import { Just, Maybe, Nothing } from "purify-ts";

export interface SelectAttr<T> {
	value?: Maybe<T>;
	placeholder?: string;
	itemList?: Array<T>;
	renderItem?: (item: T) => m.Children;
	renderText?: (item: T) => m.Children;
	connectChange?: (item: Maybe<T>) => void;
}

export const Select = <T>(): m.Component<SelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const textAttr: SelectTextAttr<T> = {
				text: Maybe.fromNullable(attrs.value).join(),
				placeholder: Maybe.fromNullable(attrs.placeholder),
				renderText: attrs.renderText ?? String
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
};
