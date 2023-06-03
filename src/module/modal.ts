import * as m from "mithril";
import { IORef } from "../data/ref";
import { Maybe, List, Nothing } from "purify-ts";
import * as Modal from "../widget/modal";

export interface ResolveModalAttr<T> extends Modal.ModalAttr {
	connectResolve: (result: T) => void;
}

interface ModalState<T> {
	widget: m.Component<ResolveModalAttr<T>>;
	attr: ResolveModalAttr<T>;
}

const modalRef = new IORef<Array<ModalState<unknown>>>([]);

export const modal = <T>(
	widget: m.Component<ResolveModalAttr<T>>,
	attr: Modal.ModalAttr
): Promise<T> => {
	return new Promise(resolve => {
		const modalAttr: ResolveModalAttr<T> = {
			...attr,
			connectResolve: resolve
		};

		const w: ModalState<T> = {
			widget,
			attr: modalAttr,
		};

		modalRef.update(xs => ([
			w as ModalState<unknown>,
			...xs
		]));

		m.redraw();
	});
};

const renderModal = <T>(state: Array<ModalState<T>>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const w = t.fst();
			const ws = t.snd();

			const attr = {
				...w.attr,
				onresolve: (x: T) => {
					w.attr.connectResolve(x);
					modalRef.put(ws as Array<ModalState<unknown>>);
				}
			};

			return m<ResolveModalAttr<T>, {}>(w.widget, attr);
		});
};

export const ModalMask: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(renderModal);

		return modalWidget.alt(Nothing)
			.map(_ => m(Modal.ModalDimmer, [
				modalWidget.extract(),
			]))
			.extract();
	}
};
