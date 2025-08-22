import {
	Component,
	ElementRef,
	viewChild
} from '@angular/core';
import * as R from "rxjs";

@Component({
	selector: 'ui-dialog',
	imports: [],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class UiDialog<R> {
	private dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>("dialog");

	private actionOk = new R.Subject<R>();
	private actionOk$ = this.actionOk.asObservable();

	show(): R.Observable<R> {
		this.dialogRef()?.nativeElement.showModal();
		return this.actionOk$;
	}

	close(): void {
		this.dialogRef()?.nativeElement.close();
	}

	ok(value: R): void {
		this.close();
		this.actionOk.next(value);
	}
}
