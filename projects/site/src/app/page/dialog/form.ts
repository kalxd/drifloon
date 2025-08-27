import { Component } from "@angular/core";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogFooter, UiBaseFormDialog, UiFormDialog, UiFormField } from "drifloon";
import * as R from "rxjs";

export interface PageFormData {
	name: string;
	password: string;
}

@Component({
	selector: "page-form",
	templateUrl: "./form.html",
	imports: [
		UiFormDialog,
		DialogFooter,
		UiFormField,
		ReactiveFormsModule
	]
})
export class PageForm extends UiBaseFormDialog<PageFormData, PageFormData> {
    override fg = this.fb.group({
		name: ["", Validators.required],
		password: [""]
	});

	override init(value: PageFormData): void {
		this.fg.setValue(value);
	}

    override connectSubmit(): R.Observable<PageFormData> {
		const value = this.fg.value as PageFormData;
		return R.of(value).pipe(
			R.delay(2000)
		);
    }
}
