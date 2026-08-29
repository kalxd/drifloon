import { Component, computed, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

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
export class XUiFormField implements FormValueControl<unknown> {
	readonly value = model<unknown>();
	readonly required = input<boolean>(false);
	readonly invalid = input<boolean>(false);
	readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

	readonly label = input<string | undefined>();
	protected readonly labelTitle = computed(() => this.label() ?? "请填写");

	showOneError(e: ValidationError): string {
		return trKind(e.kind, this.label(), e.message);
	};
}
