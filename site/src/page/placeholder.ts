import { Size } from "drifloon/data/var";
import { Header } from "drifloon/header";
import { Segment } from "drifloon/segment";
import { FluidPlaceholder } from "drifloon/placeholder";
import { loading } from "drifloon/widget/load";
import * as m from "mithril";
import { IORef } from "drifloon/data/ref";
import { Just, Maybe, Nothing } from "purify-ts";
import { Button } from "drifloon/button";

const Timer = () => {
	const list = new IORef<Maybe<Array<number>>>(Nothing);

	const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

	const fetchData = async () => {
		await delay();
		list.put(Just([1, 2, 3, 4, 5]));
		m.redraw();
	};

	const startTimer = () => {
		list.ask()
			.ifJust(async () => {
				list.put(Nothing);
				await fetchData();
			});
	};

	const render = (xs: Array<number>): m.Vnode =>
		m("ol", xs.map(x => m("li", x)));


	fetchData();

	return {
		view: () => {
			return m("div", [
				m(Button, { onclick: startTimer }, "执行"),
				loading(render, list.ask())
			]);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m(Segment, [
			m(Header, { size: Size.Huge, isDivid: true }, "普通样式"),
			m(FluidPlaceholder),

			m(Header, "演示"),
			m(Timer)
		]);
	}
};

export default Main;
