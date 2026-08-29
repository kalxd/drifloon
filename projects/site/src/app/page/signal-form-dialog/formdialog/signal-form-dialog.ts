import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { XUiBaseFormDialog, XUiFormDialog, Ar, XUiFormField } from "drifloon";
import * as R from 'rxjs';

export interface UserModel {
	username: string;
	password: string;
}

@Component({
	imports: [XUiFormDialog, FormField, XUiFormField],
	selector: 'the-signal-form-dialog',
	styleUrl: './signal-form-dialog.css',
	templateUrl: './signal-form-dialog.html',
})
export class TheSignalFormDialog extends XUiBaseFormDialog<UserModel, UserModel> {
	private readonly userModel = signal<UserModel>({
		username: "",
		password: ""
	});

	override readonly fd = form(this.userModel, p => {
		required(p.username);
	});

	override init(input: UserModel): void {
		this.userModel.set(input);
	}

	override sumbit(): R.Observable<Ar.AsyncResult<UserModel, unknown>> {
		const result: UserModel = this.userModel();
		return R.of(Ar.mkAsyncFinish(result));
	}
}
