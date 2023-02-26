import * as m from "mithril";
import { Maybe } from "purify-ts";
import { FluidPlaceholder } from "../element/placeholder";

export const loading = <T>(
	f: (value: T) => m.Vnode,
	value: Maybe<T>
): m.Vnode => value.map(f)
	.orDefault(m(FluidPlaceholder));
