import { Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Segment } from "drifloon/segment";
import { FluidPlaceholder } from "drifloon/placeholder";
import * as m from "mithril";

const Main: m.Component = {
	view: () => {
		return m(Segment, [
			m(Header, { size: Size.Huge, isDivid: true }, "普通样式"),
			m(FluidPlaceholder)
		]);
	}
};

export default Main;
