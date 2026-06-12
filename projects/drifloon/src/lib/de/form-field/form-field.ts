import { Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'xui-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
	fieldName = input<FieldTree<any>>();
	label = input<string>();

	protected labelTitle = computed(() => {
		const label = this.label();
		return label ?? "填写此处";
	});

	protected errors = computed<Array<string> | null>(() => {
		const fieldName = this.fieldName?.();
		if (fieldName === undefined) {
			return null;
		}

		if (!fieldName().dirty()) {
			return null;
		}

		return fieldName()
			.errors()
			.map(e => {
				if (e.kind === "required") {
					return "未填写！";
				}

				return e.message ?? "此处填写格式不正确！";
			});
	});

	isRequire(): boolean {
		const fieldName = this.fieldName?.();

		if (fieldName === undefined) {
			return false;
		}

		return fieldName().required();
	}
}
