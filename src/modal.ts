import * as m from "mithril";
import { pickKlass, selectKlass } from "./internal/attr";
import { Size } from "data/var";
import IORef from "./data/ioref";
import { Maybe, List, identity } from "purify-ts";

export enum ModalFullscreen {
	Fullscreen = "fullscreen",
	OverlayFullscreen = "overlay fullscreen"
}

interface ModalWAttr {
	size?: Size;
	fullscreen?: ModalFullscreen;
	invert?: boolean;
}

export const ModalW = <T>(): m.Component<ModalAttr<T>> => ({
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.fullscreen),
			selectKlass("inverted", attrs.invert)
		]);

		return m("div.ui.modal.transition.active", { class: klass }, children);
	}
});

interface ModalHeaderWAttr {
	title?: string;
}

export const ModalHeaderW: m.Component<ModalHeaderWAttr> = {
	view: ({ attrs }) => m("div.header", attrs.title ?? "")
};

export interface ModalAttr<T> extends ModalWAttr {
	onresolve: (result: T) => void;
}

interface ModalState<T> {
	widget: m.Component<ModalAttr<T>>;
	attr: ModalAttr<T>;
	callback: (result: T) => void;
}

const modalRef = new IORef<Array<ModalState<any>>>([]);

export const modal = <T>(
	widget: m.Component<ModalAttr<T>>,
	attr: ModalAttr<T>
): Promise<T> => {
	return new Promise(resolve => {
		const w: ModalState<T> = {
			widget,
			attr,
			callback: result => {
				attr.onresolve(result);
				resolve(result);
			}
		};

		modalRef.update(xs => ([
			...xs,
			w
		]));

		console.log(modalRef.ask());
		m.redraw();
	});
};

export interface AlertAttr extends ModalWAttr {
	title?: string;
	content?: m.Children;
	positiveText?: string;
}

interface AlertWAttr extends AlertAttr, ModalAttr<void> {}

const AlertW: m.Component<AlertWAttr> = {
	view: ({ attrs }) => {
		const positiveText = attrs.positiveText ?? "确定";

		return m<ModalAttr<void>, any>(ModalW, attrs, [
			m(ModalHeaderW, attrs),
			m("div.content", attrs.content),
			m("div.actions", [
				m(
					"button.ui.positive.button",
					{ onclick: attrs.onresolve },
					positiveText
				)
			])
		])
	}
};

export const alert = (attr: AlertAttr): Promise<void> => {
	const modalAttr: AlertWAttr = {
		...attr,
		onresolve: identity
	};

	return modal(AlertW, modalAttr);
};

export const alertMsg = (msg: string): Promise<void> => {
	return alert({
		title: "提示",
		content: msg
	});
};

export const Modal: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(List.uncons);

		return modalWidget
			.map(t => {
				const w = t.fst();
				const ws = t.snd();

				const attr = {
					...w.attr,
					onresolve: (x: unknown) => {
						w.callback(x);
						modalRef.put(ws);
					}
				};

				return m(
					"div.ui.modals.dimmer.active.visible.transition",
					{ style: "display: flex !important" },
					m(w.widget, attr)
				);
			})
			.extract();
	}
};
