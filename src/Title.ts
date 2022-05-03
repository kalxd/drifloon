import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "prelude/Attr";
import { TitleLevel } from "Type";

export interface TitleAttr {
	level?: TitleLevel;
	spaced?: boolean;
}

export const Title: m.Component<TitleAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.level),
			selectKlassWhen(attrs.spaced, prependIs("spaced"))
		]);

		return m("div.title", { class: klass}, children);
	}
};

export interface SubTitleAttr {
	level?: TitleLevel;
}

export const SubTitle: m.Component<SubTitleAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.level)
		]);

		return m("div.subtitle", { class: klass }, children);
	}
};
