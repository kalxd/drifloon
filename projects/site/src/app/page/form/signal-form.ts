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
	override formModel = signal<UserModel>({
		password: "",
		username: ""
	});

	override formData = form(this.formModel);

	override submit(): R.Observable<void> {
		this.formData.password().markAsDirty();
		console.log(this.formModel());
		console.log(Object.keys(this.formModel()));
		return R.of(undefined);
	}
}
