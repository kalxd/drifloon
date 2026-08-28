import { Component, input, output, signal, viewChild, WritableSignal } from "@angular/core";
import * as R from "rxjs";
import { FieldTree } from "@angular/forms/signals";
import { UiDialog } from "../../dialog/dialog";
import { UiDialogBox } from "../../box/dialog-box";
import { UiSkeleton } from "../../skeleton/skeleton";
import { XUiForm } from "../form/form";

@Component({
	selector: "xui-form-dialog",
	templateUrl: "./formdialog.html",
	imports: [
		UiDialog,
		UiDialogBox,
		UiSkeleton,
		XUiForm
	]
})
export class XUiFormDialog {
	title = input("请填写");
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
	template: ""
})
export abstract class XUiBaseFormDialog<T extends {}, R> {
	protected abstract formModel: WritableSignal<T>;
	protected abstract formData: FieldTree<T>;

	private readonly dialogRef = viewChild(XUiFormDialog);
	private result$ = new R.Subject<R>();

	/**
	 * 对话框{@link show}时，会调用这个函数初始化成员。
	 * 默认不做任何事，有初始化需求可以重写这个函数。
	 */
	protected init(_: T): void {}

	show(value: T): R.Observable<R> {
		this.init(value);
		this.dialogRef()?.show();
		return this.result$;
	}

	private markAllDirty(): void {
		for (const key of Object.keys(this.formModel())) {
			(this.formData as any)[key]().markAsDirty();
		}
	}

	protected connectSubmit(): void {
		this.markAllDirty();
		if (this.formData().invalid()) {
			return ;
		}

		this.submit()
			.pipe(
				R.finalize(() => this.dialogRef()?.setUnload())
			)
			.subscribe(value => {
				this.result$.next(value);
				this.dialogRef()?.close();
			});
	}

	abstract submit(): R.Observable<R>;
}
