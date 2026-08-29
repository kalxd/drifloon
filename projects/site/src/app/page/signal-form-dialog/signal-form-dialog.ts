import { Component, signal, viewChild } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TheSignalFormDialog, UserModel } from "./formdialog/signal-form-dialog";
import { XUiFormField, UiBaseForm } from "drifloon";

@Component({
	imports: [
		FormField,
		TheSignalFormDialog,
		UiBaseForm,
		XUiFormField
	],
	selector: 'site-signal-form-dialog',
	styleUrl: './signal-form-dialog.css',
	templateUrl: './signal-form-dialog.html',
})
export class SiteSignalFormDialog {
	userModel = signal<UserModel>({
		username: "",
		password: ""
	});

	fd = form(this.userModel);

	private dialogRef = viewChild.required(TheSignalFormDialog);

	connectOpenDialog(): void {
		const value: UserModel = this.userModel();
		this.dialogRef().show(value).subscribe(value => {
			this.userModel.set(value);
		});
	}
}
