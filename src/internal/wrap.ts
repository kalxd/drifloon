/**
 * 高阶组件
 */

import * as m from "mithril";
import { curry } from "purify-ts";

export const genPlainVnode = curry((selector: string, children: m.Children): m.Children => {
	return m(selector, children);
});

export const genWrapWidget = (tag: string): m.Component => ({
	view: ({ children }) => m(tag, children)
});

export const toPlainVnode = (C: m.Component): (children: m.Children) => m.Vnode =>
	children => m(C, children);
