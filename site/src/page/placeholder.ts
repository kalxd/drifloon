import { Size } from "drifloon/data/var";
import { Header, Header2 } from "drifloon/element/header";
import { Segment } from "drifloon/element/segment";
import { FluidPlaceholder } from "drifloon/element/placeholder";
import { Message } from "drifloon/element/message";
import { loading } from "drifloon/widget/load";
import * as m from "mithril";
import { EitherAsync, Just, Left, Maybe, Nothing, Right } from "purify-ts";
import { Button } from "drifloon/element/button";
import { useDefLoader } from "drifloon/module/loader";
import { mutable } from "drifloon/data";

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const Timer = () => {
	const list = mutable<Maybe<Array<number>>>(Nothing);

	const fetchData = async () => {
		await delay();
		list.set(Just([1, 2, 3, 4, 5]));
		m.redraw();
	};

	const startTimer = () => {
		list.get()
			.ifJust(async () => {
				list.set(Nothing);
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
				loading(render, list.get())
			]);
		}
	};
};

const WaitS = (): m.Component => {
	const [update, Wait] = useDefLoader<{}>();
	const state = mutable<number>(0);
	const f = () => EitherAsync.fromPromise(async () => {
		await delay();
		const n = (state => {
			const a = state.get();
			const b = a + 1;
			state.set(b);
			return b;
		})(state);

		if (n % 2 === 0) {
			return Left("偶数次必然出错!");
		}
		else {
			return Right({
				view: () => m(Message, [
					m("div.header", `你一共请求了${n}次`),
					m("div", [
						m("input"),
						m(Button, { connectClick: () => update(f) }, "再请求一次！")
					])
				])
			});
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
