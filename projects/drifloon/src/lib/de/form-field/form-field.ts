import { Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

const trKind = (kind: string, label: string | undefined, message: string | undefined): string => {
	if (kind === "required") {
		return `${label ?? "此处"}必填！`;
	}

	return `${label}: ${kind} ${message}`;
};

@Component({
  selector: 'xui-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class XUiFormField {
	readonly fieldName = input<FieldTree<string, any>>();
	readonly label = input<string>();

	protected labelTitle = computed(() => {
		const label = this.label();
		return label ?? "填写此处";
	});

	protected errors = computed<Array<string> | undefined>(() => {
		const fieldName = this.fieldName?.();

		if (fieldName === undefined) {
			return ;
		}

		if (!fieldName().dirty()) {
			return ;
		}

		return fieldName().errors()
			.map(e => trKind(e.kind, this.label(), e.message));
	});

	protected isRequire = computed<boolean>(() => {
		return this.fieldName?.()?.()?.required() === true;
	});
}
