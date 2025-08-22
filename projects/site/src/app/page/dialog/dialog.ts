import { Component, viewChild } from '@angular/core';
import { UiDialog, UiTopbar } from 'drifloon';

@Component({
	selector: 'site-dialog',
	imports: [
		UiDialog,
		UiTopbar
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog {
	protected plainDialog = viewChild.required<UiDialog<void>>("plain");

	protected connectPlainOk(): void {
		alert("你点击了确定！");
	}
}
