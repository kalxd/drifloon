import { pickKlass, selectKlass } from "../data/internal/attr";
import * as m from "mithril";
import { Maybe } from "purify-ts";
import { LoadingShape, Size, StateLevel } from "../data/var";
import { FormMutable } from "../data/form";
import { Message } from "../element/message";
import { ValidatorError } from "../data";

export interface FormAttr<T> {
	loading?: LoadingShape;
	isInvert?: boolean;
	size?: Size;
	formdata?: FormMutable<T>;
}

const renderSuccuss = (callback: () => void): m.Vnode =>
	m(Message, { state: StateLevel.Positive }, [
		m("i.close.icon", { onclick: callback }),
		m("div.header", "操作成功！")
	]);

const renderFailure = (callback: () => void, xs: ValidatorError): m.Vnode =>
	m(Message, { state: StateLevel.Negative }, [
		m("i.close.icon", { onclick: callback }),
		m("div.header", "提交操作不成功！"),
		m("ul.list", xs.map(a => m("li", a)))
	]);

export const Form = <T>(): m.Component<FormAttr<T>> => {
	return {
		view: ({ attrs, children }) => {
			const fd = Maybe.fromNullable(attrs.formdata)

			const loadShape = fd.filter(d => d.isValidating())
				.map(() => attrs.loading ?? LoadingShape.Default);

			const klass = pickKlass([
				loadShape,
				selectKlass("inverted", attrs.isInvert),
				Maybe.fromNullable(attrs.size),
				fd.chain(fd => fd.getResult()).map(_ => "error")
			]);

			const errMsg = fd
				.filter(d => !d.isValidating())
				.map(data => {
					const onclick = () => data.resetTip();
					return data.getResult()
						.map(v => v.caseOf({
							Just: xs => renderFailure(onclick, xs),
							Nothing: () => renderSuccuss(onclick)
						}))
						.extract();
				});

			return m("div.ui.form", { class: klass }, [
				(children as m.Children),
				errMsg.extract()
			]);
		}
	};
};
