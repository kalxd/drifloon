import * as m from "mithril";
import { Maybe } from "purify-ts";
import * as BaseModal from "../element/modal";

export interface ModalAttr extends BaseModal.ModalAttr {
	title?: string;
	connectResolve?: (value: Maybe<void>) => void;
}

export const Modal: m.Component<ModalAttr> = {
	view: ({ attrs, children }) => {
		const modalAttr = BaseModal.pickModalAttr(attrs);
		const actionAttr: BaseModal.ModalActionAttr = {
			connectResolve: attrs.connectResolve
		};

		return m(BaseModal.Modal, modalAttr, [
			m("div.header", attrs.title),
			m("div.scrolling.content", children),
			m(BaseModal.ModalAction, actionAttr)
		]);
	}
};
