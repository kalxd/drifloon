import * as m from "mithril";
import { bindValue, BindValue } from "../../data/internal/value";
import { compareEq } from "../../data";
import { pickKlass, selectKlass } from "../../data/internal/attr";

interface SingleRadioboxAttr<T> {
	value: T;
	isCheck: boolean;
	connectChange: (value: T) => void;
}

const SingleRadiobox = <T>(): m.Component<SingleRadioboxAttr<T>> => ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlass("checked", attrs.isCheck)
		]);

		const f = () => attrs.connectChange(attrs.value);

		return m("div.ui.radio.checkbox", { class: klass, onclick: f }, [
			m("input.hidden[type=radio]", { checked: attrs.isCheck }),
			m("label", children)
		]);
	}
});

export interface RadioboxAttr<T> extends BindValue<T> {
	itemList?: Array<T>;
	compareEq?: (value: T, item: T) => boolean;
	renderItem?: (item: T) => string;
}

export const Radiobox = <T>(): m.Component<RadioboxAttr<T>> => ({
	view: ({ attrs }) => {
		const mbindvalue = bindValue(attrs);
		const items = attrs.itemList ?? [];
		const renderItem = attrs.renderItem ?? String;
		const compare = attrs.compareEq ?? compareEq;

		return items.map(item => {
			const isCheck = mbindvalue.value.map(v => compare(v, item))
				.orDefault(false);

			const attr: SingleRadioboxAttr<T> = {
				value: item,
				isCheck,
				connectChange: mbindvalue.connectChange
			};

			return m<SingleRadioboxAttr<T>, {}>(SingleRadiobox, attr, renderItem(item))
		});
	}
});
