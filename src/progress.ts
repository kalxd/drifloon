import * as m from "mithril";
import { Maybe } from "purify-ts";
import { pickKlass, selectKlass } from "./internal/attr";
import { AttachPosition, Size, Color } from "./data/var";

export enum ProgressIndeterminate {
	Default = "indeterminate",
	Fill = "indeterminate filling",
	slide = "indeterminate sliding",
	swing = "indeterminate swinging"
}

export enum ProgressSpeed {
	slow = "slow",
	fast = "fast"
}

export interface ProgressAttr {
	value?: number;
	text?: string;
	isIndicate?: boolean;
	isCenter?: boolean;
	isActive?: boolean;
	indeterminate?: ProgressIndeterminate;
	speed?: ProgressSpeed;
	isInvert?: boolean;
	attach?: AttachPosition;
	size?: Size;
	color?: Color;
}

export const Progress: m.Component<ProgressAttr> = {
	view: ({ attrs, children }) => {
		const klass = pickKlass([
			selectKlass("indicating", attrs.isIndicate),
			selectKlass("centered", attrs.isCenter),
			selectKlass("active", attrs.isActive),
			Maybe.fromNullable(attrs.indeterminate),
			Maybe.fromNullable(attrs.speed),
			selectKlass("inverted", attrs.isInvert),
			Maybe.fromNullable(attrs.attach),
			Maybe.fromNullable(attrs.size),
			Maybe.fromNullable(attrs.color)
		]);

		const percent = Math.min(100, attrs.value ?? 0);

		const text = Maybe.fromNullable(attrs.text)
			.map(text => m("div.progress", text))
			.extract();

		return m("div.ui.progress", { class: klass, "data-percent": percent }, [
			m(
				"div.bar",
				{ style: `width: ${percent}%; transition-duration: 300ms` },
				text
			),
			children
		]);
	}
};
