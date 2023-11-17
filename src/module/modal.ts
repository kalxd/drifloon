import * as m from "mithril";
import { mutable } from "../data/lens";
import { Maybe, List, MaybeAsync } from "purify-ts";
import * as Modal from "../element/modal";

export interface ResolveModalAttr<T> extends Modal.ModalAttr {
	connectResolve: (result: T) => void;
}

interface ModalState<T> {
	widget: m.ComponentTypes<ResolveModalAttr<T>>,
	attr: ResolveModalAttr<T>;
}

const modalState = mutable<Array<ModalState<unknown>>>([]);

export const modal = <T>(
	widget: m.ComponentTypes<ResolveModalAttr<T>>
): Promise<T> => {
	return new Promise(resolve => {
		const modalAttr: ResolveModalAttr<T> = {
			connectResolve: resolve
		};

		const w: ModalState<T> = {
			widget,
			attr: modalAttr,
		};

		const s = modalState.get();
		modalState.set([
			w as ModalState<unknown>,
			...s
		]);

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
					modalState.set(ws as Array<ModalState<unknown>>);
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
	resolve: (value: Maybe<void>) => void;
}

const confirmState = mutable<Array<ConfirmState>>([]);

export const confirm = (attr: ResolveConfirmAttr): Promise<Maybe<void>> =>
	new Promise(resolve => {
		const s: ConfirmState = {
			attr,
			resolve
		};

		const xs = confirmState.get();
		confirmState.set([s, ...xs]);
		m.redraw();
	});

export const confirmAsync = (attr: ResolveConfirmAttr): MaybeAsync<void> =>
	MaybeAsync.fromPromise(() => confirm(attr));

export const confirmText = (msg: string): Promise<Maybe<void>> =>
	confirm({ content: msg });

export const confirmTextAsync = (msg: string): MaybeAsync<void> =>
	MaybeAsync.fromPromise(() => confirmText(msg));

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
				connectResolve: value => {
					confirmState.set(ws);
					w.resolve(value);
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

const alertState = mutable<Array<AlertState>>([]);

export const alert = (attr: ResolveAlertAttr): Promise<void> => {
	return new Promise(resolve => {
		const s: AlertState = {
			attr,
			resolve
		};

		const xs = alertState.get();
		alertState.set([s, ...xs]);
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
					alertState.set(ws);
					w.resolve();
				}
			};

			return m(Modal.Alert, attr, w.attr.content);
		});
};

export const ModalMask: m.Component = {
	view: () => {
		const modalWidget = renderModal(modalState.get());
		const confirmWidget = renderConfirm(confirmState.get());
		const alertWidget = renderAlert(alertState.get());

		return alertWidget
			.alt(confirmWidget)
			.alt(modalWidget)
			.map(_ => m(Modal.ModalDimmer, [
				modalWidget.extract(),
				confirmWidget.extract(),
				alertWidget.extract()
			]))
			.extract();
	}
};
