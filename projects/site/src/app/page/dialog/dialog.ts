import { AfterContentInit, Component, signal, viewChild } from '@angular/core';
import { UiDivider } from 'drifloon';
import { PagePlain } from "./plain";
import { PageForm } from './form';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'site-dialog',
	imports: [
		UiDivider,
		PagePlain,
		PageForm,
		FormsModule,
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog implements AfterContentInit {
	protected plainDialog = viewChild.required(PagePlain);
	protected formDialog = viewChild.required(PageForm);

	protected name = signal("");
	protected password = signal("");

	ngAfterContentInit() {
		this.formDialog().result$.subscribe(value => {
			console.log("do this?");
			this.name.set(value.name);
			this.password.set(value.password);
		});
	}

	protected connectPlainOk(): void {
		alert("你点击了确定！");
	}

	protected connectShowPlain(): void {
		this.formDialog().show({
			name: this.name(),
			password: this.password()
		});
	}
}
