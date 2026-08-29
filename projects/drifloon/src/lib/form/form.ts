import { Component, input } from '@angular/core';

/**
 * @deprecated 需要表单容器使用{@link UiBaseForm}；将来由{@link XUiForm}代替。
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
