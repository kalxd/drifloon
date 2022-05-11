import * as m from "mithril";
import { fmapIsKlass, pickKlass, prependIs, selectKlassWhen } from "./prelude/Attr";
import { TitleLevel } from "./Type";
import { curry } from "purify-ts";

export interface TitleAttr {
	level?: TitleLevel;
	space?: boolean;
}

export const Title: m.Component<TitleAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			fmapIsKlass(attrs.level),
			selectKlassWhen(attrs.space, prependIs("spaced"))
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

export const TitleWith_ = curry((attr: TitleAttr, content: string): m.Vnode<TitleAttr> => {
	return m(Title, attr, content);
});

export const Title1_ = TitleWith_({ level: TitleLevel.Level1 });
export const Title2_ = TitleWith_({ level: TitleLevel.Level2 });
export const Title3_ = TitleWith_({ level: TitleLevel.Level3 });
export const Title4_ = TitleWith_({ level: TitleLevel.Level4 });
export const Title5_ = TitleWith_({ level: TitleLevel.Level5 });

export const SubTitleWith_ = curry((attr: SubTitleAttr, content: string): m.Vnode<SubTitleAttr> => {
	return m(SubTitle, attr, content);
});

export const SubTitle1_ = SubTitleWith_({ level: TitleLevel.Level1 });
export const SubTitle2_ = SubTitleWith_({ level: TitleLevel.Level2 });
export const SubTitle3_ = SubTitleWith_({ level: TitleLevel.Level3 });
export const SubTitle4_ = SubTitleWith_({ level: TitleLevel.Level4 });
export const SubTitle5_ = SubTitleWith_({ level: TitleLevel.Level5 });
