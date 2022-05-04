import * as m from "mithril";

export const Text = (content: string): m.Vnode => {
	return m("p", content);
};
