import * as m from "mithril";
import { Just, Maybe, Nothing } from "purify-ts";
import * as BaseModal from "../element/modal";

export interface ModalAttr extends BaseModal.ModalAttr {
	title?: string;
	connectResolve?: (value: Maybe<void>) => void;
}

export const Modal: m.Component<ModalAttr> = {
	view: ({ attrs, children }) => {
		const mResolve = Maybe.fromNullable(attrs.connectResolve);


		const modalAttr = BaseModal.pickModalAttr(attrs);
		const actionAttr: BaseModal.ModalActionAttr = {
			connectPositive: () =>
				mResolve.ifJust(f => f(Just(undefined))),
			connectNegative: () =>
				mResolve.ifJust(f => f(Nothing))
		};

		return m(BaseModal.Modal, modalAttr, [
			m("div.header", attrs.title),
			m("div.scrolling.content", children),
			m(BaseModal.ModalAction, actionAttr)
		]);
	}
};
