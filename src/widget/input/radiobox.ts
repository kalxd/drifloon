import { cmpDef } from "../../data/internal/attr";
import * as m from "mithril";
import { Just, Maybe } from "purify-ts";

interface SingleRadioboxAttr<T> {
	value: T;
	isCheck: boolean;
	connectChange: Maybe<(value: T) => void>;
}

const SingleRadiobox = <T>(): m.Component<SingleRadioboxAttr<T>> => ({
	view: ({ attrs, children }) => {
		const klass = attrs.isCheck ? "checked" : undefined;

		const f = () => Just(attrs.value).ap(attrs.connectChange);

		return m("div.ui.radio.checkbox", { class: klass, onclick: f }, [
			m("input.hidden[type=radio]", { checked: attrs.isCheck }),
			m("label", children)
		]);
	}
});

export interface RadioboxAttr<T> {
	value?: T;
	itemList?: Array<T>;
	compare?: (value: T, item: T) => boolean;
	renderItem?: (item: T) => string;
	connectChange?: (result: T) => void;
}

export const Radiobox = <T>(): m.Component<RadioboxAttr<T>> => ({
	view: ({ attrs }) => {
		const valuemvalue = Maybe.fromNullable(attrs.value);
		const mchangeE = Maybe.fromNullable(attrs.connectChange);
		const items = attrs.itemList ?? [];
		const renderItem = attrs.renderItem ?? String;
		const compare = attrs.compare ?? cmpDef;

		return items.map(item => {
			const isCheck = valuemvalue.map(v => compare(v, item))
				.orDefault(false);

			const attr: SingleRadioboxAttr<T> = {
				value: item,
				isCheck,
				connectChange: mchangeE
			};

			return m<SingleRadioboxAttr<T>, {}>(SingleRadiobox, attr, renderItem(item))
		});
	}
});
