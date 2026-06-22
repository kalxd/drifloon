import { Component, input, signal, WritableSignal } from '@angular/core';
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

export abstract class XUiBaseForm<T extends {}> {
	protected abstract formModel: WritableSignal<T>;
	protected abstract formData: FieldTree<T>

	private isLoading = signal(false);

	private markAllDirty(): void {
		for (const key of Object.keys(this.formModel())) {
			(this.formData as any)[key]().markAsDirty();
		}
	}

	protected abstract submit(): R.Observable<void>;

	protected connectSubmit(): void {
		this.markAllDirty();

		if (this.formData().invalid()) {
			return ;
		}

		this.isLoading.set(true);
		this.submit().subscribe(_ => {
			this.isLoading.set(false);
		});
	}
}
