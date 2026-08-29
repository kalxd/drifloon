import { Component, input } from '@angular/core';
import { UiSkeleton } from '../skeleton/skeleton';

export interface UiBaseFormState {
	title?: string;
	isLoading?: boolean;
}

@Component({
	selector: "ui-base-form-action",
	template: "<ng-content />"
})
export class UiBaseFormAction {}

@Component({
	imports: [
		UiSkeleton
	],
	selector: 'ui-base-form',
	styleUrl: './base-form.css',
	templateUrl: './base-form.html',
})
export class UiBaseForm {
	readonly title = input<string>("请填写");
	readonly loading = input<boolean>(false);
}
