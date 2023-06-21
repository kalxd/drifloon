import * as m from "mithril";
import { DropdownFrame } from "../../element/dropdown";
import { IORef } from "../../data/ref";
import { Nothing } from "purify-ts";

export interface CompleteInputAttr<T> {
	value?: string;
	placeholder?: string;
	completeList?: Array<T>;
	eq?: (value: string, item: T) => boolean;
	renderItem?: (item: T) => string;
	connectChange?: (value: string) => void;
}

export const CompleteInput = <T>(): m.Component<CompleteInputAttr<T>> => {
	const isVisibleRef = new IORef<boolean>(false);

	return {
		view: () => {
			return m(DropdownFrame, { value: isVisibleRef, klass: Nothing }, [
				m("input"),
			]);
		}
	}
};
