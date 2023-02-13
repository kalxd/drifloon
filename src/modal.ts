import * as m from "mithril";
import { pickKlass, selectKlass } from "./internal/attr";
import { Size } from "./data/var";
import { IORef } from "./data/ref";
import { Maybe, List, Nothing, identity, Just } from "purify-ts";

export enum ModalFullscreen {
	Fullscreen = "fullscreen",
	OverlayFullscreen = "overlay fullscreen"
}

export interface ModalAttr {
	size?: Size;
	fullscreen?: ModalFullscreen;
	invert?: boolean;
}

export interface ModalWAttr<T> extends ModalAttr {
	onresolve: (result: T) => void;
}

export interface ModalActionWAttr {
	positiveText?: string;
	negativeText?: string;
	isAlert?: boolean;
	onpositive?: (e: MouseEvent) => void;
	onnegative?: (e: MouseEvent) => void;
}

export const ModalActionW: m.Component<ModalActionWAttr> = {
	view: ({ attrs }) => {
		const negative = Just(attrs.isAlert ?? false)
			.filter(b => !b)
			.map(_ => Maybe.fromNullable(attrs.negativeText).orDefault("不好"))
			.map(text => {
				const f = attrs.onnegative ?? identity;
				return m("button.ui.button", { onclick: f }, text);
			})
			.extract();

		const onpositive = attrs.onpositive ?? identity;
		const positive = m(
			"button.ui.positive.button",
			{ onclick: onpositive },
			attrs.positiveText ?? "好"
		);

		return m("div.actions", [
			negative,
			positive
		]);
	}
};

export const ModalW = <T>(): m.Component<ModalWAttr<T>> => ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.fullscreen),
			selectKlass("inverted", attrs.invert)
		]);

		return m("div.ui.modal.transition.active", { class: klass }, children);
	}
});

interface ModalState<T> {
	widget: m.Component<ModalWAttr<T>>;
	attr: ModalWAttr<T>;
}

const modalRef = new IORef<Array<ModalState<any>>>([]);

export const modal = <T>(
	widget: m.Component<ModalWAttr<T>>,
	attr: ModalAttr
): Promise<T> => {
	return new Promise(resolve => {
		const attrw: ModalWAttr<T> = {
			...attr,
			onresolve: resolve
		};

		const w: ModalState<T> = {
			widget,
			attr: attrw,
		};

		modalRef.update(xs => ([
			w,
			...xs
		]));

		m.redraw();
	});
};

export interface AlertAttr extends ModalAttr {
	title?: string;
	content?: m.Children;
	positiveText?: string;
	negativeText?: string;
	isAlert?: boolean;
}

interface AlertWAttr extends AlertAttr {
	onresolve: (r: Maybe<void>) => void;
}

const AlertW: m.Component<AlertWAttr> = {
	view: ({ attrs }) => {
		const modalActionAttr: ModalActionWAttr = {
			positiveText: attrs.positiveText,
			negativeText: attrs.negativeText,
			isAlert: attrs.isAlert,
			onpositive: () => attrs.onresolve(Just(undefined)),
			onnegative: () => attrs.onresolve(Nothing)
		};

		return m<ModalWAttr<Maybe<void>>, any>(ModalW, attrs, [
			m("div.header", attrs.title),
			m("div.content", attrs.content),
			m(ModalActionW, modalActionAttr)
		])
	}
};

interface AlertState {
	attr: AlertWAttr;
}

const alertRef = new IORef<Array<AlertState>>([]);

export const alert = (attr: AlertAttr): Promise<Maybe<void>> => new Promise(resolve => {
	const attrw: AlertWAttr = {
		...attr,
		onresolve: resolve
	};

	const w: AlertState = {
		attr: attrw,
	};

	alertRef.update(xs => ([w, ...xs]));
	m.redraw();
});

export const alertMsg = async (msg: string): Promise<void> => {
	await alert({
		title: "提示",
		content: msg,
		isAlert: true
	});
};

export const confirmMsg = (msg: string): Promise<Maybe<void>> => {
	return alert({
		title: "提示",
		content: msg
	});
};

const ModalDimmer: m.Component = {
	view: ({ children }) => m(
		"div.ui.modals.dimmer.active.visible.transition",
		{ style: "display: flex !important" },
		children
	)
};

const renderModal = <T>(state: Array<ModalState<T>>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const w = t.fst();
			const ws = t.snd();

			const attr = {
				...w.attr,
				onresolve: (x: T) => {
					w.attr.onresolve(x);
					modalRef.put(ws);
				}
			};

			return m(w.widget, attr);
		});
};

const renderAlert = (state: Array<AlertState>): Maybe<m.Children> => {
	return List.uncons(state)
		.map(t => {
			const w = t.fst();
			const ws = t.snd();

			const attr: AlertWAttr = {
				...w.attr,
				onresolve: r => {
					w.attr.onresolve(r);
					alertRef.put(ws);
				}
			};

			return m(AlertW, attr);
		});
};

export const ModalMask: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(renderModal);
		const alertWidget = alertRef.asks(renderAlert);

		return alertWidget.alt(modalWidget)
			.map(_ => m(ModalDimmer, [
				modalWidget.extract(),
				alertWidget.extract()
			]))
			.extract();
	}
};
