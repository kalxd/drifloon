import { cmpDef } from "../../internal/attr";
import * as m from "mithril";
import { identity, Maybe } from "purify-ts";

export * from "./toggle";
export * from "./checkbox";
export * from "./intinput";
export * from "./completeinput";

interface SingleRadioboxAttr<T> {
	value: T;
	isCheck: boolean;
	onchange: (value: T) => void;
}

const SingleRadiobox = <T>(): m.Component<SingleRadioboxAttr<T>> => ({
	view: ({ attrs, children }) => {
		const klass = attrs.isCheck ? "checked" : undefined;

		const f = () => attrs.onchange(attrs.value);

		return m("div.ui.radio.checkbox", { class: klass, onclick: f }, [
			m("input.hidden[type=radio]", { checked: klass }),
			m("label", children)
		]);
	}
});

export interface RadioboxAttr<T> {
	value?: Maybe<T>;
	items?: Array<T>;
	cmp?: (value: T, item: T) => boolean;
	renderItem?: (item: T) => string;
	onchange?: (result: T) => void;
}

export const Radiobox = <T>(): m.Component<RadioboxAttr<T>> => ({
	view: ({ attrs }) => {
		const value = Maybe.fromNullable(attrs.value)
			.join();
		const items = attrs.items ?? [];
		const renderItem = attrs.renderItem ?? String;
		const cmp = attrs.cmp ?? cmpDef;
		const onchange = attrs.onchange ?? identity;

		const children = items.map(item => {
			const isCheck = value.map(v => cmp(v, item))
				.orDefault(false);

			const attr: SingleRadioboxAttr<T> = {
				value: item,
				isCheck,
				onchange
			};

			return m<SingleRadioboxAttr<T>, {}>(SingleRadiobox, attr, renderItem(item))
		});

		return children;
	}
});
