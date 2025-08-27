import { Component, inject, input, output, signal, viewChild } from "@angular/core";
import { UiDialog } from "./dialog";
import { UiDialogBox } from "../box/dialog-box";
import { UiForm } from "../form/form";
import { UiSkeleton } from "../skeleton/skeleton";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as R from "rxjs";

@Component({
	selector: "ui-form-dialog",
	templateUrl: "./formdialog.html",
	imports: [
		UiDialog,
		UiDialogBox,
		UiForm,
		UiSkeleton
	]
})
export class UiFormDialog {
	title = input<string>("请填写");
	submit = output<void>();

	private dialogRef = viewChild.required(UiDialog);
	protected isLoad = signal(false);

	show(): void {
		this.dialogRef().show();
	}

	close(): void {
		this.dialogRef().close();
	}

	setLoad(): void {
		this.isLoad.set(true);
	}

	setUnload(): void {
		this.isLoad.set(false);
	}
}

@Component({
	selector: "ui-base-form-dialog",
	template: ""
})
export abstract class UiBaseFormDialog<T, R> {
	private dialogRef = viewChild(UiFormDialog);
	protected fb = inject(FormBuilder);
	private result = new R.Subject<R>();
	private result$ = this.result.asObservable();

	abstract fg: FormGroup;

	protected init(_: T): void {}

	show(value: T): R.Observable<R> {
		this.init(value);
		this.dialogRef()?.show();
		return this.result$;
	}

	close(): void {
		this.dialogRef()?.close();
	}

	connectFormSubmit(): void {
		this.fg.markAllAsDirty();
		if (this.fg.invalid) {
			return ;
		}

		this.dialogRef()?.setLoad();

		this.connectSubmit()
			.pipe(
				R.finalize(() => this.dialogRef()?.setUnload())
			)
			.subscribe(value => {
				this.result.next(value);
				this.dialogRef()?.setUnload();
				this.dialogRef()?.close();
			});
	}

	abstract connectSubmit(): R.Observable<R>;
}
