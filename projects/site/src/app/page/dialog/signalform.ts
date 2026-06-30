import { Component, signal } from "@angular/core";
import { form, required } from "@angular/forms/signals";
import { UiFormDialog, XUiBaseFormDialog, XUiFormField } from "drifloon";
import * as R from "rxjs";

export interface TheSignalFormData {
	name: string;
	password: string;
}

@Component({
	selector: "the-signal-form",
	template: "",
	imports: [
		UiFormDialog,
		XUiFormField
	]
})
export class TheSignalForm extends XUiBaseFormDialog<TheSignalFormData, TheSignalFormData> {
    protected override formModel = signal<TheSignalFormData>({
		name: "",
		password: ""
	});

    protected override formData = form(this.formModel, p => {
		required(p.name);
	});

    override submit(): R.Observable<TheSignalFormData> {
		return R.of(this.formModel());
    }
}
