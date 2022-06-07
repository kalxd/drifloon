import * as m from "mithril";

export const Button: m.Component = {
	view: ({ children }) => {
		return m("button.ui.button", children);
	}
};
