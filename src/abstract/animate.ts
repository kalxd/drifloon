import * as m from "mithril";

export interface AnimateFrameAttr {
	el?: string;
	in?: string;
}

export const AnimateFrame = (
	init: m.Vnode<AnimateFrameAttr & m.Attributes>
): m.Component<AnimateFrameAttr & m.Attributes> => {
	const inName = init.attrs.in ?? "animate__flipInX";
	const el = init.attrs.el ?? "div";

	return {
		view: ({ children, attrs }) => m(
			`${el}.animate__animated.animate__faster.${inName}`,
			attrs,
			children
		)
	};
};
