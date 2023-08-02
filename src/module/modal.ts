import * as m from "mithril";
import { IORef } from "../data/ref";
import { Maybe, List, Either, EitherAsync } from "purify-ts";
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

export const confirm = (attr: ResolveConfirmAttr): EitherAsync<void, void> =>
	EitherAsync.fromPromise(() => new Promise(resolve => {
		const s: ConfirmState = {
			attr,
			resolve
		};

		confirmRef.update(xs => [s, ...xs]);
		m.redraw();
	}));

export const confirmText = (msg: string): EitherAsync<void, void> =>
	confirm({ content: msg });

const renderConfirm = (state: Array<ConfirmState>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const w = t.fst();
			const ws = t.snd();
			const confirmAttr: Modal.ConfirmAttr = {
				size: w.attr.size,
				fullscreen: w.attr.fullscreen,
				isInvert: w.attr.isInvert,
				title: w.attr.title,
				positiveText: w.attr.positiveText,
				negativeText: w.attr.negativeText,
				connectResolve: result => {
					confirmRef.put(ws);
					w.resolve(result);
				}
			};

			return m(Modal.Confirm, confirmAttr, w.attr.content);
		});
};

export interface ResolveAlertAttr extends Modal.ModalAttr {
	title?: string;
	content?: m.Children;
	positiveText?: string;
}

interface AlertState {
	attr: ResolveAlertAttr;
	resolve: () => void;
};

const alertRef = new IORef<Array<AlertState>>([]);

export const alert = (attr: ResolveAlertAttr): Promise<void> => {
	return new Promise(resolve => {
		const s: AlertState = {
			attr,
			resolve
		};

		alertRef.update(xs => [s, ...xs]);
	});
};

export const alertText = (msg: string): Promise<void> =>
	alert({ content: msg });

const renderAlert = (state: Array<AlertState>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const w = t.fst();
			const ws = t.snd();

			const attr: Modal.AlertAttr = {
				size: w.attr.size,
				fullscreen: w.attr.fullscreen,
				isInvert: w.attr.isInvert,
				title: w.attr.title,
				positiveText: w.attr.positiveText,
				connectResolve: () => {
					alertRef.put(ws);
					w.resolve();
				}
			};

			return m(Modal.Alert, attr, w.attr.content);
		});
};

export const ModalMask: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(renderModal);
		const confirmWidget = confirmRef.asks(renderConfirm);
		const alertWidget = alertRef.asks(renderAlert);

		return alertWidget
			.alt(confirmWidget)
			.alt(modalWidget)
			.map(_ => m(Modal.ModalDimmer, [
				alertWidget.extract(),
				confirmWidget.extract(),
				modalWidget.extract(),
			]))
			.extract();
	}
};