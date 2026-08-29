import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { XUiForm, XUiBaseForm, Ar, XUiFormField } from "drifloon";
import * as R from "rxjs";

interface FormModel {
	username: string;
	password: string;
}

@Component({
	imports: [
		FormField,
		XUiForm,
		XUiFormField
	],
	selector: 'site-signal-form',
	styleUrl: './signal-form.css',
	templateUrl: './signal-form.html',
})
export class SiteSignalForm extends XUiBaseForm<FormModel, void> {
	protected readonly model = signal<FormModel>({
		username: "",
		password: ""
	});

	override fd = form(this.model, p => {
		required(p.username);
	});

	override submit(): R.Observable<Ar.AsyncResult<void, unknown>> {
		return R.of(1).pipe(
			Ar.mapOf(_ => {}),
			R.delay(1000)
		);
	}

	override submitOk(): void {
		alert("提交完成！");
	}
}
