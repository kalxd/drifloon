import { Size } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import { Segment } from "drifloon/element/segment";
import { FluidPlaceholder } from "drifloon/element/placeholder";
import { Message } from "drifloon/element/message";
import { loading } from "drifloon/widget/load";
import * as m from "mithril";
import { IORef } from "drifloon/data/ref";
import { EitherAsync, Just, Left, Maybe, Nothing, Right } from "purify-ts";
import { Button } from "drifloon/element/button";
import { WaittingFn, waitting } from "drifloon/module/loading";

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const Timer = () => {
	const list = new IORef<Maybe<Array<number>>>(Nothing);

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
				m(Button, { connectClick: startTimer }, "执行"),
				loading(render, list.ask())
			]);
		}
	};
};

const WaitS = (): m.Component => {
	const [update, Wait] = waitting();
	const state = new IORef<number>(0);
	const f: WaittingFn = () => EitherAsync.fromPromise(async () => {
		await delay();
		const n = state.update(s => s + 1).ask();
		if (n % 2 === 0) {
			return Left("偶数次必然出错!");
		}
		else {
			return Right(m(Message, [
				m("div.header", `你一共请求了${n}次`),
				m("div", [
					m(Button, { connectClick: () => update(f) }, "再请求一次！")
				])
			]));
		}
	});

	update(f);

	return {
		view: () => m("div", [
			m("div", "偶数次会出现错误！"),
			m(Wait)
		])
	};
};

const Main: m.Component = {
	view: () => {
		return m(Segment, [
			m(Header, { size: Size.Huge, isDivid: true }, "普通样式"),
			m(FluidPlaceholder),

			m(Header, "演示"),
			m(Timer),

			Header2("延时性"),
			m(WaitS)
		]);
	}
};

export default Main;
