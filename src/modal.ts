import * as m from "mithril";
import { pickKlass, selectKlass } from "./internal/attr";
import { Size } from "./data/var";
import IORef from "./data/ioref";
import { Maybe, List, Tuple, Nothing, Just } from "purify-ts";

export enum ModalFullscreen {
	Fullscreen = "fullscreen",
	OverlayFullscreen = "overlay fullscreen"
}

export interface ModalWAttr {
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
			w,
			...xs
		]));

		m.redraw();
	});
};

export interface AlertAttr extends ModalWAttr {
	title?: string;
	content?: m.Children;
	positiveText?: string;
	negativeText?: string;
	isExtentType?: boolean;

}

interface AlertWAttr extends AlertAttr {
	onresolve: (r: Maybe<void>) => void;
}

const AlertW: m.Component<AlertWAttr> = {
	view: ({ attrs }) => {
		const positiveText = attrs.positiveText ?? "好";

		const negativeButton = Maybe.fromFalsy(attrs.isExtentType)
			.map(_ => {
				return Maybe.fromNullable(attrs.negativeText)
					.orDefault("不好");
			})
			.map(s => {
				const f = () => attrs.onresolve(Nothing);
				return m(
					"button.ui.button",
					{ onclick: f },
					s
				);
			})
			.extract();

		return m<ModalAttr<Maybe<void>>, any>(ModalW, attrs, [
			m("div.header", attrs.title),
			m("div.content", attrs.content),
			m("div.actions", [
				negativeButton,
				m(
					"button.ui.positive.button",
					{ onclick: () => attrs.onresolve(Just(void 0)) },
					positiveText
				)
			])
		])
	}
};

interface AlertState {
	attr: AlertAttr;
	callback: (r: Maybe<void>) => void;
}

const alertRef = new IORef<Array<AlertState>>([]);

export const alert = (attr: AlertAttr): Promise<Maybe<void>> => new Promise(resolve => {
	const w: AlertState = {
		attr,
		callback: resolve
	};

	alertRef.update(xs => ([w, ...xs]));
	m.redraw();
});

export const alertMsg = async (msg: string): Promise<void> => {
	await alert({
		title: "提示",
		content: msg
	});
};

export const confirmMsg = (msg: string): Promise<Maybe<void>> => {
	return alert({
		title: "提示",
		content: msg,
		isExtentType: true
	});
};

const renderModal = <T>(t: Tuple<ModalState<T>, Array<ModalState<T>>>): m.Children => {
	const w = t.fst();
	const ws = t.snd();

	const attr = {
		...w.attr,
		onresolve: (x: T) => {
			w.callback(x);
			modalRef.put(ws);
		}
	};

	return m(w.widget, attr);
};

const renderAlert = (t: Tuple<AlertState, Array<AlertState>>): m.Children => {
	const w = t.fst();
	const ws = t.snd();

	const attr: AlertWAttr = {
		...w.attr,
		onresolve: r => {
			w.callback(r);
			alertRef.put(ws);
		}
	};

	return m(AlertW, attr);
};

export const Modal: m.Component = {
	view: () => {
		const modalWidget = modalRef.asks(List.uncons);
		const alertWidget = alertRef.asks(List.uncons);

		return modalWidget.alt(alertWidget as never as typeof modalWidget) // 这一行超级黑魔法，仅仅为了少写if-else。
			.map(_ => {
				const modalW = modalWidget.map(renderModal).extract();
				const alertW = alertWidget.map(renderAlert).extract();

				return m(
					"div.ui.modals.dimmer.active.visible.transition",
					{ style: "display: flex !important" },
					modalW,
					alertW
				);
			})
			.extract();
	}
};
