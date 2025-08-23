import { Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { UiBaseDialog, UiDialog, UiDialogBox, UiForm, UiFormField } from "drifloon";

export interface PageFormData {
	name: string;
	password: string;
}

@Component({
	selector: "page-form",
	templateUrl: "./form.html",
	imports: [
		UiDialog,
		UiDialogBox,
		UiForm,
		UiFormField,
		ReactiveFormsModule
	]
})
export class PageForm extends UiBaseDialog<PageFormData, PageFormData> {
	protected form = this.fb.group({
		name: ["", Validators.required],
		password: [""]
	})

	override updateInput(value: PageFormData): void {
		this.form.setValue(value);
	}

	protected connectOk(): void {
		this.form.markAllAsDirty();

		if (this.form.valid) {
			this.setFinalResult(this.form.value as PageFormData);
		}
	}
}
