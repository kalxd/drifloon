import { AfterContentInit, Component, signal, viewChild } from '@angular/core';
import { UiDivider } from 'drifloon';
import { PagePlain } from "./plain";
import { PageForm } from './form';
import { FormsModule } from '@angular/forms';
import { TheSignalForm } from './signalform';

@Component({
	selector: 'site-dialog',
	imports: [
		UiDivider,
		PagePlain,
		PageForm,
		FormsModule,
		TheSignalForm
	],
	templateUrl: './dialog.html',
	styleUrl: './dialog.css'
})
export class SiteDialog implements AfterContentInit {
	protected plainDialog = viewChild.required(PagePlain);
	protected formDialog = viewChild.required(PageForm);
	protected theSignalFormDialog = viewChild.required(TheSignalForm);

	protected name = signal("");
	protected password = signal("");

	ngAfterContentInit() {
		this.formDialog().result$.subscribe(_ => {
			console.log("do this?");
		});
	}

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

	connectShowTheSignalForm(): void {
		this.theSignalFormDialog()
			.show({
				name: this.name(),
				password: this.password()
			})
			.subscribe(value => {
				this.name.set(value.name);
				this.password.set(value.password);
			});
	}
}
