import { Component, ElementRef, input, signal, viewChild, viewChildren } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import * as R from "rxjs";

@Component({
	selector: 'xui-form',
	imports: [],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class XUiForm {
	title = input<string>("请填写");
	isLoading = input(false);
}

const markOneLensDirty = <T>(prop: FieldTree<T>, keys: Array<string>): void => {
	if (keys.length === 0) {
		prop().markAsDirty();
		return ;
	}

	const [key, ...restKeys] = keys;
	return markOneLensDirty((prop() as any)[key], restKeys);
};

export abstract class XUiBaseForm<T> {
	protected abstract formData: FieldTree<T>;
	private isLoading = signal(false);

	private markAllDirty(): void {
		const formBody = viewChild<ElementRef<HTMLHtmlElement>>("body");
		const formFieldControls = formBody()?.nativeElement?.querySelectorAll("[formField]");
		console.log(formFieldControls);

		if (formFieldControls === undefined) {
			return ;
		}

		for (const control of formFieldControls) {
			const field = control.getAttribute("formField");
			if (field !== null) {
				const [_, ...keys] = field.split("."); // 跳过`formData`。
				markOneLensDirty(this.formData, keys);
			}
		}
	}

	protected abstract submit(): R.Observable<void>;

	protected connectSubmit(): void {
		this.isLoading.set(true);
		this.markAllDirty();

		this.submit().subscribe(_ => {
			this.isLoading.set(false);
		});
	}
}
