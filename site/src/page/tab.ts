import { mutable } from "drifloon/data";
import { Color } from "drifloon/data/var";
import { Button, ButtonAttr, Header1, Message, Segment } from "drifloon/element";
import { useTab } from "drifloon/module/tab";
import * as m from "mithril";

const IncButton: m.ClosureComponent = () => {
	const state = mutable<number>(0);
	const attr: ButtonAttr = {
		connectClick: () => {
			const v = state.get();
			return state.set(v + 1);
		}
	};

	return {
		view: () => {
			return m(Button, attr, state.get())
		}
	};
};

const TabS: m.ClosureComponent = () => {
	interface State {
		root: number;
		sub: number;
	};
	const state = mutable<State>({ root: 0, sub: 0 });
	const [TabFrame, Tab] = useTab();
	const [SubTabFrame, SubTab] = useTab();

	return {
		view: () => {
			return m.fragment({}, [
				m(
					Message,
					{ color: Color.Yellow },
					"每次切换标签，都会触发组件重新渲染，请谨懎选择合适状态管理方式！"
				),
				m(TabFrame, { bindValue: state.prop("root") }, [
					m(Tab, { title: "tab 1" }, [
						"请看表演",
						m(IncButton),
						m(IncButton)
					]),
					m(Tab, [
						"带状态的组件",
						m(IncButton),
						m(SubTabFrame, { bindValue: state.prop("sub") }, [
							m(SubTab, "第一个标签"),
							m(SubTab, "第二个标签")
						])
					])
				])
			]);
		}
	};
};

const Main: m.Component = {
	view: () => {
		return m(Segment, { color: Color.Olive }, [
			Header1("标签页"),
			m(TabS)
		]);
	}
};

export default Main;
