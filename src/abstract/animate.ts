import * as m from "mithril";

export interface AnimateFrameAttr {
	el?: string;
	in?: string;
	out?: string;
}

export const AnimateFrame = (
	init: m.Vnode<AnimateFrameAttr & m.Attributes>
): m.Component<AnimateFrameAttr & m.Attributes> => {
	const inName = init.attrs.in ?? "animate__flipInX";
	const outName = init.attrs.out ?? "animate__flipOutX";
	const el = init.attrs.el ?? "div";

	return {
		onbeforeremove: vnode => {
			const { dom } = vnode;
			return new Promise(resolve => {
				dom.addEventListener("animationed", resolve);
				dom.classList.remove(inName);
				dom.classList.add(outName);
			});
		},
		view: ({ children, attrs }) => m(
			`${el}.animate__animated.animate__faster.${inName}`,
			attrs,
			children
		)
	};
};
