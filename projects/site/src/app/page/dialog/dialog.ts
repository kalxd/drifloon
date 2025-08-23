import { Component, viewChild } from '@angular/core';
import { UiDivider } from 'drifloon';
import { PagePlain } from "./plain";

@Component({
	selector: 'site-dialog',
	imports: [
		UiDivider,
		PagePlain
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog {
	protected plainDialog = viewChild.required(PagePlain);

	protected connectPlainOk(): void {
		alert("你点击了确定！");
	}
}
