import { Component, signal } from '@angular/core';
import { UiBaseForm, UiBaseFormAction } from "drifloon";

@Component({
	imports: [UiBaseForm, UiBaseFormAction],
	selector: 'the-base-form',
	styleUrl: './base-form.css',
	templateUrl: './base-form.html',
})
export class TheBaseForm {
	isLoading = signal(false);
}
