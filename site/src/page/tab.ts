import { mutable } from "drifloon/data";
import { Color } from "drifloon/data/var";
import { Button, ButtonAttr, Header1, Segment } from "drifloon/element";
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
	const state = mutable<number>(0);
	const [TabFrame, Tab] = useTab();

	return {
		view: () => {
			return m(TabFrame, { bindValue: state }, [
				m(Tab, { title: "tab 1" }, [
					"请看表演",
					m(IncButton),
					m(IncButton)
				]),
				m(Tab, [
					"带状态的组件",
					m(IncButton)
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
