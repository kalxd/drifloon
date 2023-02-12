import { pickKlass, selectKlass } from "./internal/attr";
import * as m from "mithril";
import { identity, Maybe } from "purify-ts";
import { LoadingShape, Size, StateLevel } from "./data/var";
import { FormData } from "./data/form";
import { Message, MessageAttr } from "./element/message";

export interface FieldAttr {
	error?: Maybe<string>;
}

export const Field: m.Component<FieldAttr> = {
	view: ({ attrs, children }) => {
		const error = Maybe.fromNullable(attrs.error)
			.join();

		const errorLabel = error.map(text =>
			m("div.ui.basic.red.pointing.promot.label.transition.visible", text));

		const klass = pickKlass([
			error.map(_ => "error")
		]);

		return m("div.field", { class: klass }, [
			children,
			errorLabel.extract()
		]);
	}
}

export interface TextFieldAttr {
	label?: string;
	isRequire?: boolean;
	onchange?: (output: string) => void;
}

export const TextField: m.Component<TextFieldAttr> = {
	view: ({ attrs }) => {
		const klass = pickKlass([
			selectKlass("required", attrs.isRequire)
		]);

		const onchange = (e: Event) => {
			const input = e.target as HTMLInputElement;
			const f = attrs.onchange ?? identity;
			f(input.value.trim());
		};

		return m("div.field", { class: klass }, [
			m("label", attrs.label),
			m("input", { onchange })
		]);
	}
};

export interface FormAttr<T> {
	loading?: LoadingShape;
	isInvert?: boolean;
	size?: Size;
	formdata?: FormData<T>;
}

export const Form = <T>(): m.Component<FormAttr<T>> => {
	return {
		view: ({ attrs, children }) => {
			const err = Maybe.fromNullable(attrs.formdata)

			const klass = pickKlass([
				Maybe.fromNullable(attrs.loading),
				selectKlass("inverted", attrs.isInvert),
				Maybe.fromNullable(attrs.size),
				err.chain(data => data.err).map(_ => "error")
			]);

			const errMsg = err.chain(data => {
				const onclick = () => data.resetErr();

				return data.err.map(msg => m(
					Message,
					{ state: StateLevel.Error },
					[
						m("i.close.icon", { onclick }),
						m("div.header", "验证出错"),
						m("p", msg)
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
