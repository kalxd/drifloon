import { Component, signal } from "@angular/core";
import { form, FormField, required } from "@angular/forms/signals";
import { XUiBaseFormDialog, XUiFormDialog, XUiFormField } from "drifloon";
import * as R from "rxjs";

export interface TheSignalFormData {
	name: string;
	password: string;
}

@Component({
	selector: "the-signal-form",
	templateUrl: "./signalform.html",
	imports: [
		XUiFormDialog,
		XUiFormField,
		FormField
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
