import { Component, signal } from "@angular/core";
import { form, FormField, required } from "@angular/forms/signals";
import { XUiBaseForm, XUiForm, XUiFormField } from "drifloon";
import * as R from "rxjs";

interface UserModel {
	username: string,
	password: string
}

@Component({
	selector: "site-signal-form",
	imports: [
		FormField,
		XUiForm,
		XUiFormField
	],
	templateUrl: "./signal-form.html"
})
export class SiteSignalForm extends XUiBaseForm<UserModel> {
	private formModel = signal<UserModel>({
		username: "",
		password: ""
	});

	protected formData = form(this.formModel, p => {
		required(p.username);
	});

	override submit(): R.Observable<void> {
		return R.of(undefined);
	}
}
