import { Component, viewChild } from '@angular/core';
import { UiDialog, UiDivider, UiTopbar } from 'drifloon';
import { PageForm, PageFormResult } from './form';

@Component({
	selector: 'site-dialog',
	imports: [
		UiDialog,
		UiTopbar,
		UiDivider,

		PageForm
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog {
	protected plainDialog = viewChild.required<UiDialog<void>>("plain");
	protected formDialog = viewChild.required<UiDialog<void>>("form");

	protected connectPlainOk(): void {
		alert("你点击了确定！");
	}

	protected connectFormOk(value: PageFormResult): void {
		this.formDialog().close();
		alert(JSON.stringify(value, null, 4));
	}
}
