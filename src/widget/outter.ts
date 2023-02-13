import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import { IORef } from "../data/ref";

export interface OutterAttr {
	onOutterClick: (e: MouseEvent) => void;
}

export const Outter: m.FactoryComponent<OutterAttr> = _ => {
	const bodyClickIO: IORef<Maybe<(ev: MouseEvent) => void>> = new IORef(Nothing);

	return {
		oncreate: (vnode) => {
			const f = (e: MouseEvent) => {
				const target = e.target as HTMLElement;

				if (!vnode.dom.contains(target)) {
					vnode.attrs.onOutterClick(e);
					m.redraw();
				}
			};

			bodyClickIO.put(Just(f));

			document.body.addEventListener("click", f);
		},

		onremove: (_) => {
			bodyClickIO.ask().ifJust(f => {
				document.body.removeEventListener("click", f);
			});
		},

		view: ({ children }) => children
	};
};
