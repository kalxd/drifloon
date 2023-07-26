import * as m from "mithril";
import { Wide, wideBase } from "../data/var";
import { fmapKlass, pickKlass, selectKlass } from "../internal/attr";
import { Maybe } from "purify-ts";

export interface FieldGridAttr {
	wide?: Wide;
}

export const FieldGrid: m.Component<FieldGridAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.wide)
		]);

		return m("div.fields", { class: klass }, children);
	}
};


export interface FieldAttr {
	error?: string;
	isRequire?: boolean;
	wide?: Wide;
}

export const Field: m.Component<FieldAttr> = {
	view: ({ attrs, children }) => {
		const err = Maybe.fromNullable(attrs.error);

		const klass = pickKlass([
			selectKlass("required", attrs.isRequire),
			fmapKlass(wideBase("wide"), attrs.wide),
			err.map(_ => "error")
		]);

		const errorLabel = err.map(text =>
			m("div.ui.basic.red.pointing.promot.label.transition.visible", text));

		return m("div.field", { class: klass}, [
			children,
			errorLabel.extract()
		]);
	}
};

export interface RequireFieldAttr {
	error?: string;
	wide?: Wide;
}

export const RequireField: m.Component<RequireFieldAttr> = {
	view: ({ attrs, children }) => {
		const attr: FieldAttr = {
			error: attrs.error,
			wide: attrs.wide,
			isRequire: true
		};

		return m(Field, attr, children);
	}
};
