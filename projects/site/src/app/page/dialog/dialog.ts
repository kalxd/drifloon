import { Component, inject, signal, viewChild } from '@angular/core';
import { UiDivider } from 'drifloon';
import { PagePlain } from "./plain";
import { PageForm } from './form';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
	selector: 'site-dialog',
	imports: [
		UiDivider,
		PagePlain,
		PageForm,
		FormsModule
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog {
	protected plainDialog = viewChild.required(PagePlain);
	protected formDialog = viewChild.required(PageForm);

	protected name = signal("");
	protected password = signal("");

	protected connectPlainOk(): void {
		alert("你点击了确定！");
	}

	protected connectShowPlain(): void {
		const dialog$ = this.formDialog().show({
			name: this.name(),
			password: this.password()
		});

		dialog$.subscribe(x => {
			this.name.set(x.name);
			this.password.set(x.password);
		});
	}
}
