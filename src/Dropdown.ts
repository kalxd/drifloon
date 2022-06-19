import * as m from "mithril";

export interface SelectAttr {
	placeholder?: string;
}

export const Select: m.ClosureComponent<SelectAttr> = _ => {


	return {
		view: ({ attrs, children }) => {
			return m("div.selection.dropdown", "hello world");
		}
	};
};
