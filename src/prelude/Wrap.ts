/**
 * 高阶组件
 */

import * as m from "mithril";

export const genWrapWidget = (tag: string): m.Component => ({
	view: ({ children }) => m(tag, children)
});
