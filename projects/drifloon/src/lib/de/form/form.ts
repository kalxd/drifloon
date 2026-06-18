import { Component, input } from '@angular/core';

@Component({
	selector: 'xui-form',
	imports: [],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class XUiForm {
	protected title = input<string>("请填写");
}
