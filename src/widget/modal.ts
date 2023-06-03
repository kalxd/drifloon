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
