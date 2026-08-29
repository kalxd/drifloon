import { Component, computed, input, output, signal, viewChild } from '@angular/core';
import { UiDialog } from '../../dialog/dialog';
import { XUiForm, XUiFormState } from "../form/form";
import { UiSkeleton } from '../../ui/skeleton/skeleton';
import { UiDialogBox } from '../../box/dialog-box';
import * as R from "rxjs";
import { FieldTree } from '@angular/forms/signals';

@Component({
	imports: [
		UiDialog,
		XUiForm,
		UiSkeleton,
		UiDialogBox
	],
	selector: 'xui-form-dialog',
	styleUrl: './form-dialog.css',
	templateUrl: './form-dialog.html',
})
export class XUiFormDialog {
	readonly state = input<XUiFormState>({});
	readonly submit = output<void>();

	protected readonly isLoading = computed(() => this.state().isLoading === true);
	private readonly dialogRef = viewChild.required(UiDialog);

	show(): void {
		this.dialogRef().show();
	}

	close(): void {
		this.dialogRef().close();
	}
}

export abstract class XUiBaseFormDialog<T, R> {
	protected title: string | undefined;
	private readonly isLoading = signal<boolean>(false);

	protected readonly abstract fd: FieldTree<T>;

	protected init(_: T): void {}
}
