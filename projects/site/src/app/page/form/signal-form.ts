import { Component, signal } from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
import { UiForm, XUiFormField } from "drifloon";

interface UserModel {
	username: string,
	password: string
}

@Component({
	selector: "site-signal-form",
	imports: [
		FormField,
		UiForm,
		XUiFormField
	],
	templateUrl: "./signal-form.html"
})
export class SiteSignalForm {
	private formModel = signal<UserModel>({
		username: "",
		password: ""
	});

	protected formData = form(this.formModel);

	connectSubmit(): void {
	}
}
