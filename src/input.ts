import { cmpDefault } from "./internal/attr";
import * as m from "mithril";
import { identity, Maybe } from "purify-ts";

export interface ToggleAttr {
	value?: boolean;
	onchange?: (value: boolean) => void;
}

export const Toggle: m.Component<ToggleAttr> = {
	view: ({ attrs, children }) => {
		const value = attrs.value ?? false;

		const isCheck = value ? "checked" : "";

		const onclick = () => {
			const f = attrs.onchange ?? identity;
			f(!value);
		};

		const attr = {
			class: isCheck,
			onclick
		};

		return m("div.ui.toggle.checkbox", attr, [
			m("input.hidden", { type: "checkbox", checked: isCheck }),
			m("label", children)
		]);
	}
};

export interface CheckboxAttr {
	value?: Maybe<boolean>;
	onchange?: (result: boolean) => void;
}

export const Checkbox: m.Component<CheckboxAttr> = {
	view: ({ attrs, children }) => {
		const value = Maybe.fromFalsy(attrs.value)
			.join();

		const klass = value
			.filter(identity)
			.map(_ => "checked")
			.extract();

		const f = () => {
			const b = value.orDefault(false);
			const onchange = attrs.onchange ?? identity;
			onchange(!b);
		};

		return m("div.ui.checkbox", { class: klass, onclick: f }, [
			m("input.hidden[type=checkbox]"),
			m("label", children)
		]);
	}
};

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
		const cmp = attrs.cmp ?? cmpDefault;
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
