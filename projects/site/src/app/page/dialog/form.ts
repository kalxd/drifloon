import { Component, inject, output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiForm, UiFormField, UiTopbar } from "drifloon";

export interface PageFormResult {
	username: string;
	password: string;
}

@Component({
	selector: "page-form",
	templateUrl: "./form.html",
	imports: [
		UiTopbar,
		UiForm,
		UiFormField,
		ReactiveFormsModule
	]
})
export class PageForm {
	private fb = inject(FormBuilder);

	submit = output<PageFormResult>();
	cancel = output<void>();

	protected formData = this.fb.group({
		username: ["", Validators.required],
		password: ["", Validators.required]
	});

	protected connectSubmit(): void {
		this.formData.markAllAsDirty();
		if (this.formData.invalid) {
			return ;
		}

		const result: PageFormResult = {
			username: this.formData.value.username!,
			password: this.formData.value.password!
		};

		this.submit.emit(result);
	}
}
