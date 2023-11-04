import { pickKlass, selectKlass } from "../internal/attr";
import * as m from "mithril";
import { Maybe } from "purify-ts";
import { LoadingShape, Size, StateLevel } from "../data/var";
import { FormMutable } from "../data/form";
import { Message } from "../element/message";

export * from "../element/input";
export * from "../element/form";
export * from "../widget/input";

export interface FormAttr<T> {
	loading?: LoadingShape;
	isInvert?: boolean;
	size?: Size;
	formdata?: FormMutable<T>;
}

export const Form = <T>(): m.Component<FormAttr<T>> => {
	return {
		view: ({ attrs, children }) => {
			const fd = Maybe.fromNullable(attrs.formdata)

			const klass = pickKlass([
				Maybe.fromNullable(attrs.loading),
				selectKlass("inverted", attrs.isInvert),
				Maybe.fromNullable(attrs.size),
				fd.chain(fd => fd.getErr()).map(_ => "error")
			]);

			const errMsg = fd.chain(data => {
				const onclick = () => data.resetErr();

				return data.getErr().map(msg => m(
					Message,
					{ state: StateLevel.Error },
					[
						m("i.close.icon", { onclick }),
						m("div.header", "提交数据验证出错"),
						m("ul.list", msg.map(a => m("li", a)))
					]
				));
			});

			return m("div.ui.form", { class: klass }, [
				(children as m.Children),
				errMsg.extract()
			]);
		}
	};
};
