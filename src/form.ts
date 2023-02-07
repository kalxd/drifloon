import { pickKlass } from "./internal/attr";
import * as m from "mithril";
import { Maybe } from "purify-ts";

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
