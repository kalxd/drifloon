import { Component, input } from '@angular/core';

@Component({
	selector: 'ui-form',
	imports: [],
	templateUrl: './form.html',
	styleUrl: './form.css'
})
export class UiForm {
	title = input("请填写");
}
