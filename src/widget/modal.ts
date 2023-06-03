import * as m from "mithril";
import { Size } from "../data/var";
import { pickKlass, selectKlass } from "../internal/attr";
import { Just, Maybe } from "purify-ts";
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
			Just("ui modal transition active")
		]);

		return m(
			AnimateFrame,
			{ class: klass, in: "animate__fadeInDown" },
			children
		);
	}
};

export const ModalDimmer: m.Component = {
	view: ({ children }) => m(
		"div.ui.modals.dimmer.active.visible.transition",
		{ style: "display: flex !important" },
		children
	)
};

export interface ModalActionAttr {
	positiveText?: string;
	negativeText?: string;
	connectPositive?: () => void;
	connectNegative?: () => void;
}

export const ModalAction: m.Component<ModalActionAttr> = {
	view: ({ attrs }) => {
		const mOnNegative = Maybe.fromNullable(attrs.connectNegative);
		const mOnPositive = Maybe.fromNullable(attrs.connectPositive);

		const negative = m(
			"button.ui.negative.button",
			{ onclick: () => mOnNegative.ifJust(f => f()) },
			attrs.negativeText ?? "不好"
		);

		const positive = m(
			"button.ui.positive right labeled icon button",
			{ onclick: () => mOnPositive.ifJust(f => f()) },
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
