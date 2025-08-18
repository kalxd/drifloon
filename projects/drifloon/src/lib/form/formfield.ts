import { afterEveryRender, Component, ElementRef, forwardRef, Host, inject, input, Optional, SkipSelf } from "@angular/core";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControlName, FormsModule, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

@Component({
	selector: "ui-form-field",
	imports: [FormsModule],
	styleUrl: "./form.css",
	templateUrl: "./formfield.html",
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: UiFormField
		}
	]
})
export class UiFormField {
	private el = inject(ElementRef);
	private control: AbstractControl | undefined;

	label = input("");

	constructor(
		@Optional() @Host() @SkipSelf()
		private controlContainer: ControlContainer | null
	) {

		this.initControl();
	}

	private initControl(): void {
		if (!this.controlContainer) {
			return ;
		}

		afterEveryRender(() => {
			const controlEl = this.el.nativeElement.querySelector("[formControlName]") as (HTMLBaseElement | null);
			const name = controlEl?.getAttribute("formControlName");

			if (name) {
				const control = this.controlContainer?.control?.get(name);
				if (control) {
					this.control = control;
				}
			}
		});
	}

	errorMsg(): string | null {
		if (!this.control) {
			return null;
		}

		if (this.control.valid) {
			return null;
		}

		if (!this.control.dirty) {
			return null;
		}

		if (this.control.hasError("required")) {
			return `${this.label()}未填写！`;
		}

		return `${this.label()}格式不正确！`;
	}
}
