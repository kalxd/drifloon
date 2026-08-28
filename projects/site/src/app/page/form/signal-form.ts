import { Component, linkedSignal, signal, WritableSignal } from "@angular/core";
import { form, FormField, required } from "@angular/forms/signals";
import * as R from "rxjs";

interface UserModel {
	username: string,
	password: string
	selections: WritableSignal<Array<string>>;
	curSelection: WritableSignal<string | undefined>;
}

@Component({
	selector: "site-signal-form",
	imports: [
		FormField
	],
	templateUrl: "./signal-form.html"
})
export class SiteSignalForm {
	private readonly selections = signal<Array<string>>([]);
	private readonly curSelection = linkedSignal<string | undefined>(
		() => this.selections()[0]
	);

	readonly formModel = signal<UserModel>({
		password: "",
		username: "",
		selections: this.selections,
		curSelection: this.curSelection
	});

	readonly formData = form(this.formModel, p => {
		required(p.username);
		required(p.curSelection);
	});

	submit(): R.Observable<void> {
		return R.timer(3000).pipe(
			R.map(_ => {})
		);
	}
}
