import {
	Component,
	ElementRef,
	inject,
	viewChild
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as R from "rxjs";

@Component({
	selector: "dialog-header",
	template: "<ng-content />"
})
export class DialogHeader {}

@Component({
	selector: "dialog-footer",
	template: "<ng-content />"
})
export class DialogFooter {}

@Component({
	selector: 'ui-dialog',
	imports: [],
	templateUrl: "./dialog.html",
	styleUrl: './dialog.css'
})
export class UiDialog {
	private dialogRef = viewChild<ElementRef<HTMLDialogElement>>("dialog");

	show(): void {
		this.dialogRef()?.nativeElement.showModal();
	}

	close(): void {
		this.dialogRef()?.nativeElement.close();
	}
}

@Component({
	selector: "ui-base-dialog",
	template: ""
})
export abstract class UiBaseDialog<T, R> {
	private dialogRef = viewChild(UiDialog);
	private resultSubject = new R.Subject<R>();
	private result$ = this.resultSubject.asObservable();
	protected fb = inject(FormBuilder);

	protected init(_: T): void {}

	protected setResult(value: R): void {
		this.resultSubject.next(value);
	}

	protected setFinalResult(value: R): void {
		this.setResult(value);
		this.close();
	}

	show(input: T): R.Observable<R> {
		this.init(input);
		this.dialogRef()?.show();
		return this.result$;
	}

	close(): void {
		this.dialogRef()?.close();
	}
}
