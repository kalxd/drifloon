import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "./prelude/Attr";
import { TitleLevel } from "./Type";
import { curry } from "purify-ts";

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

export const TitleWith = curry((attr: TitleAttr, content: string): m.Vnode<TitleAttr> => {
	return m(Title, attr, content);
});

export const Title1 = TitleWith({ level: TitleLevel.Level1 });
export const Title2 = TitleWith({ level: TitleLevel.Level2 });
export const Title3 = TitleWith({ level: TitleLevel.Level3 });
export const Title4 = TitleWith({ level: TitleLevel.Level4 });
export const Title5 = TitleWith({ level: TitleLevel.Level5 });

export const SubTitleWith = curry((attr: SubTitleAttr, content: string): m.Vnode<SubTitleAttr> => {
	return m(SubTitle, attr, content);
});

export const SubTitle1 = SubTitleWith({ level: TitleLevel.Level1 });
export const SubTitle2 = SubTitleWith({ level: TitleLevel.Level2 });
export const SubTitle3 = SubTitleWith({ level: TitleLevel.Level3 });
export const SubTitle4 = SubTitleWith({ level: TitleLevel.Level4 });
export const SubTitle5 = SubTitleWith({ level: TitleLevel.Level5 });
