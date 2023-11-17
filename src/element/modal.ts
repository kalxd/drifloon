import * as m from "mithril";
import { Size } from "../data/var";
import { pickKlass, selectKlass } from "../internal/attr";
import { Just, Maybe, Nothing } from "purify-ts";
import { AnimateFrame } from "../abstract/animate";

export enum ModalFullscreen {
	Fullscreen = "fullscreen",
	OverlayFullscreen = "overlay fullscreen"
}

export interface ModalAttr {
	size?: Size;
	fullscreen?: ModalFullscreen;
	isInvert?: boolean;
}

export const Modal: m.Component<ModalAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.fullscreen),
			selectKlass("inverted", attrs.isInvert),
			Just("ui modal top aligned transition active")
		]);

		return m(
			AnimateFrame,
			{ class: klass, in: "animate__fadeInDown" },
			children
		);
	}
};

export const ModalDimmer: m.Component = {
	oncreate: () => {
		document.body.classList.add("blurring", "dimmed", "dimmable");
	},
	onremove: () => {
		document.body.classList.remove("blurring", "dimmed", "dimmable");
	},
	view: ({ children }) => m(
		"div.ui.modals.dimmer.active.visible.transition",
		{ style: "display: flex !important" },
		children
	)
};

export interface ModalActionAttr {
	positiveText?: string;
	negativeText?: string;
	connectResolve?: (value: Maybe<void>) => void;
}

export const ModalAction: m.Component<ModalActionAttr> = {
	view: ({ attrs }) => {
		const mResolve = Maybe.fromNullable(attrs.connectResolve);

		const negative = m(
			"button.ui.negative.button",
			{ onclick: () => mResolve.ifJust(f => f(Nothing)) },
			attrs.negativeText ?? "不好"
		);

		const positive = m(
			"button.ui.positive.right.labeled.icon.button",
			{ onclick: () => mResolve.ifJust(f => f(Just(undefined))) },
			[
				attrs.positiveText ?? "好",
				m("i.icon.checkmark")
			]
		);

		return m("div.actions", [
			negative,
			positive
		]);
	}
};

export interface ConfirmAttr extends ModalAttr, ModalActionAttr {
	title?: string;
}

export const pickModalAttr = <T extends ModalAttr>(attr: T): ModalAttr => ({
	size: attr.size,
	fullscreen: attr.fullscreen,
	isInvert: attr.isInvert
});

export const Confirm: m.Component<ConfirmAttr> = {
	view: ({ attrs, children }) => {
		const modalAttr = pickModalAttr(attrs);

		const modalActionAttr: ModalActionAttr = {
			positiveText: attrs.positiveText,
			negativeText: attrs.negativeText,
			connectResolve: attrs.connectResolve
		};

		return m(Modal, modalAttr, [
			m("div.header", attrs.title ?? "提示"),
			m("div.scrolling.content", children),
			m(ModalAction, modalActionAttr)
		]);
	}
};

export interface AlertAttr extends ModalAttr {
	title?: string;
	positiveText?: string;
	connectResolve: () => void;
}

export const Alert: m.Component<AlertAttr> = {
	view: ({ attrs, children }) => {
		const modalAttr = pickModalAttr(attrs);

		return m(Modal, modalAttr, [
			m("div.header", attrs.title ?? "提示"),
			m("div.scrolling.content", children),
			m("div.actions", m(
				"button.ui.positive.right.labeled.icon.button",
				{ onclick: attrs.connectResolve},
				[
					attrs.positiveText ?? "好",
					m("i.icon.checkmark"),
				]
			))
		]);
	}
};
