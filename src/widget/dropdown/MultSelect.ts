import * as m from "mithril";
import { IORef } from "../../data/ref";
import { DropdownFrame, DropdownMenuFrame, DropdownMenuFrameAttr } from "../../element/dropdown";
import { Just, Maybe, NonEmptyList } from "purify-ts";
import { compareEq } from "../../internal/function";

interface TextAttr<T> {
	value: Array<T>;
	placeholder: Maybe<string>;
	renderText: (value: T) => m.Children;
	connectRemove: (index: number) => void;
}

const Text = <T>(): m.Component<TextAttr<T>> => ({
	view: ({ attrs }) =>
		NonEmptyList.fromArray(attrs.value)
			.caseOf({
				Just: xs => m.fragment({}, xs.map((x, i) => {
					const onRemove = () => attrs.connectRemove(i);
					return m("div.ui.label.transition.visible", [
						attrs.renderText(x),
						m("i.icon.delete", { onclick: onRemove })
					]);
				})),
				Nothing: () =>
					m("div.default.text", attrs.placeholder.extract())
			})
});

export interface MultSelectAttr<T> {
	value?: Array<T>;
	itemList?: Array<T>;
	placeholder?: string;
	eq?: (value: T, item: T) => boolean;
	renderText?: (value: T) => m.Children;
	renderItem?: (item: T) => m.Children;
	connectChange?: (value: Array<T>) => void;
}

export const MultSelect = <T>(): m.Component<MultSelectAttr<T>> => {
	const stateRef = new IORef<boolean>(false);

	return {
		view: ({ attrs }) => {
			const mvalue = Maybe.fromNullable(attrs.value);
			const mchange = Maybe.fromNullable(attrs.connectChange);

			const textAttr: TextAttr<T> = {
				value: mvalue.orDefault([]),
				placeholder: Maybe.fromNullable(attrs.placeholder),
				renderText: attrs.renderText ?? String,
				connectRemove: index => {
					mvalue.map(xs => xs.filter((_, i) => i !== index))
						.ap(mchange)
				}
			};

			const compareItem = attrs.eq ?? compareEq;
			const submenuItemList = (attrs.itemList ?? []).filter(item => {
				return mvalue.map(value => !value.some(x => compareItem(x, item)))
					.orDefault(true);
			});
			const menuAttr: DropdownMenuFrameAttr<T> = {
				value: stateRef,
				itemList: submenuItemList,
				renderItem: attrs.renderItem ?? String,
				el: "div.ui.menu.selection.transition.visible",
				connectClick: item => {
					mchange.ifJust(f => {
						const v = mvalue.map(xs => [...xs, item])
							.orDefault([item]);
						f(v);
					});
				}
			};

			const onremove = () => mchange.ifJust(f => f([]));

			return m(DropdownFrame, { value: stateRef, klass: Just("multiple") }, [
				m("i.icon.dropdown"),
				m("i.icon.remove", { onclick: onremove }),
				m<TextAttr<T>, {}>(Text, textAttr),
				m<DropdownMenuFrameAttr<T>, {}>(DropdownMenuFrame, menuAttr)
			]);
		}
	};
};
