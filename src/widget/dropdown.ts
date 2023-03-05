import { IORef } from "../data/ref";
import * as m from "mithril";
import { Outter } from "./outter";
import { pickKlass, selectKlass } from "../internal/attr";

export interface DropdownAttr {
	value: IORef<boolean>;
	isFluid?: boolean;
}

export const Dropdown: m.Component<DropdownAttr> = {
	view: ({ attrs, children }) => {
		const isVisible = attrs.value.ask();
		const klass = pickKlass([
			selectKlass("active", isVisible),
			selectKlass("fluid", attrs.isFluid)
		]);

		const closeE = () => attrs.value.put(false);
		const toggleE = () => attrs.value.update(b => !b);

		return m(
			Outter,
			{ onOutterClick: closeE },
			m(
				"div.ui.multiple.selection.dropdown",
				{ class: klass, onclick: toggleE },
				children
			)
		);
	}
};
