import * as m from "mithril";
import { Maybe } from "purify-ts";

const IsActiveKlass = "is-active";

const appendKlass = (klass: string | undefined): string | undefined => {
	return Maybe.fromNullable(klass)
		.filter(s => s.trim().length !== 0)
		.caseOf({
			Just: s => `${s} ${IsActiveKlass}`,
			Nothing: () => IsActiveKlass
		});
};

export interface NaviLinkAttr extends m.Attributes {
	to: string;
}

export const NaviLink: m.Component<NaviLinkAttr> = ({
	view: ({ attrs, children }) => {
		const path = m.route.get() || "";
		const href = `#!${attrs.to}`;

		const klassAttrs = (({ to, ...attrs }) => {
			if (to !== path) {
				return attrs;
			}

			return {
				class: appendKlass(attrs.class),
				className: appendKlass(attrs.className),
				...attrs
			};
		})(attrs);

		return m("a", { href, ...klassAttrs },  children);
	}
});
