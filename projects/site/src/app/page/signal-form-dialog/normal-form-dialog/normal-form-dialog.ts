import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { XUiBaseFormDialog, XUiFormDialog, XUiFormField, Ar } from "drifloon";
import * as R from "rxjs";

export interface NormalFormModel {
	username: string;
	password: string;
}

@Component({
	imports: [
		FormField,
		XUiFormDialog,
		XUiFormField
	],
	selector: 'the-normal-form-dialog',
	styleUrl: './normal-form-dialog.css',
	templateUrl: './normal-form-dialog.html',
})
export class TheNormalFormDialog extends XUiBaseFormDialog<void, NormalFormModel> {
	private userModel = signal<NormalFormModel>({
		username: "",
		password: ""
	});

	override fd = form(this.userModel);

	override sumbit(): R.Observable<Ar.AsyncResult<NormalFormModel, unknown>> {
		const result = this.userModel();

		return R.of(result).pipe(
			Ar.mapOf(x => x),
			R.delay(1000)
		)
	}
}
