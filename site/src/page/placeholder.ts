import { Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Segment } from "drifloon/segment";
import { FluidPlaceholder } from "drifloon/placeholder";
import * as m from "mithril";

const Sample: m.Component = {
		view: () => {
			console.log("do rendering");
			return m("div", "you see me!");
		}
};

interface Attr {
	isShow: boolean;
}

const Show: m.Component<Attr> = {
	view: ({ attrs, children }) => {
		if (attrs.isShow) {
			return children;
		}
		else {
			return null;
		}
	}
};

const Main: m.Component = {
	view: () => {
		return m(Segment, [
			m(Header, { size: Size.Huge, isDivid: true }, "普通样式"),
			m(FluidPlaceholder),

			m(Header, "演示"),
			m(Show, { isShow: false }, m(Sample))
		]);
	}
};

export default Main;
