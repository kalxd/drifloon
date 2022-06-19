import * as m from "mithril";

interface OutterAttr {
	onOutterClick: (e: MouseEvent) => void;
}

export const Outter: m.FactoryComponent<OutterAttr> = vnode => {
	const click = vnode.attrs.onOutterClick;

	return {
		oncreate: (vnode) => {
		},
		view: () => {}
	};
};
