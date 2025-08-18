import {
	Component,
	ElementRef,
	Host,
	input,
	Optional,
	SkipSelf,
    viewChild,
	AfterContentInit,
} from "@angular/core";
import {
	AbstractControl,
	ControlContainer,
	FormsModule,
	NG_VALUE_ACCESSOR,
	Validators
} from "@angular/forms";

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
export class UiFormField implements AfterContentInit {
	private el = viewChild<ElementRef>("el");
	private control: AbstractControl | undefined;

	label = input("");

	constructor(
		@Optional() @Host() @SkipSelf()
		private controlContainer: ControlContainer | null
	) {
	}

	ngAfterContentInit(): void {
		if (!this.controlContainer) {
			return ;
		}

		const controlEl = this.el()?.nativeElement?.querySelector("[formControlName]") as (HTMLBaseElement | null);
		const name = controlEl?.getAttribute("formControlName");
		if (name) {
			const control = this.controlContainer?.control?.get(name);
			if (control) {
				this.control = control;
			}
		}
	}

	protected isInputNeedRequire(): boolean {
		const b = this.control?.hasValidator(Validators.required);
		return b === true;
	}

	protected errorMsg(): string | null {
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
