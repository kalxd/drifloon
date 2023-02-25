import * as m from "mithril";

const lines = (n: number): m.Children => {
	let xs = [];
	for (let i = 0; i < n; ++i) {
		xs.push(m("div.line"));
	}
	return xs;
};

export const FluidPlaceholder: m.Component = {
	view: () => {
		return m("div.ui.fluid.placeholder", [
			m("div.image.header", lines(2)),
			m("div.paragraph", lines(3))
		]);
	}
};
