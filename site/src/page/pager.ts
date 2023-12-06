import { Size } from "drifloon/data/var";
import { Header } from "drifloon/element";
import { Pager, PagerAttr } from "drifloon/widget";

import * as m from "mithril";

const SampleS: m.ClosureComponent = () => {
	return {
		view: () => {
			const attr: PagerAttr = {
				limit: 20,
				current: 4,
				total: 115,
				connectPageChange: console.log
			};

			return m(Pager, attr);
		}
	};
};

const Main: m.Component = {
	view: () => m("div.ui.segment", [
		m(Header, { size: Size.Huge, isDivid: true }, "分页器"),
		m(SampleS)
	])
};

export default Main;
