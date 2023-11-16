import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import { mutable } from "../data/lens";

type MouseEventCallback = (e: MouseEvent) => void;

export interface OutterAttr {
	connectOutterClick: MouseEventCallback;
}

export const Outter: m.FactoryComponent<OutterAttr> = _ => {
	const state = mutable<Maybe<MouseEventCallback>>(Nothing);

	return {
		oncreate: (vnode) => {
			const f = (e: MouseEvent) => {
				const target = e.target as HTMLElement;

				if (!vnode.dom.contains(target)) {
					vnode.attrs.connectOutterClick(e);
					m.redraw();
				}
			};

			state.set(Just(f));
			document.body.addEventListener("click", f);
		},

		onremove: (_) => {
			state.get().ifJust(f => {
				document.body.removeEventListener("click", f);
			});
		},

		view: ({ children }) => children
	};
};
