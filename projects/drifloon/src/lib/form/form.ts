import { Component, input } from '@angular/core';

/**
 * @deprecated 请使用signal forms，该版本会在后几个版本被替换。
 */
@Component({
	selector: 'ui-form',
	imports: [],
	templateUrl: './form.html',
	styleUrl: './form.css'
})
export class UiForm {
	title = input("请填写");
}
