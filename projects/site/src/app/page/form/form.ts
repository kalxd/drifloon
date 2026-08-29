import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiForm, UiFormField } from "drifloon";
import { TheBaseForm } from "./base-form/base-form";

@Component({
	selector: 'site-form',
	imports: [
		ReactiveFormsModule,
		UiForm,
		UiFormField,
		TheBaseForm
	],
	templateUrl: './form.html',
	styleUrl: './form.css'
})
export class SiteForm {
	private fb = inject(FormBuilder);
	protected fd = this.fb.group({
		username: ["", Validators.required],
		password: [""]
	});

	protected showResult(): void {
		this.fd.markAllAsDirty();
	}
}
