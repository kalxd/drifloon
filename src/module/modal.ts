import * as m from "mithril";
import { IORef } from "../data/ref";
import { Maybe, List, Either, Right, Left } from "purify-ts";
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

			const attr: ResolveModalAttr<T> = {
				...w.attr,
				connectResolve: (x: T) => {
					w.attr.connectResolve(x);
					modalRef.put(ws as Array<ModalState<unknown>>);
				}
			};

			return m<ResolveModalAttr<T>, {}>(w.widget, attr);
		});
};

export interface ResolveConfirmAttr extends Modal.ModalAttr {
	title?: string;
	content?: m.Children;
	positiveText?: string;
	negativeText?: string;
}

interface ConfirmState {
	attr: ResolveConfirmAttr;
	resolve: (value: Either<void, void>) => void;
}

const confirmRef = new IORef<Array<ConfirmState>>([]);

export const confirm = (attr: ResolveConfirmAttr): Promise<Either<void, void>> => {
	return new Promise(resolve => {
		const s: ConfirmState = {
			attr,
			resolve
		};

		confirmRef.update(xs => [s, ...xs]);
		m.redraw();
	});
};

const renderConfirm = (state: Array<ConfirmState>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const s = t.fst();
			const restAttrList = t.snd();
			const confirmAttr: Modal.ConfirmAttr = {
				...s.attr,
				connectPositive: () => {
					confirmRef.put(restAttrList);
					s.resolve(Right(undefined));
				},
				connectNegative: () => {
					confirmRef.put(restAttrList);
					s.resolve(Left(undefined));
				}
			};

			return m(Modal.Confirm, confirmAttr);
		});
};

export const ModalMask: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(renderModal);
		const confirmWidget = confirmRef.asks(renderConfirm);

		return confirmWidget.alt(modalWidget)
			.map(_ => m(Modal.ModalDimmer, [
				confirmWidget.extract(),
				modalWidget.extract(),
			]))
			.extract();
	}
};
